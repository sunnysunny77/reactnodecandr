import React, { Component } from "react";
import Slider from "react-slick";
import Vivus from "vivus";
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
        speed: 1000,
        pauseOnHover: false,
        fade: true,
        beforeChange: this.vidt
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
      intervalId: null,
      emails: null
    };
  }
  componentDidMount() {
    new Vivus("my-svg", { duration: 200 });
    if (window.location.search === "?in=in") {
      document.getElementById("iq").scrollIntoView();
    }
    axios
      .post(`https://candidcleaning.sunnyhome.site/hom`)
      .then((res) => {
        if (res.data.e) {
          this.setState({
            emails: res.data.e.emails,
          });
        }
        if (res.data.a) {
          this.setState({
            emails: res.data.a.emails,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  vidt = () => {
    document.querySelector(".vid").classList.add("flip");
    setTimeout(() => {
      document.querySelector(".vid").classList.remove("flip");
    }, 1000);
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
      return;
    }
    if (this.state.count === 2) {
      this.setState({
        dis: { display: "none" },
        diss: { display: "inline-block" },
      });
      return;
    }
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
          emails: this.state.emails,
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
    document.getElementById("iq").scrollIntoView();
  };
  render() {
    return (
      <React.Fragment>
        {this.state.w}
        <div className="welcome">
          <div id="w1">
            <svg
              id="my-svg"
              enableBackground="new 0 0 512.062 512.062"
              height="25px"
              viewBox="0 0 512.062 512.062"
              width="25px"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="black"
              strokeWidth="8"
            >
              <path d="m104.13 450.102c-4.992 0-6.785-3.619-8.912-7.249-2.231-3.813-.95-8.714 2.862-10.946 3.814-2.232 8.715-.949 10.946 2.862.711 1.215 1.294 2.175 1.836 3.023 3.431 5.367-.503 12.31-6.732 12.31z" />
              <path d="m244.352 512.031h-28.35c-36.659 0-71.323-14.079-97.608-39.646-3.167-3.08-3.237-8.146-.156-11.313 3.079-3.166 8.144-3.238 11.313-.156 23.28 22.644 53.983 35.114 86.452 35.114h28.35c36.296 0 70.421-14.12 96.102-39.765l149.075-157.071c14.089-14.952 3.051-35.163-13.808-35.163-20.788 0-40.335 8.05-55.08 22.675l-43.218 51.177c-12.905 15.346-41.422 6.396-41.422-16.481v-42.53c0-1.639-3.47 11.896 52.692-197.69 4.748-17.737-8.651-35.249-27.063-35.249-11.625 0-23.132 7.266-27.069 20.894l-54.87 191.41c-2.542 8.874-15.69 7.014-15.69-2.204v-212c0-25.033-30.308-37.272-47.808-19.799-5.28 5.288-8.192 12.322-8.192 19.799v205.8c0 9.313-13.322 11.052-15.728 2.07l-47.17-176.06c-1.938-7.222-6.571-13.259-13.049-16.999-18.745-10.819-42.014 2.894-42.014 24.219 0 5.241-3.701-10.14 49.348 187.829 2.41 8.995-10.006 14.123-14.655 6.07l-63.941-110.75c-12.093-20.93-44.791-12.673-44.791 12.04 0 4.178 1.112 8.313 3.218 11.96l44.9 77.771c18.24 31.6 27.882 67.579 27.882 104.05 0 11.963 1.7 23.795 5.054 35.167 1.249 4.238-1.173 8.687-5.411 9.937-4.231 1.253-8.686-1.173-9.937-5.411-3.786-12.842-5.706-26.196-5.706-39.692 0-33.667-8.9-66.881-25.738-96.051l-44.9-77.77c-11.224-19.445-4.115-43.801 14.647-54.638 19.089-11.03 43.603-4.466 54.638 14.636l33.558 58.124-32.652-121.854c-6.35-23.596 7.806-47.658 31.122-53.889 23.472-6.298 47.583 7.618 53.882 31.106l31.443 117.359v-145.026c0-24.142 19.511-44 44-44 24.262 0 44 19.738 44 44v155.061l39.162-136.613c5.169-19.166 22.621-32.547 42.468-32.547 28.987 0 49.958 27.593 42.518 55.388l-52.147 194.604v41.478c0 7.067 8.427 10.594 13.447 5.863 30.107-35.651 43.272-51.264 43.646-51.641 17.794-17.793 41.456-27.593 66.627-27.593 31.553 0 49.063 38.4 25.346 62.248-154.128 162.394-149.092 157.09-149.23 157.23-28.711 28.711-66.885 44.522-107.487 44.522z" />
              <path d="m216.002 463.031c-4.418 0-8-3.582-8-8 0-63.903 47.695-118.445 110.943-126.87 4.394-.576 8.404 2.494 8.986 6.873.584 4.38-2.494 8.403-6.873 8.986-55.331 7.37-97.057 55.095-97.057 111.011.001 4.418-3.581 8-7.999 8z" />
            </svg>
            <h2>Welcome</h2>
          </div>
          <div id="w2">
            <h3 onClick={this.scr}>
              Please click here to make an inquiry or scroll below.
            </h3>
          </div>
        </div>
        <Slider id="slide" {...this.state.settings}>
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
            Video <PlayCircleOutlineIcon className="iv" />
          </span>
          <span className="vid1" style={this.state.dis}></span>
          <span
            className="vt"
            style={this.state.dis}
            onClick={() => this.vid("v2")}
          >
            {" "}
            Video <PlayCircleOutlineIcon className="iv" />
          </span>
          <span className="vid2" style={this.state.dis}></span>
          <span
            className="vt"
            style={this.state.diss}
            onClick={() => this.vid("v1")}
          >
            {" "}
            Video <PlayCircleOutlineIcon className="iv" />
          </span>
          <span className="vid3" style={this.state.diss}></span>
          <span
            className="vt"
            style={this.state.diss}
            onClick={() => this.vid("v2")}
          >
            {" "}
            Video <PlayCircleOutlineIcon className="iv" />
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
            <FilterListIcon className="cardf" />
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
            <FilterListIcon className="cardf" />
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
            <FilterListIcon className="cardf" />
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
        <div id="iq" className="inq">
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
              type="email"
              name="email"
              placeholder="Email:"
              onChange={this.change}
            />
            <TextField
              className="www"
              inputProps={{
                pattern: "[+]*[0-9]{8,14}",
              }}
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
              type="tel"
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
