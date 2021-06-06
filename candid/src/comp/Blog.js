import React from "react";
import "./Blog.scss";
import styles from "./Blog.module.scss";
import Alertm from "./Alertm.js";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SubjectIcon from "@material-ui/icons/Subject";
import TitleIcon from "@material-ui/icons/Title";
import Button from "@material-ui/core/Button";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { withStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import ReactHtmlParser from "react-html-parser";

const StyledAccordion = withStyles(() => ({
  root: {
    margin: 0,
    backgroundColor: styles.bl,
  },
}))(Accordion);

export default class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogers: null,
      title: null,
      txt: null,
      data: null,
      file: null,
      name: null,
      passw: "",
      passw0: "",
      ddate: null,
      disp0: { display: "none" },
      disp1: { display: "none" },
      a: null,
      a0: null,
      w: window.scrollTo(0, 0),
      buttons: [],
      load: true,
    };
  }
  componentDidMount() {
    axios
      .get(`https://candidcleaning.sunnyhome.site/ong`)
      .then((res) => {
        this.setState({
          buttons: res.data.buttons,
        });
        return this.tab(res.data.doc);
      })
      .then(() => {
        this.setState({ load: false });
        this.props.setLoad("block");
      })
      .catch((error) => {
        this.setState({
          a: error.response.statusText,
          a0: error.response.statusText,
          disp0: { display: "block", lineHeight: "75px" },
          disp1: { display: "block", lineHeight: "75px" },
        });
      });
  }
  change = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({
      [nam]: val,
      disp0: { display: "none" },
      disp1: { display: "none" },
    });
  };
  file = (event) => {
    let extension = event.target.value.split(".").pop();
    if (
      extension === "jpg" ||
      extension === "png" ||
      extension === "jpeg" ||
      extension === "JPEG" ||
      extension === "PNG"
    ) {
      Resizer.imageFileResizer(
        event.target.files[0],
        150,
        150,
        "JPEG",
        50,
        0,
        (uri) => {
          this.setState({ file: uri, disp0: { display: "none" } });
        },
        "base64"
      );
    } else {
      this.setState({
        a: "choose || jpg || png",
        disp0: { display: "block", lineHeight: "75px" },
      });
    }
  };
  sub = (event) => {
    event.preventDefault();
    if (
      this.state.passw &&
      this.state.blogers &&
      this.state.name &&
      this.state.title &&
      this.state.file
    ) {
      axios
        .post(`https://candidcleaning.sunnyhome.site/one`, {
          passw: this.state.passw,
          blogers: this.state.blogers,
          name: this.state.name,
          title: this.state.title,
          file: this.state.file,
        })
        .then((res) => {
          if (res.data.e) {
            this.setState({
              a: res.data.e,
              disp0: { display: "block", lineHeight: "75px" },
            });
          } else {
            this.setState({
              a: "Blog sent",
              disp0: { display: "block", lineHeight: "75px" },
              passw: null,
              blogers: null,
              name: null,
              title: null,
              file: null,
            });
            document.getElementById("a6").reset();
            return this.tab(res.data);
          }
        })
        .catch((error) => {
          this.setState({
            a: error.response.statusText,
            disp0: { display: "block", lineHeight: "75px" },
          });
        });
    } else {
      this.setState({
        a: "Blog from incomplete",
        disp0: { display: "block", lineHeight: "75px" },
      });
    }
  };
  sub0 = (event) => {
    event.preventDefault();
    axios
      .post(`https://candidcleaning.sunnyhome.site/two`, {
        passw0: this.state.passw0,
        ddate: this.state.ddate,
      })
      .then((res) => {
        if (res.data.e) {
          this.setState({
            a0: res.data.e,
            disp1: { display: "block", lineHeight: "75px" },
          });
        } else {
          this.setState({
            a0: "Blog delete",
            disp1: { display: "block", lineHeight: "75px" },
            passw0: null,
            ddate: null,
          });
          document.getElementById("a2").reset();
          return this.tab(res.data);
        }
      })
      .catch((error) => {
        console.log(error.response.statusText);
        this.setState({
          a0: error.response.statusText,
          disp1: { display: "block", lineHeight: "75px" },
        });
      });
  };
  tab = (res) => {
    this.setState({
      txt: res.map((key, index) => {
        const { _id, blogers, date, name, title, loc } = key;
        return (
          <table key={_id}>
            <tbody key={_id + "0"}>
              <tr key={_id + "1"}>
                <th>{title}</th>
              </tr>
              <tr key={_id + "2"}>
                <th style={{ color: "rgba(147,112,219, 0.9)" }}>
                  <img
                    src="https://candid.s3-ap-southeast-2.amazonaws.com/ikon.jpg"
                    alt="Smiley face"
                    width="10"
                    height="10"
                  ></img>{" "}
                  {"" + date}
                </th>
              </tr>
              <tr key={_id + "img"}>
                <td>
                  <img
                    alt="Smiley face"
                    src={"https://" + window.location.hostname + loc}
                  />
                </td>
              </tr>
              <tr key={_id + "3"}>
                <td>{name}:</td>
              </tr>
              <tr key={_id + "4"}>
                <td>{blogers}</td>
              </tr>
              <tr key={_id + "5"}>
                <td>
                  <br></br>
                </td>
              </tr>
              <tr key={_id + "6"}>
                <td>
                  <hr></hr>
                </td>
              </tr>
            </tbody>
          </table>
        );
      }),
    });
  };
  render() {
    return (
      <React.Fragment>
        {this.state.load ? (
           <React.Fragment> 
           {this.props.setLoad("none")}
           <img
             className="load"
             src="https://candid.s3-ap-southeast-2.amazonaws.com/load.gif"
             alt="loading"
           />
           </React.Fragment> 
        ) : (
          <React.Fragment>
            {this.state.w}
            <section className="blogCont">
              <div className="blogBar">
                <h1>{ReactHtmlParser(this.state.buttons[0])}</h1>
              </div>
              <div className="blogCont1">
                <br></br>
                <br></br>
                {this.state.txt}
              </div>
              <div style={{ backgroundColor: styles.bl }}>
                <StyledAccordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon className="blogs" />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <div className="blogh">
                      <h2>{ReactHtmlParser(this.state.buttons[1])}</h2>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <form
                      id="a6"
                      className="form"
                      onSubmit={this.sub}
                      autoComplete="off"
                      style={{
                        width: "100%",
                        fontFamily: styles.f3,
                        color: styles.wi,
                      }}
                    >
                      <label for="passs" className="hiddentext">
                        Password
                      </label>
                      <SubjectIcon className="blogsi" />
                      <TextField
                        id="passs"
                        className="float"
                        InputProps={{
                          style: {
                            color: styles.bl,
                            fontSize: "120%",
                            fontWeight: "500",
                            borderRadius: 0,
                            backgroundColor: styles.wi,
                          },
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockOpenIcon />
                            </InputAdornment>
                          ),
                        }}
                        variant="filled"
                        type="password"
                        name="passw"
                        placeholder="Pass:"
                        onChange={this.change}
                      />
                      <label for="title" className="hiddentext">
                        Title
                      </label>
                      <TextField
                        id="title"
                        className="float"
                        InputProps={{
                          style: {
                            color: styles.bl,
                            fontSize: "120%",
                            fontWeight: "500",
                            borderRadius: 0,
                            backgroundColor: styles.wi,
                          },
                          startAdornment: (
                            <InputAdornment position="start">
                              <TitleIcon />
                            </InputAdornment>
                          ),
                        }}
                        variant="filled"
                        type="text"
                        name="title"
                        placeholder="Title:"
                        onChange={this.change}
                      />
                      <label for="name" className="hiddentext">
                        Name
                      </label>
                      <TextField
                        id="name"
                        className="float"
                        InputProps={{
                          style: {
                            color: styles.bl,
                            fontSize: "120%",
                            fontWeight: "500",
                            borderRadius: 0,
                            backgroundColor: styles.wi,
                          },
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircle />
                            </InputAdornment>
                          ),
                        }}
                        variant="filled"
                        type="text"
                        name="name"
                        placeholder="Name:"
                        onChange={this.change}
                      />
                      <label for="text" className="hiddentext">
                        Text
                      </label>
                      <TextField
                        id="text"
                        multiline
                        rows="20"
                        fullWidth={true}
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            color: styles.bl,
                            fontSize: "120%",
                            fontWeight: "500",
                            display: "block",
                            width: "100%",
                            height: "135px",
                            backgroundColor: styles.wi,
                            overflowY: "auto",
                            overflowX: "hidden",
                            paddingTop: "10px",
                            marginTop: "50px",
                            borderRadius: 0,
                          },
                        }}
                        variant="filled"
                        type="text"
                        name="blogers"
                        placeholder="Text:"
                        onChange={this.change}
                      />
                      <div style={{ textAlign: "center", marginTop: "50px" }}>
                        <label for="avatar">Upload a picture:</label>
                        <br></br>
                        <input
                          id="avatar"
                          className="custom-file-input"
                          type="file"
                          name="file"
                          onChange={this.file}
                        />
                      </div>
                      <Button
                        style={{
                          color: styles.wi,
                          backgroundColor: styles.bl,
                          width: "100%",
                          height: "60px",
                          fontSize: "120%",
                          fontWeight: "600",
                          paddingTop: "10px",
                          marginTop: "10px",
                          borderRadius: 0,
                        }}
                        variant="contained"
                        type="submit"
                      >
                        {" "}
                        {ReactHtmlParser(this.state.buttons[3])}
                      </Button>
                      <div style={{ height: "75px" }}>
                        <div style={this.state.disp0}>
                          <Alertm alert={this.state.a} />
                        </div>
                      </div>
                    </form>
                  </AccordionDetails>
                </StyledAccordion>
                <StyledAccordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon className="blogs" />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <div className="blogh">
                      <h2>{ReactHtmlParser(this.state.buttons[2])}</h2>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <form
                      id="a2"
                      className="form0"
                      onSubmit={this.sub0}
                      autoComplete="off"
                      style={{
                        width: "100%",
                        fontFamily: styles.f3,
                        color: styles.wi,
                      }}
                    >
                      <br></br>
                      <label for="pass" className="hiddentext">
                        Password
                      </label>
                      <TextField
                        id="pass"
                        className="float"
                        InputProps={{
                          style: {
                            color: styles.bl,
                            fontSize: "120%",
                            fontWeight: "500",
                            borderRadius: 0,
                            backgroundColor: styles.wi,
                          },
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockOpenIcon />
                            </InputAdornment>
                          ),
                        }}
                        variant="filled"
                        type="password"
                        name="passw0"
                        placeholder="Pass:"
                        onChange={this.change}
                      />
                      <label for="date" className="hiddentext">
                        Date
                      </label>
                      <TextField
                        id="date"
                        className="float"
                        InputProps={{
                          style: {
                            color: styles.bl,
                            fontSize: "120%",
                            fontWeight: "500",
                            borderRadius: 0,
                            backgroundColor: styles.wi,
                          },
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccessTimeIcon />
                            </InputAdornment>
                          ),
                        }}
                        variant="filled"
                        type="text"
                        name="ddate"
                        placeholder="Date:"
                        onChange={this.change}
                      />
                      <Button
                        style={{
                          color: styles.wi,
                          backgroundColor: styles.bl,
                          width: "100%",
                          height: "60px",
                          fontSize: "120%",
                          fontWeight: "600",
                          paddingTop: "10px",
                          marginTop: "10px",
                          borderRadius: 0,
                        }}
                        variant="contained"
                        type="submit"
                      >
                        {" "}
                        {ReactHtmlParser(this.state.buttons[3])}
                      </Button>
                      <div style={{ height: "75px" }}>
                        <div style={this.state.disp1}>
                          <Alertm alert={this.state.a0} />
                        </div>
                      </div>
                    </form>
                  </AccordionDetails>
                </StyledAccordion>
              </div>
            </section>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
