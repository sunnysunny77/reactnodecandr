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
      extension: null,
    };
  }
  componentDidMount() {
    if (this.state.load) this.props.setLoad("none");
    axios.get(`/ong`).then((res) => {
      this.props.setLoad("block");
      this.setState({
        buttons: res.data.buttons,
        load: false,
      });
      if (!res.data.doc.length) return this.postcount();
      this.tab(res.data.doc);
    })
      .catch((error) => {
        alert(error);
      });
  }
  postcount = () => {
    this.setState({
      txt: (
        <table>
          <tr style={{ height: "35vh" }}>
            <th> No posts yet </th>
          </tr>
        </table>
      ),
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
    if (extension === "jpg" || extension === "png") return Resizer.imageFileResizer(
      event.target.files[0],
      150,
      150,
      extension,
      50,
      0,
      (uri) => {
        this.setState({ file: uri, extension: extension, disp0: { display: "none" } });
      },
      "base64"
    );
    this.setState({
      a: "choose || jpg || png",
      disp0: { display: "block", lineHeight: "50px"},
      extension: extension,
    });
  };
  submit = (event) => {
    event.preventDefault();
    const types = ["jpg", "png"];
    if (!types.includes(this.state.extension)) return this.setState({
      a: "choose || jpg || png",
      disp0: { display: "block", lineHeight: "50px" },
    });
    if (this.state.passw && this.state.blogers && this.state.name && this.state.title && this.state.file) return axios.post(`/one`, {
      passw: this.state.passw,
      blogers: this.state.blogers,
      name: this.state.name,
      title: this.state.title,
      file: this.state.file,
    })
    .then((res) => {
      if (res.data.e) return this.setState({
        a: res.data.e,
        disp0: { display: "block", lineHeight: "50px" },
      });
      this.setState({
        a: "Blog sent",
        disp0: { display: "block", lineHeight: "50px" },
        passw: null,
        blogers: null,
        name: null,
        title: null,
        file: null,
      });
      document.getElementById("a6").reset();
      this.tab(res.data);
    })
    .catch((error) => {
      this.setState({
        a: error.response.statusText,
        disp0: { display: "block", lineHeight: "50px" },
      });
    });
    this.setState({
      a: "Blog from incomplete",
      disp0: { display: "block", lineHeight: "50px" },
    });
  };
  submittwo = (event) => {
    event.preventDefault();
    axios.post(`/two`, {
      passw0: this.state.passw0,
      ddate: this.state.ddate,
    })
    .then((res) => {
      if (res.data.e) return this.setState({
        a0: res.data.e,
        disp1: { display: "block", lineHeight: "50px" },
      });
      this.setState({
        a0: "Blog delete",
        disp1: { display: "block", lineHeight: "50px" },
        passw0: null,
        ddate: null,
      });
      document.getElementById("a2").reset();
      if (!res.data.length) return this.postcount();
      this.tab(res.data);
    })
    .catch((error) => {
      this.setState({
        a0: error.response.statusText,
        disp1: { display: "block", lineHeight: "50px" },
      });
    });
  };
  tab = (x) => {
    this.setState({
      txt: x.map((key, index) => {
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
                    alt="icon"
                    width="10"
                    height="10"
                  ></img>{" "}
                  {"" + date}
                </th>
              </tr>
              <tr key={_id + "img"}>
                <td>
                  <img
                    alt={title}
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
              <div className="blogHeading">
                <h1>{ReactHtmlParser(this.state.buttons[0])}</h1>
              </div>
              <div className="blogResponse">
                <br></br>
                <br></br>
                {this.state.txt}
              </div>
              <div style={{ backgroundColor: styles.bl }}>
                <StyledAccordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: styles.wi }} />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <div className="accordianHeading">
                      <h2>{ReactHtmlParser(this.state.buttons[1])}</h2>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <form
                      id="a6"
                      className="formAdd"
                      onSubmit={this.submit}
                      autoComplete="off"
                      style={{
                        width: "100%",
                        fontFamily: styles.f3,
                        color: styles.wi,
                      }}
                    >
                      <label htmlFor="passs" className="hiddentext">
                        Password
                      </label>
                      <SubjectIcon />
                      <TextField
                        id="passs"
                        autoComplete="true"
                        className="MuiFormControl-root-com"
                        InputProps={{
                          style: {
                            color: styles.bl,
                            fontSize: "inherit",
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
                      <label htmlFor="title" className="hiddentext">
                        Title
                      </label>
                      <TextField
                        id="title"
                        className="MuiFormControl-root-com"
                        InputProps={{
                          style: {
                            color: styles.bl,
                            fontSize: "inherit",
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
                      <label htmlFor="name" className="hiddentext">
                        Name
                      </label>
                      <TextField
                        id="name"
                        className="MuiFormControl-root-com"
                        InputProps={{
                          style: {
                            color: styles.bl,
                            fontSize: "inherit",
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
                      <label htmlFor="text" className="hiddentext">
                        Text
                      </label>
                      <TextField
                        id="text"
                        multiline
                        minRows="20"
                        fullWidth={true}
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            color: styles.bl,
                            fontSize: "inherit",
                            fontWeight: "500",
                            display: "block",
                            width: "100%",
                            height: "135px",
                            backgroundColor: styles.wi,
                            overflowY: "auto",
                            overflowX: "hidden",
                            paddingTop: "10px",
                            marginTop: "10px",
                            borderRadius: 0,
                          },
                        }}
                        variant="filled"
                        type="text"
                        name="blogers"
                        placeholder="Text:"
                        onChange={this.change}
                      />
                      <div style={{ textAlign: "center", marginTop: "10px" }}>
                        <label htmlFor="avatar">Upload a picture:</label>
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
                          height: "50px",
                          fontSize: "inherit",
                          fontWeight: "400",
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
                      <div style={{ height: "50px" }}>
                        <div style={this.state.disp0}>
                          <Alertm alert={this.state.a} />
                        </div>
                      </div>
                    </form>
                  </AccordionDetails>
                </StyledAccordion>
                <StyledAccordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: styles.wi }} />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <div className="accordianHeading">
                      <h2>{ReactHtmlParser(this.state.buttons[2])}</h2>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <form
                      id="a2"
                      className="formRemove"
                      onSubmit={this.submittwo}
                      autoComplete="off"
                      style={{
                        width: "100%",
                        fontFamily: styles.f3,
                        color: styles.wi,
                      }}
                    >
                      <label htmlFor="pass" className="hiddentext">
                        Password
                      </label>
                      <TextField
                        id="pass"
                        autoComplete="true"
                        className="MuiFormControl-root-com"
                        InputProps={{
                          style: {
                            color: styles.bl,
                            fontSize: "inherit",
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
                      <label htmlFor="date" className="hiddentext">
                        Date
                      </label>
                      <TextField
                        id="date"
                        className="MuiFormControl-root-com"
                        InputProps={{
                          style: {
                            color: styles.bl,
                            fontSize: "inherit",
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
                          height: "50px",
                          fontSize: "inherit",
                          fontWeight: "400",
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
                      <div style={{ height: "50px" }}>
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
