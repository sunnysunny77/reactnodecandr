import React, { Component } from "react";
import Slider from "react-slick";
import "./Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import InfoIcon from "@material-ui/icons/Info";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import FilterListIcon from "@material-ui/icons/FilterList";
import BuildIcon from "@material-ui/icons/Build";
import Alertm from "./Alertm.js";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PhoneIcon from "@material-ui/icons/Phone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import SubjectIcon from "@material-ui/icons/Subject";
import ListIcon from "@material-ui/icons/List";
import Select from "react-select";

const options = [
  { value: "Other", label: "Other" },
  { value: "Aged care facility", label: "Aged care facility" },
  { value: "Strata", label: "Strata" },
  { value: "Child care", label: "Child care" },
  { value: "Council", label: "Council" },
  { value: "Government", label: "Government" },
  { value: "Health care", label: "Health care" },
  { value: "Hospitality", label: "Hospitality" },
  { value: "Office", label: "Office" },
  { value: "Residential", label: "Residential" },
  { value: "Retial", label: "Retial" },
  { value: "School", label: "School" },
  { value: "Sports", label: "Sports" },
  { value: "Vacate and Rental", label: "Vacate and Rental" },
];

const customStyles = {
  placeholder: () => ({
    opacity: 0.5,
    marginLeft: "10px",
    marginTop: "10px",
  }),
  menu: () => ({
    backgroundColor: "white",
    textAlign: "center",
    color: "black",
  }),
  option: () => ({
    fontFamily: "Roboto ,Helvetica , Arial , sans-serif ",
    fontWeight: 400,
    cursor: "pointer",
  }),
  singleValue: () => ({
    color: "black",
    marginLeft: "10px",
  }),
  control: () => ({
    backgroundColor: "white",
    width: "210px",
    color: "black",
    height: "80px",
    fontFamily: "Roboto ,Helvetica , Arial , sans-serif ",
    fontWeight: 400,
    marginLeft: "2%",
    borderTopRightRadius: 5,
  }),
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        dots: false,
        infinite: true,
        autoplaySpeed: 15000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        speed: 0,
        pauseOnHover: false,
      },
      w: window.scrollTo(0, 0),
      disp: { display: "none" },
      name: null,
      email: null,
      phone: null,
      selectedOption: null,
      text: null,
      a: null,
      dis: { display: "inline-block" },
      diss: { display: "none" },
      count: 1,
    };
  }
  componentDidMount() {
    this.interval = setInterval(this.myTimer, 15000);
    if (window.location.search === "?in=in") {
      document.getElementById("a1").scrollIntoView();
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  myTimer = () => {
    if (this.state.count < 2) {
      this.setState({ count: this.state.count + 1 });
    } else if (this.state.count === 2) {
      this.setState({ count: 1 });
    }
    if (this.state.count === 1) {
      this.setState({
        dis: { display: "inline-block" },
        diss: { display: "none" },
      });
    }
    if (this.state.count === 2) {
      this.setState({
        dis: { display: "none" },
        diss: { display: "inline-block" },
      });
    }
    document.querySelector(".vid").classList.add("flip");
    setTimeout(() => {
      document.querySelector(".vid").classList.remove("flip");
    }, 1000);
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption, disp: { display: "none" } });
  };
  change = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val, disp: { display: "none" } });
  };
  subic = (event) => {
    event.preventDefault();
    if (
      this.state.name &&
      this.state.email &&
      this.state.phone &&
      this.state.selectedOption &&
      this.state.text
    ) {
      this.setState({
        a: "Waiting...",
        disp: { display: "block", lineHeight: "75px" },
      });
      axios
        .post(`https://candidcleaning.sunnyhome.site/three`, {
          name: this.state.name,
          email: this.state.email,
          phone: this.state.phone,
          selectedOption: this.state.selectedOption,
          text: this.state.text,
        })
        .then((res) => {
          if (res.data.e) {
            this.setState({
              a: res.data.e,
              disp: { display: "block", lineHeight: "75px" },
            });
          }
          if (res.data.a) {
            this.setState({
              a: res.data.a,
              disp: { display: "block", lineHeight: "75px" },
              name: null,
              email: null,
              phone: null,
              selectedOption: null,
              text: null,
            });
            document.getElementById("a1").reset();
          }
        })
        .catch((error) => {
          this.setState({
            a: error.response.statusText,
            disp: { display: "block", lineHeight: "75px" },
          });
        });
    } else {
      this.setState({
        a: "Inquiry from incomplete",
        disp: { display: "block", lineHeight: "75px" },
      });
    }
  };
  vid = (v) => {
    if (v === "v1") {
      window.open("https://candidcleaning.sunnyhome.site/vid/v1.mp4");
    }
    if (v === "v2") {
      window.open("https://candidcleaning.sunnyhome.site/vid/v2.mp4");
    }
  };
  vidd = (v) => {
    let f = this.state.count + v;
    if (f > 0 && f < 3) {
      this.setState({ count: f });
      if (f === 1) {
        this.setState({
          dis: { display: "inline-block" },
          diss: { display: "none" },
        });
      }
      if (f === 2) {
        this.setState({
          dis: { display: "none" },
          diss: { display: "inline-block" },
        });
      }
      document.querySelector(".vid").classList.add("flip");
      setTimeout(() => {
        document.querySelector(".vid").classList.remove("flip");
      }, 1000);
    }
  };
  scr = () => {
    document.getElementById("a1").scrollIntoView();
  };
  render() {
    return (
      <React.Fragment>
        {this.state.w}
        <div className="welcome">
          <div id="w1">
            <span id="ws"></span>
            <h2>Welcome</h2>
          </div>
          <div id="w2">
            <h3 onClick={this.scr}>
              Please click here to make an inquiry or scroll below.
            </h3>
          </div>
        </div>
        <Slider {...this.state.settings}>
          <div>
            <img src="./wel1.jpg" alt="wel1"></img>
          </div>
          <div>
            <img src="./wel2.jpg" alt="wel1"></img>
          </div>
        </Slider>
        <div className="vid ">
          <span id="pn1" onClick={() => this.vidd(-1)}>
            &larr;
          </span>

          <span
            className="vt"
            style={this.state.dis}
            onClick={() => this.vid("v1")}
          >
            {" "}
            Video Comming <PlayCircleOutlineIcon className="iv" />
          </span>
          <span className="vid1" style={this.state.dis}></span>

          <span
            className="vt"
            style={this.state.dis}
            onClick={() => this.vid("v2")}
          >
            {" "}
            Video Comming <PlayCircleOutlineIcon className="iv" />
          </span>
          <span className="vid2" style={this.state.dis}></span>

          <span
            className="vt"
            style={this.state.diss}
            onClick={() => this.vid("v1")}
          >
            {" "}
            Video Comming <PlayCircleOutlineIcon className="iv" />
          </span>
          <span className="vid3" style={this.state.diss}></span>

          <span
            className="vt"
            style={this.state.diss}
            onClick={() => this.vid("v2")}
          >
            {" "}
            Video Comming <PlayCircleOutlineIcon className="iv" />
          </span>
          <span className="vid4" style={this.state.diss}></span>

          <span id="pn2" onClick={() => this.vidd(+1)}>
            &rarr;
          </span>
        </div>
        <div className="info">
          <div className="info0">
            <div className="info1"></div>
          </div>
          <div className="info2">
            <hr />
            <InfoIcon id="inf" />
            <h4>Candid Ethos</h4>
            <hr />
            <p>
              <q>
                I created a business where the cleaners do benefit from their
                efforts, financially and personally. As a happy cleaner means a
                happy client.
              </q>
            </p>
            <hr />
          </div>
        </div>
        <div className="card">
          <div className="card1">
            <div className="card2">
              <span>
                Imperative
                <img
                  src="imp.jpg"
                  alt="Smiley face"
                  width="50"
                  height="50"
                ></img>
              </span>
            </div>
            <p>
              To assist in the elimination of toxic chemicals. We focus on
              solutions that are certified and environmentally sound.
            </p>
            <StarBorderIcon className="cardi" />
            <FilterListIcon className="cardff" />
          </div>
          <div className="card1">
            <div className="card2">
              <span>
                Ecology
                <img
                  src="eco.jpg"
                  alt="Smiley face"
                  width="50"
                  height="50"
                ></img>
              </span>
            </div>
            <p>
              No harsh toxic chemicals, fumes or fragrances will be used. As
              chemicals potentialy lower the quality of life.
            </p>
            <WhatshotIcon className="cardi" />
            <FilterListIcon className="cardff" />
          </div>
          <div className="card1">
            <div className="card2">
              <span>
                Experience
                <img
                  src="exp.jpg"
                  alt="Smiley face"
                  width="50"
                  height="50"
                ></img>
              </span>
            </div>
            <p>
              We employ proven and experienced cleaners in metropolitan Perth.
              We also strive to support local businesses.
            </p>
            <BuildIcon className="cardi" />
            <FilterListIcon className="cardff" />
          </div>
          <div className="card1">
            <div className="card2">
              <span>
                GECA
                <img
                  src="geca.jpg"
                  alt="Smiley face"
                  width="50"
                  height="50"
                ></img>
              </span>
            </div>
            <p>
              Good Environmental Choice Australia products are better for the
              environment reducing any impact on human health.
            </p>
            <a target="geca" href="https://geca.eco/">
              URL
            </a>
            <FilterListIcon className="cardf" />
          </div>
          <div className="card1">
            <div className="card2">
              <span>
                NAC
                <img
                  src="nac.jpg"
                  alt="Smiley face"
                  width="50"
                  height="50"
                ></img>
              </span>
            </div>
            <p>
              We utilise National Asthma Council Australia’s Sensitive Choice™
              products. For an allergy conscious solution.
            </p>
            <a target="asthma" href="https://www.nationalasthma.org.au/">
              URL
            </a>
            <FilterListIcon className="cardf" />
          </div>
          <div className="card1">
            <div className="card2">
              <span>
                Enzymes
                <img
                  src="enz.jpg"
                  alt="Smiley face"
                  width="50"
                  height="50"
                ></img>
              </span>
            </div>
            <p>
              Enzyme Wizard products are safe for humans, animals and plant
              life. Developed naturaly and incorporated into water.
            </p>
            <a target="enz" href="https://enzymecleaningsolutions.com.au/">
              URL
            </a>
            <FilterListIcon className="cardf" />
          </div>
        </div>
        <div className="inq">
          <div className="rh">
            <h6>Inquiry</h6>
          </div>
          <br></br>
          <form
            id="a1"
            autoComplete="off"
            style={{
              width: "100%",
              fontFamily: "Lucida Sans Unicode, Lucida Grande, sans-serif",
              color: "white",
            }}
            onSubmit={this.subic}
          >
            <TextField
              className="www"
              InputProps={{
                style: {
                  color: "black",
                  marginLeft: "2%",
                  backgroundColor: "white",
                  borderRadius: 0,
                  fontSize: "120%",
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
            <TextField
              className="www"
              InputProps={{
                style: {
                  color: "black",
                  marginLeft: "2%",
                  backgroundColor: "white",
                  borderRadius: 0,
                  fontSize: "120%",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon />
                  </InputAdornment>
                ),
              }}
              variant="filled"
              type="text"
              name="email"
              placeholder="Email:"
              onChange={this.change}
            />
            <TextField
              className="www"
              InputProps={{
                style: {
                  color: "black",
                  marginLeft: "2%",
                  backgroundColor: "white",
                  borderRadius: 0,
                  fontSize: "120%",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
              variant="filled"
              type="text"
              name="phone"
              placeholder="Phone:"
              onChange={this.change}
            />

            <div style={{ height: "220px", marginTop: "5px" }}>
              <ListIcon style={{ color: "white", marginLeft: "27.5px" }} />
              <Select
                classNamePrefix="react-select"
                maxMenuHeight={100}
                value={this.state.selectedOption}
                onChange={this.handleChange}
                options={options}
                styles={customStyles}
                placeholder="Select type of cleaning:"
              />
            </div>
            <SubjectIcon
              style={{
                color: "white",
                marginLeft: "12.5px",
                marginBottom: "7.5px",
                display: "block",
              }}
            />
            <TextField
              multiline
              className="text"
              rows="20"
              fullWidth={true}
              InputProps={{
                disableUnderline: true,
                style: {
                  color: "black",
                  display: "block",
                  width: "100%",
                  height: "150px",
                  backgroundColor: "white",
                  borderRadius: 0,
                  overflowY: "auto",
                  overflowX: "hidden",
                  fontSize: "120%",
                },
              }}
              variant="filled"
              type="text"
              name="text"
              placeholder="Text:"
              onChange={this.change}
            />
            <Button
              style={{
                color: "white",
                backgroundColor: "black",
                width: "100%",
                height: "60px",
                fontSize: "120%",
                paddingTop: "10px",
                borderRadius: 0,
              }}
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
            <div style={{ height: "75px" }}>
              <div style={this.state.disp}>
                <Alertm alert={this.state.a} />
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
