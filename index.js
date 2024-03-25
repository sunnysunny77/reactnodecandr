let { google } = require("googleapis");
let fs = require("fs");
let readline = require("readline");
let mongoose = require("mongoose");
let Papa = require("papaparse");
let axios = require("axios");

mongoose.connect("mongodb://localhost/bloga");

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

let sch = new mongoose.Schema({
  date: String,
  blog: String,
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
let parsedDataGalleryImages;
let parsedDataVideo;
let parsedDataVideoImages;
let buttons;

function baseName(param) { 
  return param.split("/")
  .pop()
  .split(".")
  .slice(0, -1)
  .join(".");
 }

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
        let parsedDataArray = [[],[]];
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
              parsedDataArray[0].push([
                parsedDataInital.data[i * 2 - 1][0],
                parsedDataInital.data[i * 2 - 1][1],
                parsedDataInital.data[i * 2 - 1][2],
                parsedDataInital.data[i * 2][0],
                parsedDataInital.data[i * 2][1],
                parsedDataInital.data[i * 2][2],
              ]);
              parsedDataArray[1].push(
                parsedDataInital.data[i * 2 - 1][0],
                parsedDataInital.data[i * 2][0],
              );
            } else {
              return (
                (parsedDataVideo = undefined), (parsedDataVideoImages = undefined)
              );
            }
          }
          return (
            (parsedDataVideo = parsedDataArray[0]), (parsedDataVideoImages = parsedDataArray[1])
          );
        } else {
          return (
            (parsedDataVideo = undefined), (parsedDataVideoImages = undefined)
          );
        }
      } else {
        return (
          (parsedDataVideo = undefined), (parsedDataVideoImages = undefined)
        );
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
        let parsedDataArray = [[],[]];
        for (let i = 1; i <= l; i++) {
          parsedDataArray[0].push({
            original: parsedDataInital.data[i][0],
            originalAlt: baseName(parsedDataInital.data[i][0]),
          });
          parsedDataArray[1].push(
            parsedDataInital.data[i][0]
          );
        }
        return (
          (parsedDataGallery = parsedDataArray[0]), (parsedDataGalleryImages = parsedDataArray[1])
          );
      } else {
        return (
          (parsedDataGallery = undefined), (parsedDataGalleryImage = undefined)
        );
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
      if (parsedDataInital.data.length > 39) {
        let l = parsedDataInital.data.length - 39;
        let parsedDataArray = [];
        for (let i = 1; i <= l; i++) {
          parsedDataArray.push({
            value: parsedDataInital.data[38 + i][1],
            label: parsedDataInital.data[38 + i][1],
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

app.post("/api-init", function (req, res) {
  if (parsedDataContent !== undefined && buttons !== undefined && parsedDataVideoImages !== undefined && parsedDataGalleryImages !== undefined)  {
    let images = { 
        "/": [
        parsedDataContent.data[31][4],
        parsedDataContent.data[33][4],
        parsedDataContent.data[32][4],
        parsedDataContent.data[18][4],
        parsedDataContent.data[19][4],
        parsedDataContent.data[20][4],
        parsedDataContent.data[21][4],
        parsedDataContent.data[22][4],
        parsedDataContent.data[23][4],
        parsedDataContent.data[24][4],
        parsedDataContent.data[25][4],
        parsedDataContent.data[26][4],
        parsedDataContent.data[27][4],
        parsedDataContent.data[28][4],
        parsedDataContent.data[29][4],
        "https://candid.s3-ap-southeast-2.amazonaws.com/welcome.png",
      ],
      "/about": [
        parsedDataContent.data[31][4],
        parsedDataContent.data[33][4],
        parsedDataContent.data[32][4],
        parsedDataContent.data[16][4],
        "https://candid.s3-ap-southeast-2.amazonaws.com/divider.png",
        "https://candid.s3-ap-southeast-2.amazonaws.com/wave.svg",
        "https://candid.s3-ap-southeast-2.amazonaws.com/stickyTop.svg",
      ],
      "/gallery": [
        parsedDataContent.data[31][4],
        parsedDataContent.data[33][4],
        parsedDataContent.data[32][4],
        "https://candid.s3-ap-southeast-2.amazonaws.com/stickyTop.svg",
      ],
      "/contact": [
        parsedDataContent.data[31][4],
        parsedDataContent.data[33][4],
        parsedDataContent.data[32][4],
        parsedDataContent.data[14][4],
        "https://candid.s3-ap-southeast-2.amazonaws.com/wave.svg",
        "https://candid.s3-ap-southeast-2.amazonaws.com/stickyTop.svg",
      ],
      "/blog": [
        parsedDataContent.data[31][4],
        parsedDataContent.data[33][4],
        parsedDataContent.data[32][4],
        "https://candid.s3-ap-southeast-2.amazonaws.com/stickyTop.svg",
      ],
    };
    parsedDataVideoImages.forEach(element => {
      images["/"].push(element);
    });
    parsedDataGalleryImages.forEach(element => {
      images["/gallery"].push(element);
    });
    return res.json({
      phone: parsedDataContent.data[7][1],
      hours: parsedDataContent.data[1][1],
      days: parsedDataContent.data[2][1],
      buttons: [buttons[0], buttons[1], buttons[2], buttons[3]],
      logoFooterAlt: baseName(parsedDataContent.data[31][4]),
      logoMobileAlt: baseName(parsedDataContent.data[33][4]), 
      logoDesktopAlt: baseName(parsedDataContent.data[32][4]), 
      images: images,
    });
  } else {
    return res.sendStatus(500);
  }
});

app.post("/api-home", function (req, res) {
  if (
    parsedDataContent !== undefined &&
    buttons !== undefined &&
    parsedDataVideo !== undefined &&
    parsedDataForm !== undefined
  ) {
    return res.json({
      message: parsedDataContent.data[21][1],
      quoteHeading: parsedDataContent.data[22][1],
      quote: parsedDataContent.data[23][1],
      cardHeadingOne: parsedDataContent.data[24][1],
      cardHeadingTwo: parsedDataContent.data[25][1],
      cardHeadingThree: parsedDataContent.data[26][1],
      cardHeadingFour: parsedDataContent.data[27][1],
      cardHeadingFive: parsedDataContent.data[28][1],
      cardHeadingSix: parsedDataContent.data[29][1],
      cardOne: parsedDataContent.data[30][1],
      cardTwo: parsedDataContent.data[31][1],
      cardThree: parsedDataContent.data[32][1],
      cardFour: parsedDataContent.data[33][1],
      cardFive: parsedDataContent.data[34][1],
      cardSix: parsedDataContent.data[35][1],
      urlFour: parsedDataContent.data[36][1],
      urlFive: parsedDataContent.data[37][1],
      urlSix: parsedDataContent.data[38][1],
      options: parsedDataForm,
      svg: parsedDataContent.data[1][2],
      carouselOneMobile: parsedDataContent.data[18][4],
      carouselOneDesktop: parsedDataContent.data[19][4],
      carouselTwoMobile: parsedDataContent.data[20][4],
      carouselTwoDesktop: parsedDataContent.data[21][4],
      quoteMobile: parsedDataContent.data[22][4],
      quoteDesktop: parsedDataContent.data[23][4],
      cardOneImage: parsedDataContent.data[24][4],
      cardTwoImage: parsedDataContent.data[25][4],
      cardThreeImage: parsedDataContent.data[26][4],
      cardFourImage: parsedDataContent.data[27][4],
      cardFiveImage: parsedDataContent.data[28][4],
      cardSixImage: parsedDataContent.data[29][4],
      carouselOneAlt: baseName(parsedDataContent.data[19][4]),
      carouselTwoAlt: baseName(parsedDataContent.data[21][4]),
      quoteAlt: baseName(parsedDataContent.data[23][4]), 
      cardOneImageAlt: baseName(parsedDataContent.data[24][4]), 
      cardTwoImageAlt: baseName(parsedDataContent.data[25][4]),  
      cardThreeImageAlt: baseName(parsedDataContent.data[26][4]),  
      cardFourImageAlt: baseName(parsedDataContent.data[27][4]),  
      cardFiveImageAlt: baseName(parsedDataContent.data[28][4]), 
      cardSixImageAlt: baseName(parsedDataContent.data[29][4]),  

      buttons: [buttons[10], buttons[9], buttons[8], buttons[11]],
      video: parsedDataVideo,
     
    });
  } else {
    return res.sendStatus(500);
  }
});

app.post("/api-gallery", function (req, res) {
  if (parsedDataGallery !== undefined && buttons !== undefined) {
    return res.json({ images: parsedDataGallery, buttons: [buttons[1]] });
  } else {
    return res.sendStatus(500);
  }
});

app.post("/api-contact", function (req, res) {
  if (parsedDataContent !== undefined && buttons !== undefined) {
    return res.json({
      headingOne: parsedDataContent.data[3][1],
      emailTag: parsedDataContent.data[4][1],
      email: parsedDataContent.data[5][1],
      phoneTag: parsedDataContent.data[6][1],
      phone: parsedDataContent.data[7][1],
      enquiriesTagOne: parsedDataContent.data[8][1],
      enquiriesTagTwo: parsedDataContent.data[9][1],
      headingTwo: parsedDataContent.data[10][1],
      availability: parsedDataContent.data[11][1],
      image: parsedDataContent.data[14][4],
      imageAlt: baseName(parsedDataContent.data[14][4]), 
      buttons: [buttons[2]],
    });
  } else {
    return res.sendStatus(500);
  }
});

app.post("/api-about", function (req, res) {
  if (
    parsedDataMaps !== undefined &&
    parsedDataContent !== undefined &&
    buttons !== undefined
  ) {
    return res.json({
      a: {
        headingMap: parsedDataMaps[2],
        headingMain: parsedDataContent.data[13][1],
        headingOne: parsedDataContent.data[14][1],
        spanOne: parsedDataContent.data[15][1],
        spanReadMoreOne: parsedDataContent.data[16][1],
        headingTwo: parsedDataContent.data[17][1],
        spanTwo: parsedDataContent.data[18][1],
        spanReadMoreTwo: parsedDataContent.data[19][1],
        image: parsedDataContent.data[16][4],
        imageAlt: baseName(parsedDataContent.data[16][4]),  
        buttons: [buttons[3], buttons[4], buttons[5]],
      },
      b: {
        mapNames: parsedDataMaps[0],
        data: parsedDataMaps[1],
      },
    });
  } else {
    return res.sendStatus(500);
  }
});

app.post("/api-form", function (req, res) {
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
    let str = [
      'Content-Type: text/html; charset="UTF-8"\n',
      "MIME-Version: 1.0\n",
      "Content-Transfer-Encoding: 7bit\n",
      "to: ",
      parsedDataContent.data[5][1],
      "\n",
      "subject: ",
      "Candid Question",
      "\n\n",
      "<html>" +
      "<h1>Candid Question</h1>" +
      "<b>Name: </b>" + req.body.name + "<br><br>" +
      "<b>Email Address: </b>" + req.body.email + "<br><br>" +
      "<b>Phone #: </b>" + req.body.phone + "<br><br>" +
      "<b>Select Type: </b>" + req.body.selectedOption.value + "<br><br>" +
      "<b>Text: </b>" + req.body.text +
      "</html>",
    ].join("");
    gmail.users.messages.send(
      {
        userId: "me",
        resource: {
          raw: Buffer.from(str).toString("base64").replace(/\+/g, "-").replace(/\//g, "_"),
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

app.get("/api-blog", async function (req, res) {
  let doc = await mod.find({}).sort({ date: -1 }).exec();
  if (buttons !== undefined) {
    return res.json({ doc: doc, buttons: [buttons[0], buttons[6], buttons[7], buttons[8]] });
  } else {
    return res.sendStatus(500);
  }
});

app.post("/api-formAdd", async function (req, res) {
  if (req.body.passAdd === "blogs") {
    let newdate = new Date();
    let date = moment(newdate).format("MMM Do YY' HH:mm:ss");
    let id = new mongoose.Types.ObjectId();
    let ext = req.body.file.split(';')[0].split('/')[1];
    let blog = new mod({
      _id: id,
      date: date,
      blog: req.body.blog,
      name: req.body.name,
      title: req.body.title,
      loc: "/pic/" + id + "." + ext,
    });
    fs.writeFileSync(
      __dirname + "/public/pic/" + id + "." + ext,
      Buffer.from(req.body.file.split(';base64,').pop(), "base64")
    );
    await blog.save();
    return res.json(await mod.find().sort({ date: -1 }));
    
  } else {
    return res.json({ e: "Incorrect password" });
  }
});

app.post("/api-formRemove", async function (req, res) {
  if (req.body.passRemove === "blogs") {
    let doc = await mod.find({ date: req.body.date });
    if (doc.length) {
      fs.unlinkSync(__dirname + "/public" + doc[0].loc);
      await mod.deleteOne({ date: req.body.date });
      return res.json(await mod.find().sort({ date: -1 }));
    } else {
      return res.json({ e: "Incorrect date" });
    }
  } else {
    return res.json({ e: "Incorrect password" });
  }
});

app.get("/reset", function (req, res) {
  res.json({ content: "reloaded" });
  video();
  gallery();
  content();
  maps();
});
