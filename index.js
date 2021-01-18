
let { google } = require('googleapis')
let fs = require('fs')
let readline = require('readline')
let mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/bloga', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let moment = require('moment')

let key = fs.readFileSync(__dirname + '/certsFiles/selfsigned.key')
let cert = fs.readFileSync(__dirname + '/certsFiles/selfsigned.crt')
let credentials = {
  key: key,
  cert: cert
}

let express = require('express')
let app = express()
let https = require('https').createServer(credentials, app)
let httpsPort = 3005

https.listen(httpsPort, () => {
  console.log("Https server listing on port : " + httpsPort)
})

let bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  let allowedOrigins = ['https://com.au', 'https://com.au'];
  let origin = req.headers.origin
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }

  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Allow-Credentials', true)
  return next()
})

let sch = mongoose.Schema({ date: String, blogers: String, name: String, title: String, loc: String })

let mod = mongoose.model('blogs', sch)

app.use(express.static('public'))

app.post('/one', function (req, res) {
  if (req.body.passw === "") {
    function decodeBase64Image(dataString) {
      var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};
      if (matches.length !== 3) {
        return res.json({ e: "Invalid input string" })
      }
      response.type = matches[1];
      response.data = new Buffer(matches[2], 'base64')
      return response;
    }

    let imageBuffer = decodeBase64Image(req.body.file)
    let d = new Date()
    let date = moment(d).format("MMM Do YY' HH:mm:ssss")
    var id = mongoose.Types.ObjectId()
    let b = new mod({ _id: id, date: date, blogers: req.body.blogers, name: req.body.name, title: req.body.title, loc: 'https://com.au/pic/' + id + '.jpg' })

    b.save(function (err, doc) {
      fs.writeFile(__dirname + '/public/pic/' + id + '.jpg', imageBuffer.data, function (err) { })
      mod.find({}).sort({ date: -1 }).exec(function (err, doc) {
        return res.json(doc)
      })
    })
  } else {
    return res.json({ e: "Incorrect password" })
  }
})

app.post('/two', function (req, res) {
  if (req.body.passw0 === "") {
    mod.find({ date: req.body.ddate }, function (err, doc) {
      if (doc.length) {
        fs.unlink(__dirname + '/public/pic/' + doc[0]._id + '.jpg', function (err) { })
        mod.deleteOne({ date: req.body.ddate }, function (err) {
          mod.find({}).sort({ date: -1 }).exec(function (err, doc) {
            return res.json(doc)
          })
        })
      } else {
        return res.json({ e: "Incorrect date" })
      }
    })
  } else {
    return res.json({ e: "Incorrect password" })
  }
})

app.post('/three', function (req, res) {

  const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/gmail.send'];
  const TOKEN_PATH = 'token.json';

  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err)
    authorize(JSON.parse(content), sendMessage)
  })

  function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed
    const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0])
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getNewToken(oAuth2Client, callback)
      oAuth2Client.setCredentials(JSON.parse(token))
      callback(oAuth2Client)
    })
  }

  function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    })
    console.log('Authorize this app by visiting this url:', authUrl)
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close()
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err)
        oAuth2Client.setCredentials(token)
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err)
          console.log('Token stored to', TOKEN_PATH)
        })
        callback(oAuth2Client)
      })
    })
  }

  function sendMessage(auth) {
    let gmail = google.gmail({ version: 'v1', auth })
    let s = String("Name:" + '\xa0' + req.body.name + '\n\n' + "Email Address:" + '\xa0' + req.body.email + '\n\n' + "Phone #:" + '\xa0' + req.body.phone + '\n\n' + "Type:" + '\xa0' + req.body.selectedOption.value + '\n\n' + "Text:" + '\xa0' + req.body.text)
    let str = ["Content-Type: text/plain; charset=\"UTF-8\"\n", "MIME-Version: 1.0\n", "Content-Transfer-Encoding: 7bit\n", "to: ", "", "\n", "from: ", "", "\n", "subject: ", "Candid Question", "\n\n", s].join('')
    let raw = new Buffer(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_')
    gmail.users.messages.send({
      userId: 'me',
      resource: {
        raw: raw,
      }
    }, (err, result) => {
      if (err) {
        console.log('NODEMAILER - The API returned an error: ' + err)
        return res.json({ e: 'Error' })
      }
      return res.json({ a: "Inquiry email sent" })
    })
  }
})

app.get('/ong', function (req, res) {
  mod.find({}).sort({ date: -1 }).exec(function (err, doc) {
    return res.json(doc)
  })
})
