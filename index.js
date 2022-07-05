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

let parsedData;
let parsedData0;
let parsedData1;
let parsedData2;
var parsedData3;
let b;

//vid
axios
  .get(
    `https://docs.google.com/spreadsheets/d/1tkby9LJ9HDOhvABilAriVZ5ILW42BFX2-9D2QxajWRk/gviz/tq?tqx=out:csv&sheet=data`
  )
  .then((res) => {
    let parsedDataI = Papa.parse(res.data, { skipEmptyLines: true });
    if (parsedDataI.data.length > 1) {
      let l = parsedDataI.data.length - 1;
      let l0 = l % 2;
      let parsedDataA = [];
      if (l0 === 0) {
        for (let i = 1; i <= l / 2; i++) {
          if (
            parsedDataI.data[i * 2 - 1][0] &&
            parsedDataI.data[i * 2 - 1][1] &&
            parsedDataI.data[i * 2 - 1][2] &&
            parsedDataI.data[i * 2][0] &&
            parsedDataI.data[i * 2][1] &&
            parsedDataI.data[i * 2][2]
          ) {
            parsedDataA.push([
              parsedDataI.data[i * 2 - 1][0],
              parsedDataI.data[i * 2 - 1][1],
              parsedDataI.data[i * 2 - 1][2],
              parsedDataI.data[i * 2][0],
              parsedDataI.data[i * 2][1],
              parsedDataI.data[i * 2][2],
            ]);
          } else {
            return (parsedData3 = undefined);
          }
        }
        return parsedData3 = parsedDataA;
      } else {
        return (parsedData3 = undefined);
      }
    } else {
      return (parsedData3 = undefined);
    }
  })
  .catch(() => {
    return sendStatus(500);
  });

//gal
axios
  .get(
    `https://docs.google.com/spreadsheets/d/1LjDGLbRSaQ4Y7ilLy0LMPpgUZN6ynI8QRg--a2ltLt4/gviz/tq?tqx=out:csv&sheet=data`
  )
  .then((res) => {
    let parsedDataI = Papa.parse(res.data, { skipEmptyLines: true });
    if (parsedDataI.data.length > 1) {
      let l = parsedDataI.data.length - 1;
      let parsedDataA = [];
      for (let i = 1; i <= l; i++) {
        parsedDataA.push({
          original: parsedDataI.data[i][0],
          thumbnail: parsedDataI.data[i][0],
          originalAlt: parsedDataI.data[i][0]
            .split("/")
            .pop()
            .split(".")
            .slice(0, -1)
            .join("."),
          thumbnailAlt:
            parsedDataI.data[i][0]
              .split("/")
              .pop()
              .split(".")
              .slice(0, -1)
              .join(".") + ":Thumbnail",
        });
      }
      return (parsedData2 = parsedDataA);
    } else {
      return (parsedData2 = undefined);
    }
  })
  .catch(() => {
    return sendStatus(500);
  });

//content
axios
  .get(
    `https://docs.google.com/spreadsheets/d/1gLb1KAZd-dY1Jlw1z-JPVev1WkeOL_tIitvzkrW97dQ/gviz/tq?tqx=out:csv&sheet=data`
  )
  .then((res) => {
    let parsedDataI = Papa.parse(res.data, { skipEmptyLines: true });
    if (parsedDataI.data.length > 40) {
      let l = parsedDataI.data.length - 40;
      let parsedDataA = [];
      for (let i = 1; i <= l; i++) {
        parsedDataA.push({
          value: parsedDataI.data[39 + i][1],
          label: parsedDataI.data[39 + i][1],
        });
      }
      return (
        (parsedData = parsedDataI),
        (parsedData1 = parsedDataA),
        (b = [
          parsedDataI.data[1][4],
          parsedDataI.data[2][4],
          parsedDataI.data[3][4],
          parsedDataI.data[4][4],
          parsedDataI.data[5][4],
          parsedDataI.data[6][4],
          parsedDataI.data[7][4],
          parsedDataI.data[8][4],
          parsedDataI.data[9][4],
          parsedDataI.data[10][4],
          parsedDataI.data[11][4],
          parsedDataI.data[12][4],
        ])
      );
    } else {
      return (
        (parsedData = undefined), (parsedData1 = undefined), (b = undefined)
      );
    }
  })
  .catch(() => {
    return sendStatus(500);
  });

//maps
axios
  .get(
    `https://docs.google.com/spreadsheets/d/1IouN-lz5mjCpEBqa2wER0swruvmUedhDMJyitlgJysU/gviz/tq?tqx=out:csv&sheet=data`
  )
  .then((res) => {
    let parsedDataI = Papa.parse(res.data, { skipEmptyLines: true });
    if (parsedDataI.data.length > 4) {
      if (parsedDataI.data[3].length % 2 === 0) {
        let parsedDataA = [];
        let l = parsedDataI.data[3].length / 2;
        for (let i = 1; i <= l; i++) {
          let g = i * 2;
          parsedDataA.push({
            [i]: {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [[]],
              },
            },
          });
          for (let x in parsedDataI.data) {
            if (x >= 3) {
              if (
                (parsedDataI.data[3][g - 2].length !== 0,
                parsedDataI.data[3][g - 1].length !== 0)
              ) {
                if (
                  parsedDataI.data[x][g - 2].length &&
                  parsedDataI.data[x][g - 1].length
                ) {
                  parsedDataA[i - 1][i].geometry.coordinates[0].push([
                    parsedDataI.data[x][g - 2],
                    parsedDataI.data[x][g - 1],
                  ]);
                }
              } else {
                return (parsedData0 = undefined);
              }
            }
          }
        }
        return (parsedData0 = [
          parsedDataI.data[1][0],
          parsedDataA,
          parsedDataI.data[1][1],
        ]);
      } else {
        return (parsedData0 = undefined);
      }
    } else {
      parsedData0 = undefined;
      return;
    }
  })
  .catch(() => {
    return sendStatus(500);
  });

app.post("/one", function (req, res) {
  if (req.body.passw === "") {
    function decodeBase64Image(dataString) {
      var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};
      if (matches.length !== 3) {
        return res.json({ e: "Invalid input string" });
      }
      response.type = matches[1];
      response.data = new Buffer(matches[2], "base64");
      return response;
    }
    let imageBuffer = decodeBase64Image(req.body.file);
    let d = new Date();
    let date = moment(d).format("MMM Do YY' HH:mm:ss");
    var id = mongoose.Types.ObjectId();
    let b = new mod({
      _id: id,
      date: date,
      blogers: req.body.blogers,
      name: req.body.name,
      title: req.body.title,
      loc: "/pic/" + id + ".jpg",
    });
    b.save(function (err, doc) {
      fs.writeFile(
        __dirname + "/public/pic/" + id + ".jpg",
        imageBuffer.data,
        function (err) {}
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
  if (req.body.passw0 === "") {
    mod.find({ date: req.body.ddate }, function (err, doc) {
      if (doc.length) {
        fs.unlink(
          __dirname + "/public/pic/" + doc[0]._id + ".jpg",
          function (err) {}
        );
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
      parsedData.data[5][1],
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
        return res.json({ a: "Inquiry email sent" });
      }
    );
  }
});

app.get("/ong", function (req, res) {
  mod
    .find({})
    .sort({ date: -1 })
    .exec(function (err, doc) {
      if (b !== undefined && doc.length) {
        return res.json({ doc: doc, buttons: [b[0], b[6], b[7], b[8]] });
      } else if (b !== undefined && !doc.length) {
        res
          .status(404)
          .send({ doc: "No posts yet", buttons: [b[0], b[6], b[7], b[8]] });
      } else if (b === undefined) {
        res.status(500);
      }
    });
});

app.post("/nav", function (req, res) {
  if (parsedData !== undefined && b !== undefined) {
    return res.json({
      ph: parsedData.data[7][1],
      time: parsedData.data[1][1],
      day: parsedData.data[2][1],
      buttons: [b[0], b[1], b[2], b[3]],
    });
  } else {
    return res.sendStatus(500);
  }
});

app.post("/hom", function (req, res) {
  if (
    parsedData !== undefined &&
    parsedData0 !== undefined &&
    b !== undefined &&
    parsedData3 !== undefined
  ) {
    return res.json({
      m1: parsedData.data[21][1],
      m2: parsedData.data[22][1],
      qh: parsedData.data[23][1],
      q: parsedData.data[24][1],
      ch1: parsedData.data[25][1],
      ch2: parsedData.data[26][1],
      ch3: parsedData.data[27][1],
      ch4: parsedData.data[28][1],
      ch5: parsedData.data[29][1],
      ch6: parsedData.data[30][1],
      c1: parsedData.data[31][1],
      c2: parsedData.data[32][1],
      c3: parsedData.data[33][1],
      c4: parsedData.data[34][1],
      c5: parsedData.data[35][1],
      c6: parsedData.data[36][1],
      u4: parsedData.data[37][1],
      u5: parsedData.data[38][1],
      u6: parsedData.data[39][1],
      options: parsedData1,
      svg: parsedData.data[1][2],
      buttons: [b[10], b[9], b[8], b[11]],
      vid: parsedData3,
    });
  } else {
    return res.sendStatus(500);
  }
});

app.post("/cont", function (req, res) {
  if (parsedData !== undefined && b !== undefined) {
    return res.json({
      h: parsedData.data[3][1],
      et: parsedData.data[4][1],
      email: parsedData.data[5][1],
      pt: parsedData.data[6][1],
      ph: parsedData.data[7][1],
      it: parsedData.data[8][1],
      it2: parsedData.data[9][1],
      h2: parsedData.data[10][1],
      avail: parsedData.data[11][1],
      buttons: [b[2]],
    });
  } else {
    return res.sendStatus(500);
  }
});

app.post("/abou", function (req, res) {
  if (
    parsedData0 !== undefined &&
    parsedData !== undefined &&
    b !== undefined
  ) {
    return res.json({
      a: {
        hmap: parsedData0[2],
        hm: parsedData.data[13][1],
        h1: parsedData.data[14][1],
        span1: parsedData.data[15][1],
        span2: parsedData.data[16][1],
        h2: parsedData.data[17][1],
        span3: parsedData.data[18][1],
        span4: parsedData.data[19][1],
        buttons: [b[3], b[4], b[5]],
      },
      b: {
        cba: parsedData0[0],
        abc: parsedData0[1],
      },
    });
  } else {
    return res.sendStatus(500);
  }
});

app.post("/g", function (req, res) {
  if (parsedData2 !== undefined && b !== undefined) {
    return res.json({ images: parsedData2, buttons: [b[1]] });
  } else {
    return res.sendStatus(500);
  }
});

app.get("/reset", function (req, res) {
  res.json({ reset: "yes" });
  process.exit();
});
