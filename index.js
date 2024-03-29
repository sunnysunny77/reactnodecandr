const { google } = require('googleapis')
const fs = require('fs')
const readline = require('readline')
const mongoose = require('mongoose')
const papa = require('papaparse')
const request = require('request')
const bodyParser = require('body-parser')
const moment = require('moment')
const express = require('express')

mongoose.connect('mongodb://localhost/bloga')

const pathKey = [__dirname, '/certsFiles/selfsigned.key']
const certKey = [__dirname, '/certsFiles/selfsigned.crt']
const key = fs.readFileSync(pathKey.join(''))
const cert = fs.readFileSync(certKey.join(''))
const credentials = {
  key,
  cert
}

const app = express()
const https = require('https').createServer(credentials, app)
const httpsPort = 3005
https.listen(httpsPort, () => {
  console.log('Https server listing on port : ' + httpsPort)
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(function (req, res, next) {
  const allowedOrigins = [
    'https://candidcleaning.sunnyhome.site', 'https://localhost:3000'
  ]
  const origin = req.headers.origin
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Allow-Credentials', true)
  return next()
})
app.use(express.static('public'))

const sch = new mongoose.Schema({
  date: String,
  blog: String,
  name: String,
  title: String,
  loc: String
})

const Mod = mongoose.model('blogs', sch)

const dataNavigation = []
const dataContact = []
const dataVideos = []
const dataGallery = []
const dataImages = []
const dataImagesPreLoad = {
  '/': [
    'https://candid.s3-ap-southeast-2.amazonaws.com/welcome.png',
    'https://candid.s3.ap-southeast-2.amazonaws.com/texture.png'
  ],
  '/about': [
    'https://candid.s3-ap-southeast-2.amazonaws.com/divider.png',
    'https://candid.s3-ap-southeast-2.amazonaws.com/wave.svg',
    'https://candid.s3-ap-southeast-2.amazonaws.com/stickyTop.svg',
    'https://candid.s3.ap-southeast-2.amazonaws.com/texture.png'
  ],
  '/gallery': [
    'https://candid.s3-ap-southeast-2.amazonaws.com/stickyTop.svg',
    'https://candid.s3.ap-southeast-2.amazonaws.com/texture.png'
  ],
  '/contact': [
    'https://candid.s3-ap-southeast-2.amazonaws.com/wave.svg',
    'https://candid.s3-ap-southeast-2.amazonaws.com/stickyTop.svg',
    'https://candid.s3.ap-southeast-2.amazonaws.com/texture.png'
  ],
  '/blog': [
    'https://candid.s3-ap-southeast-2.amazonaws.com/stickyTop.svg',
    'https://candid.s3.ap-southeast-2.amazonaws.com/texture.png'
  ]
}
const dataHome = []
const dataSelectOptions = []
const dataBlog = []
const dataAbout = []
const dataMap = []
let index = 1

function baseName (param) {
  return param.split('/')
    .pop()
    .split('.')
    .slice(0, -1)
    .join('.')
}

function init () {
  const options = { skipEmptyLines: true, header: true }

  const dataStreamNavigation = request.get('https://docs.google.com/spreadsheets/d/19OUa1a2MebEPygCW44bLfVovtz_bgX5rXG4YwAv9hXg/gviz/tq?tqx=out:csv&sheet=data')
  const parseStreamNavigation = papa.parse(papa.NODE_STREAM_INPUT, options)
  dataStreamNavigation.pipe(parseStreamNavigation)
  parseStreamNavigation.on('data', chunk => {
    delete chunk.Title
    dataNavigation.push(chunk)
  })

  const dataStreamContact = request.get('https://docs.google.com/spreadsheets/d/1LWkiENVo4pKwX2yCZePfsYgx9VvYVqrDsu5K5leI8is/gviz/tq?tqx=out:csv&sheet=data')
  const parseStreamContact = papa.parse(papa.NODE_STREAM_INPUT, options)
  dataStreamContact.pipe(parseStreamContact)
  parseStreamContact.on('data', chunk => {
    delete chunk.Title
    dataContact.push(chunk)
  })

  const dataStreamVideos = request.get('https://docs.google.com/spreadsheets/d/1yuPgYwDdJgMk-ANu2Orx_Ls4kuBVgrJcW1r6NjzQiBY/gviz/tq?tqx=out:csv&sheet=data')
  const parseStreamVideos = papa.parse(papa.NODE_STREAM_INPUT, options)
  dataStreamVideos.pipe(parseStreamVideos)
  parseStreamVideos.on('data', chunk => {
    dataVideos.push([chunk.Images_One, chunk.Videos_One, chunk.Names_One, chunk.Images_Two, chunk.Videos_Two, chunk.Names_Two])
  })

  const dataStreamGallery = request.get('https://docs.google.com/spreadsheets/d/1LjDGLbRSaQ4Y7ilLy0LMPpgUZN6ynI8QRg--a2ltLt4/gviz/tq?tqx=out:csv&sheet=data')
  const parseStreamGallery = papa.parse(papa.NODE_STREAM_INPUT, options)
  dataStreamGallery.pipe(parseStreamGallery)
  parseStreamGallery.on('data', chunk => {
    dataGallery.push({
      original: chunk.Images,
      originalAlt: baseName(chunk.Images)
    })
  })

  const dataStreamImages = request.get('https://docs.google.com/spreadsheets/d/1oFpWin6qWbZnGi8s47RzfqtI14MRBHafL4FUl0OHijk/gviz/tq?tqx=out:csv&sheet=data')
  const parseStreamImages = papa.parse(papa.NODE_STREAM_INPUT, options)
  dataStreamImages.pipe(parseStreamImages)
  parseStreamImages.on('data', chunk => {
    delete chunk.Contact_Title
    delete chunk.About_Title
    delete chunk.Home_Title
    delete chunk.Logo_Title
    dataImages.push(chunk)
    if (chunk.Logo.length) dataImagesPreLoad['/'].unshift(chunk.Logo)
    if (chunk.Home.length) dataImagesPreLoad['/'].push(chunk.Home)
    if (chunk.Logo.length) dataImagesPreLoad['/about'].unshift(chunk.Logo)
    if (chunk.About.length) dataImagesPreLoad['/about'].push(chunk.About)
    if (chunk.Logo.length) dataImagesPreLoad['/gallery'].unshift(chunk.Logo)
    if (chunk.Logo.length) dataImagesPreLoad['/contact'].unshift(chunk.Logo)
    if (chunk.Contact.length) dataImagesPreLoad['/contact'].push(chunk.Contact)
    if (chunk.Logo.length) dataImagesPreLoad['/blog'].unshift(chunk.Logo)
  })

  const dataStreamHome = request.get('https://docs.google.com/spreadsheets/d/19IsSN9huwRRlCNUfWdvFSx6aMnBoAA8ZSEyQK6NjB7A/gviz/tq?tqx=out:csv&sheet=data')
  const parseStreamHome = papa.parse(papa.NODE_STREAM_INPUT, options)
  dataStreamHome.pipe(parseStreamHome)
  parseStreamHome.on('data', chunk => {
    delete chunk.Title
    dataHome.push(chunk)
  })

  const dataStreamSelectOptions = request.get('https://docs.google.com/spreadsheets/d/1oBVSxkf_Ep2XbJrhhc9J6byEfB8umgzL-rC9OOhL4X0/gviz/tq?tqx=out:csv&sheet=data')
  const parseStreamSelectOptions = papa.parse(papa.NODE_STREAM_INPUT, options)
  dataStreamSelectOptions.pipe(parseStreamSelectOptions)
  parseStreamSelectOptions.on('data', chunk => {
    dataSelectOptions.push({
      value: chunk.Select_Options,
      label: chunk.Select_Options
    })
  })

  const dataStreamBlog = request.get('https://docs.google.com/spreadsheets/d/10K5LaNIpqVSQ_ch0urNqN_s3YuyU7kUgXk3SZ_eXS9s/gviz/tq?tqx=out:csv&sheet=data')
  const parseStreamBlog = papa.parse(papa.NODE_STREAM_INPUT, options)
  dataStreamBlog.pipe(parseStreamBlog)
  parseStreamBlog.on('data', chunk => {
    delete chunk.Title
    dataBlog.push(chunk)
  })

  const dataStreamAbout = request.get('https://docs.google.com/spreadsheets/d/1v7TzLg2rShYbuDUokQkBy-IJjDCq49M_M5MjiQRBMfg/gviz/tq?tqx=out:csv&sheet=data')
  const parseStreamAbout = papa.parse(papa.NODE_STREAM_INPUT, options)
  dataStreamAbout.pipe(parseStreamAbout)
  parseStreamAbout.on('data', chunk => {
    delete chunk.Title
    dataAbout.push(chunk)
  })

  const dataStreamMap = request.get('https://docs.google.com/spreadsheets/d/1BxHA12ZHfra6gva_mm7o3nlQREf45DsjeMYQ1Mpg5y8/gviz/tq?tqx=out:csv&sheet=data')
  const parseStreamMap = papa.parse(papa.NODE_STREAM_INPUT, options)
  dataStreamMap.pipe(parseStreamMap)
  parseStreamMap.on('data', chunk => {
    dataMap.push({
      [index]: {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [JSON.parse('[' + chunk.Geo_Json_Array + ']')]
        }
      }
    })
    index++
  })
}

init()

app.post('/api-init', function (req, res) {
  res.json({
    Navigation: [dataNavigation[0].Navigation, dataNavigation[1].Navigation, dataNavigation[2].Navigation, dataNavigation[3].Navigation],
    Phone: dataContact[4].Contact,
    Hours: dataContact[9].Contact,
    Days: dataContact[10].Contact,
    ImagesPreLoad: dataImagesPreLoad,
    LogoMobileAlt: baseName(dataImages[0].Logo),
    LogoDesktopAlt: baseName(dataImages[1].Logo),
    LogoFooterAlt: baseName(dataImages[2].Logo)
  })
})

app.post('/api-home', function (req, res) {
  res.json({
    Message: dataHome[0].Home,
    Home_Svg: dataHome[1].Home,
    Quote_Heading: dataHome[2].Home,
    Quote: dataHome[3].Home,
    Card_Heading_One: dataHome[4].Home,
    Card_One: dataHome[5].Home,
    Card_Heading_Two: dataHome[6].Home,
    Card_Two: dataHome[7].Home,
    Card_Heading_Three: dataHome[8].Home,
    Card_Three: dataHome[9].Home,
    Card_Heading_Four: dataHome[10].Home,
    Card_Four: dataHome[11].Home,
    Url_One: dataHome[12].Home,
    Card_Heading_Five: dataHome[13].Home,
    Card_Five: dataHome[14].Home,
    Url_Two: dataHome[15].Home,
    Card_Heading_Six: dataHome[16].Home,
    Card_Six: dataHome[17].Home,
    Url_Three: dataHome[18].Home,
    Url_Button: dataHome[19].Home,
    Enquiries_Title: dataHome[20].Home,
    Select_Placeholder: dataHome[21].Home,
    Submitt_Form: dataHome[22].Home,
    Carousel_One_Mobile: dataImages[0].Home,
    Carousel_One_Desktop: dataImages[1].Home,
    Carousel_Two_Mobile: dataImages[2].Home,
    Carousel_Two_Desktop: dataImages[3].Home,
    Quote_Mobile: dataImages[4].Home,
    Quote_Desktop: dataImages[5].Home,
    Card_One_Image: dataImages[6].Home,
    Card_Two_Image: dataImages[7].Home,
    Card_Three_Image: dataImages[8].Home,
    Card_Four_Image: dataImages[9].Home,
    Card_Five_Image: dataImages[10].Home,
    Card_Six_Image: dataImages[11].Home,
    Carousel_One_Alt: baseName(dataImages[0].Home),
    Carousel_Two_Alt: baseName(dataImages[1].Home),
    Quote_Alt: baseName(dataImages[4].Home),
    Card_One_Image_Alt: baseName(dataImages[6].Home),
    Card_Two_Image_Alt: baseName(dataImages[7].Home),
    Card_Three_Image_Alt: baseName(dataImages[8].Home),
    Card_Four_Image_Alt: baseName(dataImages[9].Home),
    Card_Five_Image_Alt: baseName(dataImages[10].Home),
    Card_Six_Image_Alt: baseName(dataImages[11].Home),
    Video: dataVideos,
    Select_Options: dataSelectOptions
  })
})

app.post('/api-form', function (req, res) {
  const SCOPES = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.send'
  ]
  const TOKEN_PATH = 'token.json'
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err)
    authorize(JSON.parse(content), sendMessage)
  })
  function authorize (credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    )
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getNewToken(oAuth2Client, callback)
      oAuth2Client.setCredentials(JSON.parse(token))
      callback(oAuth2Client)
    })
  }
  function getNewToken (oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    })
    console.log('Authorize this app by visiting this url:', authUrl)
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
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
  function sendMessage (auth) {
    const gmail = google.gmail({ version: 'v1', auth })
    const str = [
      'Content-Type: text/html; charset="UTF-8"\n',
      'MIME-Version: 1.0\n',
      'Content-Transfer-Encoding: 7bit\n',
      'to: ',
      dataContact[2].Contact,
      '\n',
      'subject: ',
      'Candid Question',
      '\n\n',
      '<html>' +
      '<h1>Candid Question</h1>' +
      '<b>Name: </b>' + req.body.name + '<br><br>' +
      '<b>Email Address: </b>' + req.body.email + '<br><br>' +
      '<b>Phone #: </b>' + req.body.phone + '<br><br>' +
      '<b>Select Type: </b>' + req.body.selectedOption.value + '<br><br>' +
      '<b>Text: </b>' + req.body.text +
      '</html>'
    ].join('')
    gmail.users.messages.send(
      {
        userId: 'me',
        resource: {
          raw: Buffer.from(str).toString('base64').replace(/\+/g, '-').replace(/\//g, '_')
        }
      },
      (err) => {
        if (err) {
          console.log('NODEMAILER - The API returned an error: ' + err)
          return res.json({ e: 'Error' })
        }
        return res.json({ a: 'Enquiry email sent' })
      }
    )
  }
})

app.get('/api-blog', async function (req, res) {
  const doc = await Mod.find({}).sort({ date: -1 })
  return res.json({ doc, buttons: [dataBlog[0].Blog, dataBlog[1].Blog, dataBlog[2].Blog] })
})

app.post('/api-formAdd', async function (req, res) {
  if (req.body.passAdd === 'blogs') {
    const newdate = new Date()
    const date = moment(newdate).format("MMM Do YY' HH:mm:ss")
    const id = new mongoose.Types.ObjectId()
    const ext = req.body.file.split(';')[0].split('/')[1]
    const location = ['/pic/', id, '.', ext]
    const blog = new Mod({
      _id: id,
      date,
      blog: req.body.blog,
      name: req.body.name,
      title: req.body.title,
      loc: location.join('')
    })
    const path = [__dirname, '/public/pic/', id, '.', ext]
    fs.writeFileSync(
      path.join(''),
      Buffer.from(req.body.file.split(';base64,').pop(), 'base64')
    )
    await blog.save()
    return res.json(await Mod.find().sort({ date: -1 }))
  } else {
    return res.json({ e: 'Incorrect password' })
  }
})

app.post('/api-formRemove', async function (req, res) {
  if (req.body.passRemove === 'blogs') {
    const doc = await Mod.find({ date: req.body.date })
    if (doc.length) {
      const path = [__dirname, '/public', doc[0].loc]
      fs.unlinkSync(path.join(''))
      await Mod.deleteOne({ date: req.body.date })
      return res.json(await Mod.find().sort({ date: -1 }))
    } else {
      return res.json({ e: 'Incorrect date' })
    }
  } else {
    return res.json({ e: 'Incorrect password' })
  }
})

app.post('/api-gallery', function (req, res) {
  res.json({ Images: dataGallery })
})

app.post('/api-contact', function (req, res) {
  res.json({
    Heading_One: dataContact[0].Contact,
    Email_Tag: dataContact[1].Contact,
    Email: dataContact[2].Contact,
    Phone_Tag: dataContact[3].Contact,
    Enquiries_Tag: dataContact[5].Contact,
    Enquiries_Button: dataContact[6].Contact,
    Heading_Two: dataContact[7].Contact,
    Availabilty: dataContact[8].Contact,
    Image: dataImages[0].Contact,
    Image_Alt: baseName(dataImages[0].Contact)
  })
})

app.post('/api-about', function (req, res) {
  res.json({
    A: {
      Heading_One: dataAbout[0].About,
      Map_Names: dataAbout[1].About,
      Heading_Two: dataAbout[2].About,
      Heading_Three: dataAbout[3].About,
      Span_One: dataAbout[4].About,
      Span_One_More: dataAbout[5].About,
      Heading_Four: dataAbout[6].About,
      Span_Two: dataAbout[7].About,
      Span_Two_More: dataAbout[8].About,
      More_Button: dataAbout[9].About,
      More_Close_Button: dataAbout[10].About,
      Image: dataImages[0].About,
      Image_Alt: baseName(dataImages[0].About)
    },
    B: {
      Data: dataMap
    }
  })
})

app.get('/reset', function (req, res) {
  init()
  res.json({ content: 'reloaded' })
})
