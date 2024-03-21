import React from "react";
import "./Blog.scss";
import styles from "./Blog.module.scss";
import Alertm from "./Alertm.js";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SubjectIcon from "@mui/icons-material/Subject";
import TitleIcon from "@mui/icons-material/Title";
import Button from "@mui/material/Button";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import parse from 'html-react-parser';

const StyledAccordion =styled(Accordion)({
  margin: 0, 
  backgroundColor: styles.c3,
});

export default class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogers: null,
      title: null,
      datalert: null,
      file: null,
      name: null,
      passw: "",
      passw0: "",
      ddate: null,
      disp0: { display: "none" },
      disp1: { display: "none" },
      alert: null,
      alert0: null,
      window: window.scrollTo(0, 0),
      buttons: [],
      load: true,
      extension: null,
      table: null,
    };
    this.props.footer("loading");
  }
  componentDidMount() {
    axios.get(`/ong`).then((res) => {
      this.mapTable(this.props.table || res.data.doc);
      this.setState({
        buttons: res.data.buttons,
        load: false,
      });
      this.props.footer("load");
    })
    .catch((error) => {
      alert(error);
    });
  };
  mapTable = (res) => {
    this.props.setTable(res);
    res ? this.setState({ table: res.map((key, index) => {
      const { _id, blogers, date, name, title, loc } = key;
      return (
        <React.Fragment key={_id}>
          <tr>
            <td>{title}</td>
          </tr>
          <tr>
            <td>
              <img
                src="https://candid.s3-ap-southeast-2.amazonaws.com/ikon.jpg"
                alt="icon"
                width="10"
                height="10"
              />
              {"" + date}
            </td>
          </tr>
          <tr>
            <td>
              <img
                alt={title}
                src={"https://" + window.location.hostname + loc}
              />
            </td>
          </tr>
          <tr>
            <td>{name}:</td>
          </tr>
          <tr className="center">
            <td>{blogers}</td>
          </tr>
          <tr>
            <td><hr/></td>
          </tr>
        </React.Fragment>
      )})}) : this.setState({ table:  
        <tr style={{ height: "35vh" }}>
          <th> No posts yet </th>
        </tr>
      })
    ;
  };
  change = (event) => {
    const nam = event.target.name;
    const val = event.target.value;
    this.setState({
      [nam]: val,
      disp0: { display: "none" },
      disp1: { display: "none" },
    });
  };
  file = (event) => {
    let extension = event.target.value.split(".").pop();
    const types = ["jpg", "JPG", "png", "PNG", "jpeg", "JPEG"];
    if (types.includes(extension)) return Resizer.imageFileResizer(
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
      alert: "choose || jpg || png",
      disp0: { display: "block", lineHeight: "50px" },
      extension: extension,
    });
  };
  submit = (event) => {
    event.preventDefault();
    const types = ["jpg", "JPG", "png", "PNG", "jpeg", "JPEG"];
    if (!types.includes(this.state.extension)) return this.setState({
      alert: "choose || jpg || png",
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
        alert: res.data.e,
        disp0: { display: "block", lineHeight: "50px" },
      });
      this.mapTable(res.data);
      this.setState({
        alert: "Blog sent",
        disp0: { display: "block", lineHeight: "50px" },
        passw: null,
        blogers: null,
        name: null,
        title: null,
        file: null,
      });
      document.getElementById("a6").reset();
    })
    .catch((error) => {
      this.setState({
        alert: error.response.statusText,
        disp0: { display: "block", lineHeight: "50px" },
      });
    });
    this.setState({
      alert: "Blog from incomplete",
      disp0: { display: "block", lineHeight: "50px" },
    });
  };
  submitTwo = (event) => {
    event.preventDefault();
    axios.post(`/two`, {
      passw0: this.state.passw0,
      ddate: this.state.ddate,
    })
    .then((res) => {
      if (res.data.e) return this.setState({
        alert0: res.data.e,
        disp1: { display: "block", lineHeight: "50px" },
      });
      this.mapTable(res.data);
      this.setState({
        alert0: "Blog delete",
        disp1: { display: "block", lineHeight: "50px" },
        passw0: null,
        ddate: null,
      });
      document.getElementById("a2").reset();
    })
    .catch((error) => {
      this.setState({
        alert0: error.response.statusText,
        disp1: { display: "block", lineHeight: "50px" },
      });
    });
  };
  render() {
    return (
      <React.Fragment>
        {this.state.load ? (
          <img
            id="load"
            src="https://candid.s3-ap-southeast-2.amazonaws.com/load.gif"
            alt="loading"
          />
        ) : (
          <React.Fragment>
            {this.state.window}
            <div className="headingCont blogHeading">
                <h1>{parse(this.state.buttons[0])}</h1>
            </div>
            <section className="blogCont">
              <div className="blogResponse">
              <div className="sticky"></div>
              <table>
                <tbody>
                  {this.state.table}
                 </tbody>
              </table>
              </div>
              <div style={{ backgroundColor: styles.c3 }}>
                <StyledAccordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: styles.c11 }} />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <div className="accordianHeading headingCont">
                      <h2>{parse(this.state.buttons[1])}</h2>
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
                        fontFamily: styles.font3,
                        color: styles.c11,
                      }}
                    >
                      <SubjectIcon />
                      <label htmlFor="passs" className="hiddenText">
                        Password
                      </label>
                      <TextField
                        id="passs"
                        autoComplete="true"
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            color: styles.c3,
                            fontSize: "inherit",
                            fontWeight: "500",
                            borderRadius: 0,
                            backgroundColor: styles.c11,
                            fontFamily: styles.font3,
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
                      <label htmlFor="title" className="hiddenText">
                        Title
                      </label>
                      <TextField
                        id="title"
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            color: styles.c3,
                            fontSize: "inherit",
                            fontWeight: "500",
                            borderRadius: 0,
                            backgroundColor: styles.c11,
                            fontFamily: styles.font3,
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
                      <label htmlFor="name" className="hiddenText">
                        Name
                      </label>
                      <TextField
                        id="name"
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            color: styles.c3,
                            fontSize: "inherit",
                            fontWeight: "500",
                            borderRadius: 0,
                            backgroundColor: styles.c11,
                            fontFamily: styles.font3,
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
                      <label htmlFor="text" className="hiddenText">
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
                            fontFamily: styles.font3,
                            color: styles.c3,
                            fontSize: "inherit",
                            fontWeight: "500",
                            height: "135px",
                            backgroundColor: styles.c11,
                            overflowY: "auto",
                            overflowX: "hidden",
                            borderRadius: 0,
                            display: "block",
                          },
                        }}
                        variant="filled"
                        type="text"
                        name="blogers"
                        placeholder="Text:"
                        onChange={this.change}
                      />
                      <label htmlFor="avatar">Upload a picture:</label>
                      <input
                        id="avatar"
                        type="file"
                        name="file"
                        onChange={this.file}
                      />
                      <Button
                        style={{
                          color: styles.c11,
                          backgroundColor: styles.c3,
                          width: "100%",
                          height: "50px",
                          fontSize: "inherit",
                          fontWeight: "400",
                          paddingTop: "10px",
                          marginTop: "25px",
                          borderRadius: 0,
                        }}
                        variant="contained"
                        type="submit"
                        className="button"
                      >
                        {parse(this.state.buttons[3])}
                      </Button>
                      <div style={{ height: "50px" }}>
                        <div style={this.state.disp0}>
                          <Alertm alert={this.state.alert} />
                        </div>
                      </div>
                    </form>
                  </AccordionDetails>
                </StyledAccordion>
                <StyledAccordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: styles.c11 }} />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <div className="accordianHeading headingCont">
                      <h2>{parse(this.state.buttons[2])}</h2>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <form
                      id="a2"
                      className="formRemove"
                      onSubmit={this.submitTwo}
                      autoComplete="off"
                      style={{
                        width: "100%",
                        fontFamily: styles.font3,
                        color: styles.c11,
                      }}
                    >
                      <label htmlFor="pass" className="hiddenText">
                        Password
                      </label>
                      <TextField
                        id="pass"
                        autoComplete="true"
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            color: styles.c3,
                            fontSize: "inherit",
                            fontWeight: "500",
                            borderRadius: 0,
                            backgroundColor: styles.c11,
                            fontFamily: styles.font3,
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
                      <label htmlFor="date" className="hiddenText">
                        Date
                      </label>
                      <TextField
                        id="date"
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            color: styles.c3,
                            fontSize: "inherit",
                            fontWeight: "500",
                            borderRadius: 0,
                            backgroundColor: styles.c11,
                            fontFamily: styles.font3,
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
                          color: styles.c11,
                          backgroundColor: styles.c3,
                          width: "100%",
                          height: "50px",
                          fontSize: "inherit",
                          fontWeight: "400",
                          paddingTop: "10px",
                          borderRadius: 0,
                        }}
                        variant="contained"
                        className="button"
                        type="submit"
                      >
                        {parse(this.state.buttons[3])}
                      </Button>
                      <div style={{ height: "50px" }}>
                        <div style={this.state.disp1}>
                          <Alertm alert={this.state.alert0} />
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
