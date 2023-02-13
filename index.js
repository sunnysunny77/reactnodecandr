let { google } = require("googleapis");
let fs = require("fs");
let readline = require("readline");
let mongoose = require("mongoose");
let Papa = require("papaparse");
let axios = require("axios");

mongoose.connect("mongodb://localhost/bloga", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let moment = require("moment");

let key = fs.readFileSync(__dirname + "/certsFiles/selfsigned.key");
let cert = fs.readFileSync(__dirname + "/certsFiles/selfsigned.crt");
let credentials = {
  key: key,
  cert: cert,
};

let express = require("express");
let app = express();
let https = require("https").createServer(credentials, app);
let httpsPort = 3005;

https.listen(httpsPort, () => {
  console.log("Https server listing on port : " + httpsPort);
});

let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  let allowedOrigins = [
    "https://candidcleaning.sunnyhome.site"
  ];
  let origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  return next();
});

let sch = mongoose.Schema({
  date: String,
  blogers: String,
  name: String,
  title: String,
  loc: String,
});

let mod = mongoose.model("blogs", sch);

app.use(express.static("public"));

let parsedDataContent;
let parsedDataMaps;
let parsedDataForm;
let parsedDataGallery;
let parsedDataVideo;
let buttons;

function video() {
  axios
    .get(
      `https://docs.google.com/spreadsheets/d/1tkby9LJ9HDOhvABilAriVZ5ILW42BFX2-9D2QxajWRk/gviz/tq?tqx=out:csv&sheet=data`
    )
    .then((res) => {
      let parsedDataInital = Papa.parse(res.data, { skipEmptyLines: true });
      if (parsedDataInital.data.length > 1) {
        let l = parsedDataInital.data.length - 1;
        let l0 = l % 2;
        let parsedDataArray = [];
        if (l0 === 0) {
          for (let i = 1; i <= l / 2; i++) {
            if (
              parsedDataInital.data[i * 2 - 1][0] &&
              parsedDataInital.data[i * 2 - 1][1] &&
              parsedDataInital.data[i * 2 - 1][2] &&
              parsedDataInital.data[i * 2][0] &&
              parsedDataInital.data[i * 2][1] &&
              parsedDataInital.data[i * 2][2]
            ) {
              parsedDataArray.push([
                parsedDataInital.data[i * 2 - 1][0],
                parsedDataInital.data[i * 2 - 1][1],
                parsedDataInital.data[i * 2 - 1][2],
                parsedDataInital.data[i * 2][0],
                parsedDataInital.data[i * 2][1],
                parsedDataInital.data[i * 2][2],
              ]);
            } else {
              return (parsedDataVideo = undefined);
            }
          }
          return parsedDataVideo = parsedDataArray;
        } else {
          return (parsedDataVideo = undefined);
        }
      } else {
        return (parsedDataVideo = undefined);
      }
    })
    .catch(() => {
      return sendStatus(500);
    });
}

function gallery() {
  axios
    .get(
      `https://docs.google.com/spreadsheets/d/1LjDGLbRSaQ4Y7ilLy0LMPpgUZN6ynI8QRg--a2ltLt4/gviz/tq?tqx=out:csv&sheet=data`
    )
    .then((res) => {
      let parsedDataInital = Papa.parse(res.data, { skipEmptyLines: true });
      if (parsedDataInital.data.length > 1) {
        let l = parsedDataInital.data.length - 1;
        let parsedDataArray = [];
        for (let i = 1; i <= l; i++) {
          parsedDataArray.push({
            original: parsedDataInital.data[i][0],
            thumbnail: parsedDataInital.data[i][0],
            originalAlt: parsedDataInital.data[i][0]
              .split("/")
              .pop()
              .split(".")
              .slice(0, -1)
              .join("."),
            thumbnailAlt:
              parsedDataInital.data[i][0]
                .split("/")
                .pop()
                .split(".")
                .slice(0, -1)
                .join(".") + ":Thumbnail",
          });
        }
        return (parsedDataGallery = parsedDataArray);
      } else {
        return (parsedDataGallery = undefined);
      }
    })
    .catch(() => {
      return sendStatus(500);
    });
}

function content() {
  axios
    .get(
      `https://docs.google.com/spreadsheets/d/1gLb1KAZd-dY1Jlw1z-JPVev1WkeOL_tIitvzkrW97dQ/gviz/tq?tqx=out:csv&sheet=data`
    )
    .then((res) => {
      let parsedDataInital = Papa.parse(res.data, { skipEmptyLines: true });
      if (parsedDataInital.data.length > 40) {
        let l = parsedDataInital.data.length - 40;
        let parsedDataArray = [];
        for (let i = 1; i <= l; i++) {
          parsedDataArray.push({
            value: parsedDataInital.data[39 + i][1],
            label: parsedDataInital.data[39 + i][1],
          });
        }
        return (
          (parsedDataContent = parsedDataInital),
          (parsedDataForm = parsedDataArray),
          (buttons = [
            parsedDataInital.data[1][4],
            parsedDataInital.data[2][4],
            parsedDataInital.data[3][4],
            parsedDataInital.data[4][4],
            parsedDataInital.data[5][4],
            parsedDataInital.data[6][4],
            parsedDataInital.data[7][4],
            parsedDataInital.data[8][4],
            parsedDataInital.data[9][4],
            parsedDataInital.data[10][4],
            parsedDataInital.data[11][4],
            parsedDataInital.data[12][4],
          ])
        );
      } else {
        return (
          (parsedDataContent = undefined), (parsedDataForm = undefined), (buttons = undefined)
        );
      }
    })
    .catch(() => {
      return sendStatus(500);
    });
}

function maps() {
  axios
    .get(
      `https://docs.google.com/spreadsheets/d/1BxHA12ZHfra6gva_mm7o3nlQREf45DsjeMYQ1Mpg5y8/gviz/tq?tqx=out:csv&sheet=data`
    )
    .then((res) => {
      let parsedDataInital = Papa.parse(res.data, { skipEmptyLines: true });
      if (parsedDataInital.data.length > 4) {
        let parsedDataArray = [];
        let l = parsedDataInital.data.length - 1;
        for (let i = 0; i <= l; i++) {
          if (i >= 3) {
            parsedDataArray.push({
              [i - 2]: {
                type: "Feature",
                geometry: {
                  type: "Polygon",
                  coordinates: [JSON.parse("[" + parsedDataInital.data[i][0] + "]")],
                },
              },
            });
          }
        };
        return (parsedDataMaps = [
          parsedDataInital.data[1][0],
          parsedDataArray,
          parsedDataInital.data[1][1],
        ]);
      } else {
        parsedDataMaps = undefined;
        return;
      }
    })
    .catch(() => {
      return sendStatus(500);
    });
}

video();
gallery();
content();
maps();

app.post("/one", function (req, res) {
  if (req.body.passw === "blogs") {
    let newdate = new Date();
    let date = moment(newdate).format("MMM Do YY' HH:mm:ss");
    let id = mongoose.Types.ObjectId();
    let blog = new mod({
      _id: id,
      date: date,
      blogers: req.body.blogers,
      name: req.body.name,
      title: req.body.title,
      loc: "/pic/" + id + ".jpg",
    });
    blog.save(function (err, doc) {
      fs.writeFileSync(
        __dirname + "/public/pic/" + id + ".jpg",
        new Buffer(req.body.file.split(';base64,').pop(), "base64")
      );
      mod
        .find({})
        .sort({ date: -1 })
        .exec(function (err, doc) {
          return res.json(doc);
        });
    });
  } else {
    return res.json({ e: "Incorrect password" });
  }
});

app.post("/two", function (req, res) {
  if (req.body.passw0 === "blogs") {
    mod.find({ date: req.body.ddate }, function (err, doc) {
      if (doc.length) {
        fs.unlinkSync(__dirname + "/public/pic/" + doc[0]._id + ".jpg");
        mod.deleteOne({ date: req.body.ddate }, function (err) {
          mod
            .find({})
            .sort({ date: -1 })
            .exec(function (err, doc) {
              return res.json(doc);
            });
        });
      } else {
        return res.json({ e: "Incorrect date" });
      }
    });
  } else {
    return res.json({ e: "Incorrect password" });
  }
});

app.post("/three", function (req, res) {
  const SCOPES = [
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/gmail.send",
  ];
  const TOKEN_PATH = "token.json";
  fs.readFile("credentials.json", (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    authorize(JSON.parse(content), sendMessage);
  });
  function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getNewToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }
  function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });
    console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("Enter the code from that page here: ", (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error("Error retrieving access token", err);
        oAuth2Client.setCredentials(token);
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log("Token stored to", TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
  }
  function sendMessage(auth) {
    let gmail = google.gmail({ version: "v1", auth });
    let s = String(
      "Name:" +
      "\xa0" +
      req.body.name +
      "\n\n" +
      "Email Address:" +
      "\xa0" +
      req.body.email +
      "\n\n" +
      "Phone #:" +
      "\xa0" +
      req.body.phone +
      "\n\n" +
      "Select Type:" +
      "\xa0" +
      req.body.selectedOption.value +
      "\n\n" +
      "Text:" +
      "\xa0" +
      req.body.text
    );
    let str = [
      'Content-Type: text/plain; charset="UTF-8"\n',
      "MIME-Version: 1.0\n",
      "Content-Transfer-Encoding: 7bit\n",
      "to: ",
      parsedDataContent.data[5][1],
      "\n",
      "from: ",
      "",
      "\n",
      "subject: ",
      "Candid Question",
      "\n\n",
      s,
    ].join("");
    let raw = new Buffer(str)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
    gmail.users.messages.send(
      {
        userId: "me",
        resource: {
          raw: raw,
        },
      },
      (err, result) => {
        if (err) {
          console.log("NODEMAILER - The API returned an error: " + err);
          return res.json({ e: "Error" });
        }
        return res.json({ a: "Enquiry email sent" });
      }
    );
  }
});

app.get("/ong", function (req, res) {
  mod
    .find({})
    .sort({ date: -1 })
    .exec(function (err, doc) {
      if (buttons !== undefined && doc.length) {
        return res.json({ doc: doc, buttons: [buttons[0], buttons[6], buttons[7], buttons[8]] });
      } else if (buttons !== undefined && !doc.length) {
        return res
          .status(404)
          .send({ doc: "No posts yet", buttons: [buttons[0], buttons[6], buttons[7], buttons[8]] });
      } else if (buttons === undefined) {
        return res.sendStatus(500);
      }
    });
});

app.post("/nav", function (req, res) {
  if (parsedDataContent !== undefined && buttons !== undefined) {
    return res.json({
      ph: parsedDataContent.data[7][1],
      time: parsedDataContent.data[1][1],
      day: parsedDataContent.data[2][1],
      buttons: [buttons[0], buttons[1], buttons[2], buttons[3]],
    });
  } else {
    return res.sendStatus(500);
  }
});

app.post("/hom", function (req, res) {
  if (
    parsedDataContent !== undefined &&
    parsedDataMaps !== undefined &&
    buttons !== undefined &&
    parsedDataVideo !== undefined &&
    parsedDataForm !== undefined
  ) {
    return res.json({
      m1: parsedDataContent.data[21][1],
      m2: parsedDataContent.data[22][1],
      qh: parsedDataContent.data[23][1],
      q: parsedDataContent.data[24][1],
      ch1: parsedDataContent.data[25][1],
      ch2: parsedDataContent.data[26][1],
      ch3: parsedDataContent.data[27][1],
      ch4: parsedDataContent.data[28][1],
      ch5: parsedDataContent.data[29][1],
      ch6: parsedDataContent.data[30][1],
      c1: parsedDataContent.data[31][1],
      c2: parsedDataContent.data[32][1],
      c3: parsedDataContent.data[33][1],
      c4: parsedDataContent.data[34][1],
      c5: parsedDataContent.data[35][1],
      c6: parsedDataContent.data[36][1],
      u4: parsedDataContent.data[37][1],
      u5: parsedDataContent.data[38][1],
      u6: parsedDataContent.data[39][1],
      options: parsedDataForm,
      svg: parsedDataContent.data[1][2],
      buttons: [buttons[10], buttons[9], buttons[8], buttons[11]],
      vid: parsedDataVideo,
    });
  } else {
    return res.sendStatus(500);
  }
});

app.post("/cont", function (req, res) {
  if (parsedDataContent !== undefined && buttons !== undefined) {
    return res.json({
      h: parsedDataContent.data[3][1],
      et: parsedDataContent.data[4][1],
      email: parsedDataContent.data[5][1],
      pt: parsedDataContent.data[6][1],
      ph: parsedDataContent.data[7][1],
      it: parsedDataContent.data[8][1],
      it2: parsedDataContent.data[9][1],
      h2: parsedDataContent.data[10][1],
      avail: parsedDataContent.data[11][1],
      buttons: [buttons[2]],
    });
  } else {
    return res.sendStatus(500);
  }
});

app.post("/abou", function (req, res) {
  if (
    parsedDataMaps !== undefined &&
    parsedDataContent !== undefined &&
    buttons !== undefined
  ) {
    return res.json({
      a: {
        hmap: parsedDataMaps[2],
        hm: parsedDataContent.data[13][1],
        h1: parsedDataContent.data[14][1],
        span1: parsedDataContent.data[15][1],
        span2: parsedDataContent.data[16][1],
        h2: parsedDataContent.data[17][1],
        span3: parsedDataContent.data[18][1],
        span4: parsedDataContent.data[19][1],
        buttons: [buttons[3], buttons[4], buttons[5]],
      },
      b: {
        cba: parsedDataMaps[0],
        abc: parsedDataMaps[1],
      },
    });
  } else {
    return res.sendStatus(500);
  }
});

app.post("/g", function (req, res) {
  if (parsedDataGallery !== undefined && buttons !== undefined) {
    return res.json({ images: parsedDataGallery, buttons: [buttons[1]] });
  } else {
    return res.sendStatus(500);
  }
});

app.get("/reset", function (req, res) {
  res.json({ content: "reloaded" });
  video();
  gallery();
  content();
  maps();
});
