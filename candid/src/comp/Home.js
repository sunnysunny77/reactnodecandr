import React, { Component } from "react";
import Slider from "react-slick";
import Vivus from "vivus";
import "./Home.scss";
import styles from "./Home.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import InfoIcon from "@mui/icons-material/Info";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import FilterListIcon from "@mui/icons-material/FilterList";
import BuildIcon from "@mui/icons-material/Build";
import Alertm from "./Alertm.js";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SubjectIcon from "@mui/icons-material/Subject";
import ListIcon from "@mui/icons-material/List";
import Tooltip from "@mui/material/Tooltip";
import Select from "react-select";
import parse from 'html-react-parser';

const customStyles = {

  menu: (provided, state) => ({
    ...provided,
    borderRadius: "0",
    backgroundColor: styles.c11,
    margin: "25px 25px 0 25px",
    width: "calc(100% - 50px)",
    maxWidth: "261.11px",
  }),
  option: (provided, state) => ({
    color: styles.c13,
    fontSize: "medium",
    margin: "4px 0 10px 0",
    textAlign: "center",
    cursor: "pointer",
  }),
  control: (provided, state) => ({
    ...provided,
    maxWidth: "261.11px",
    backgroundColor: styles.c11,
    borderRadius: "0 5px 0 0",
    border: 0,
    boxShadow: 'none',
    margin: "auto 25px 120px 25px",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
      color: styles.c13,
      "&:hover": {
        color: styles.c2,
      },
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
        speed: 500,
        pauseOnHover: false,
        fade: true,
        beforeChange: this.vidToggle,
      },
      window: window.scrollTo(0, 0),
      disp: { display: "none" },
      name: null,
      email: null,
      phone: null,
      selectedOption: null,
      text: null,
      alert: null,
      res: {},
      video: null,
      overlay: null,
      count: 1,
      svg: null,
      load: true,
    };
    this.props.footer("loading");
  }
  componentDidMount() {
    axios.post('/hom').then((res) => {
      this.setState({
        res: res.data,
        load: false
      });
      this.props.footer("load");
      this.mapVideo(res.data.vid);
    })
    .catch((error) => {
      alert(error);
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.load !== this.state.load) {
      if (window.location.search === "?in=in") this.scrollIntoView();
      new Vivus(document.querySelector("#my-svg").children[0], { duration: 200 });
    }
  }
  scrollIntoView = () => {
    document.getElementById("enquiry").scrollIntoView({behavior: "smooth"});
  }
  mapVideo = (res) => {
    this.setState({ video: res.map((key, index) => {
      const d = index === 0 ?  "flex": "";
      const idOne = "videoOne-" + index + 1;
      const idTwo = "videoTwo-" + index + 1;
      return (
        <React.Fragment key={index}>
          <div className={d + " d" + [index + 1]}>
            <link rel="preload" href={key[0]} as="image" />
            <span
              className="videoLink"
              onClick={() => this.overlay(idOne)}
            >
              {key[2]}
              <PlayCircleOutlineIcon />
            </span>
            <img
              className="videoImg"
              src={key[0]}
              alt={key[2]}
              width="275"
              height="275"
            />
          </div>
          <div className={d + " d" + [index + 1]}>
            <link rel="preload" href={key[3]} as="image" />
            <span
              className="videoLink"
              onClick={() => this.overlay(idTwo)}
            >
              {key[5]}
              <PlayCircleOutlineIcon />
            </span>
            <img
              className="videoImg"
              src={key[3]}
              alt={key[5]}
              width="275"
              height="275"
            />
          </div>
        </React.Fragment>
      )
    }), overlay: res.map((key, index) => {
      const idOne = "videoOne-" + index + 1;
      const idTwo = "videoTwo-" + index + 1;
      return (
        <React.Fragment key={index}>
          <div id={idTwo} className="overlay">  
            <video loop playsInline>
              <source src={key[4]}/>
              Your browser does not support the video tag.
            </video>
            <div className="controlls">
              <button onClick={() => {
                document.body.style.overflow = "auto";
                document.body.style.paddingRight = 0;
                document.getElementById(idTwo).classList.remove("fixed");
                document.getElementById(idTwo).children[0].pause();
                }}> &#10006; </button>
            </div>
          </div>
          <div id={idOne} className="overlay">  
            <video loop playsInline>
              <source src={key[1]}/>\
              Your browser does not support the video tag.
            </video>
            <div className="controlls">
              <button onClick={() => {
                document.body.style.overflow = "auto";
                document.body.style.paddingRight = 0;
                document.getElementById(idOne).classList.remove("fixed");
                document.getElementById(idOne).children[0].pause();
                }}> &#10006; </button>
            </div>
          </div>
        </React.Fragment>
      )
    })})
  }
  overlay = (id) => {
    const overlay = document.getElementById(id); 
    overlay.children[0].load();
    overlay.children[0].play();
    const width = window.innerWidth - document.body.offsetWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${width  }px`;
    overlay.classList.add("fixed");
  };
  vidDisplay = (index) => {
    const count = this.state.count;
    const removeCount = document.getElementsByClassName("d" + count);
    const newCount = this.state.count + index;
    const addNewCount = document.getElementsByClassName("d" + newCount);
    if (newCount > 0 && newCount <= this.state.res.vid.length) {
      [...removeCount].forEach((item) => {
        item.classList.remove("flex");
      });
      [...addNewCount].forEach((item) => {
        item.classList.add("flex");
      });
      this.setState({ count: newCount });
      const video = document.querySelectorAll(".videoImg");
      [...video].forEach((item) => {
        item.classList.add("grey");
        setTimeout(() => {
          item.classList.remove("grey");
        }, 500)
      });
    }
  };
  vidToggle = () => {
    const count = this.state.count;
    const removeCount = document.getElementsByClassName("d" + count);
    if (count < this.state.res.vid.length) {
      [...removeCount].forEach((item) => {
        item.classList.remove("flex");
      });
      const newCount = this.state.count + 1;
      const addNewCount = document.getElementsByClassName("d" + newCount);
      [...addNewCount].forEach((item) => {
        item.classList.add("flex");
      });
      this.setState({ count: newCount  });
    } else {
      [...removeCount].forEach((item) => {
        item.classList.remove("flex");
      });
      const newCount = 1;
      const addNewCount = document.getElementsByClassName("d" + newCount);
      [...addNewCount].forEach((item) => {
        item.classList.add("flex");
        item.classList.add("grey");
        setTimeout(() => {
          item.classList.remove("grey");
        }, 500)
      });
      this.setState({ count: newCount });
    }
    const video = document.querySelectorAll(".videoImg");
    [...video].forEach((item) => {
      item.classList.add("grey");
      setTimeout(() => {
        item.classList.remove("grey");
      }, 500)
    });
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption, disp: { display: "none" } });
  };
  change = (event) => {
    const nam = event.target.name;
    const val = event.target.value;
    this.setState({ [nam]: val, disp: { display: "none" } });
  };
  submit = (event) => {
    event.preventDefault();
    this.setState({
      alert: "Waiting...",
      disp: { display: "block", lineHeight: "50px" },
    });
    if (this.state.name && this.state.email && this.state.phone && this.state.selectedOption && this.state.text) return axios.post('/three', {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      selectedOption: this.state.selectedOption,
      text: this.state.text,
    })
      .then((res) => {
        if (res.data.e) return this.setState({
          alert: res.data.e,
          disp: { display: "block", lineHeight: "50px" },
        });
        this.setState({
          alert: res.data.a,
          disp: { display: "block", lineHeight: "50px" },
          name: null,
          email: null,
          phone: null,
          selectedOption: null,
          text: null,
        });
        document.getElementById("a1").reset();
      })
      .catch((error) => {
        this.setState({
          alert: error.response.statusText,
          disp: { display: "block", lineHeight: "50px" },
        });
      });
    this.setState({
      alert: "Enquiry from incomplete",
      disp: { display: "block", lineHeight: "50px" },
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
            <section className="welcome">
              <h1 id="welcomeOne">
                <div id="my-svg">{parse(this.state.res.svg)}</div>
                &nbsp;
                {parse(this.state.res.m1)}
              </h1>
              <div id="welcomeTwo" onClick={this.scrollIntoView}></div>
            </section>
            <Slider id="slide" {...this.state.settings}>
              <div>
                <picture>
                  <source media="(min-width:1199px)" srcSet="https://candid.s3-ap-southeast-2.amazonaws.com/wel1.jpg"/>
                  <img src="https://candid.s3-ap-southeast-2.amazonaws.com/wel1m.jpg" width="992" height="401" alt="Slider 1"/>
                </picture>    
              </div>
              <div>
                <picture>
                  <source media="(min-width:1199px)" srcSet="https://candid.s3-ap-southeast-2.amazonaws.com/wel2.jpg"/>
                  <img src="https://candid.s3-ap-southeast-2.amazonaws.com/wel2m.jpg" width="992" height="401" alt="Slider 2"/>
                </picture>
              </div>
            </Slider>
            {this.state.overlay}
            <section className="video">
              <svg
                onClick={() => this.vidDisplay(-1)}
                id="left"
                height="25px"
                viewBox="0 0 500 500"
                width="25px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m474.667969 251h-309.335938c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h309.335938c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
                <path d="m250.667969 336.332031c-4.097657 0-8.191407-1.554687-11.308594-4.691406l-85.332031-85.332031c-6.25-6.253906-6.25-16.386719 0-22.636719l85.332031-85.332031c6.25-6.25 16.382813-6.25 22.636719 0 6.25 6.25 6.25 16.382812 0 22.632812l-74.027344 74.027344 74.027344 74.027344c6.25 6.25 6.25 16.382812 0 22.632812-3.136719 3.117188-7.234375 4.671875-11.328125 4.671875zm0 0" />
                <path d="m234.667969 469.667969c-129.386719 0-234.667969-105.28125-234.667969-234.667969s105.28125-234.667969 234.667969-234.667969c97.085937 0 182.804687 58.410157 218.410156 148.824219 3.242187 8.210938-.8125 17.492188-9.023437 20.753906-8.214844 3.203125-17.496094-.789062-20.757813-9.042968-30.742187-78.082032-104.789063-128.535157-188.628906-128.535157-111.746094 0-202.667969 90.925781-202.667969 202.667969s90.921875 202.667969 202.667969 202.667969c83.839843 0 157.886719-50.453125 188.628906-128.511719 3.242187-8.257812 12.523437-12.246094 20.757813-9.046875 8.210937 3.242187 12.265624 12.542969 9.023437 20.757813-35.605469 90.390624-121.324219 148.800781-218.410156 148.800781zm0 0" />
              </svg>
              {this.state.video}
              <svg
                onClick={() => this.vidDisplay(+1)}
                id="right"
                height="25px"
                viewBox="0 0 500 500"
                width="25px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m325.332031 251h-309.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h309.332031c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
                <path d="m240 336.332031c-4.097656 0-8.191406-1.554687-11.308594-4.691406-6.25-6.25-6.25-16.382813 0-22.636719l74.027344-74.023437-74.027344-74.027344c-6.25-6.25-6.25-16.386719 0-22.636719 6.253906-6.25 16.386719-6.25 22.636719 0l85.332031 85.335938c6.25 6.25 6.25 16.382812 0 22.632812l-85.332031 85.332032c-3.136719 3.160156-7.230469 4.714843-11.328125 4.714843zm0 0" />
                <path d="m256 469.667969c-97.089844 0-182.804688-58.410157-218.410156-148.824219-3.242188-8.191406.808594-17.492188 9.023437-20.734375 8.191407-3.199219 17.515625.789063 20.757813 9.046875 30.742187 78.058594 104.789062 128.511719 188.628906 128.511719 111.742188 0 202.667969-90.925781 202.667969-202.667969s-90.925781-202.667969-202.667969-202.667969c-83.839844 0-157.886719 50.453125-188.628906 128.511719-3.265625 8.257812-12.566406 12.246094-20.757813 9.046875-8.214843-3.242187-12.265625-12.542969-9.023437-20.734375 35.605468-90.414062 121.320312-148.824219 218.410156-148.824219 129.386719 0 234.667969 105.28125 234.667969 234.667969s-105.28125 234.667969-234.667969 234.667969zm0 0" />
              </svg>
            </section>
            <section className="info">
              <div className="infoOne"></div>
              <div className="infoTwo">
                <h3>
                  {parse(this.state.res.qh)}
                  <InfoIcon />
                </h3>
                <hr
                  style={{
                    boxShadow: ` 0 5px 5px -5px ${styles.c2}`,
                    border: "7.5px solid transparent",
                  }}
                />
                <p>
                  <q>{parse(this.state.res.q)}</q>
                </p>
                <hr
                  style={{
                    boxShadow: `0 -5px 5px -5px ${styles.c2}`,
                    border: "7.5px solid transparent",
                  }}
                />
              </div>
            </section>
            <section className="card">
              <div className="cardOne">
                <div className="cardTwo">
                  <span>
                    <h3>{parse(this.state.res.ch1)}</h3>
                    <img
                      src="https://candid.s3-ap-southeast-2.amazonaws.com/card1.png"
                      alt={parse(this.state.res.ch1)}
                      width="50"
                      height="50"
                    ></img>
                  </span>
                </div>
                <hr /><p>{parse(this.state.res.c1)}</p>
                <StarBorderIcon />
                <FilterListIcon />
              </div>
              <div className="cardOne">
                <div className="cardTwo">
                  <span>
                    <h3>{parse(this.state.res.ch2)}</h3>
                    <img
                      src="https://candid.s3-ap-southeast-2.amazonaws.com/card2.png"
                      alt={parse(this.state.res.ch2)}
                      width="50"
                      height="50"
                    ></img>
                  </span>
                </div>
                <hr /><p>{parse(this.state.res.c2)}</p>
                <WhatshotIcon />
                <FilterListIcon />
              </div>
              <div className="cardOne">
                <div className="cardTwo">
                  <span>
                    <h3>{parse(this.state.res.ch3)}</h3>
                    <img
                      src="https://candid.s3-ap-southeast-2.amazonaws.com/card3.png"
                      alt={parse(this.state.res.ch3)}
                      width="50"
                      height="50"
                    ></img>
                  </span>
                </div>
                <hr /><p>{parse(this.state.res.c3)}</p>
                <BuildIcon />
                <FilterListIcon />
              </div>
              <div className="cardOne">
                <div className="cardTwo">
                  <span>
                    <h3>{parse(this.state.res.ch4)}</h3>
                    <img
                      src="https://candid.s3-ap-southeast-2.amazonaws.com/card4.png"
                      alt={parse(this.state.res.ch4)}
                      width="50"
                      height="50"
                    ></img>
                  </span>
                </div>
                <hr /><p>{parse(this.state.res.c4)}</p>
                <a target="4" href={this.state.res.u4}>
                  {parse(this.state.res.buttons[0])}
                </a>
                <FilterListIcon />
              </div>
              <div className="cardOne">
                <div className="cardTwo">
                  <span>
                    <h3>{parse(this.state.res.ch5)}</h3>
                    <img
                      src="https://candid.s3-ap-southeast-2.amazonaws.com/card5.png"
                      alt={parse(this.state.res.ch5)}
                      width="50"
                      height="50"
                    ></img>
                  </span>
                </div>
                <hr /><p>{parse(this.state.res.c5)}</p>
                <a target="5" href={this.state.res.u5}>
                  {parse(this.state.res.buttons[0])}
                </a>
                <FilterListIcon />
              </div>
              <div className="cardOne">
                <div className="cardTwo">
                  <span>
                    <h3>{parse(this.state.res.ch6)}</h3>
                    <img
                      src="https://candid.s3-ap-southeast-2.amazonaws.com/card6.png"
                      alt={parse(this.state.res.ch6)}
                      width="50"
                      height="50"
                    ></img>
                  </span>
                </div>
                <hr /><p>{parse(this.state.res.c6)}</p>
                <a target="6" href={this.state.res.u6}>
                  {parse(this.state.res.buttons[0])}
                </a>
                <FilterListIcon />
              </div>
            </section>
            <section id="enquiry" className="enquiry">
              <div className="headingCont">
                <h3>{parse(this.state.res.buttons[1])}</h3>
              </div>
              <br></br>
              <form
                id="a1"
                autoComplete="off"
                onSubmit={this.submit}
                style={{
                  width: "100%",
                  fontFamily: styles.font3,
                  color: styles.c11,
                }}
              >
                <label htmlFor="name" className="hiddenText">
                  Name
                </label>
                <TextField
                  id="name"
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      fontFamily: styles.font3,
                      color: styles.c3,
                      backgroundColor: styles.c11,
                      borderRadius: 0,
                      fontSize: "inherit",
                      fontWeight: "500",
                      margin: "0 25px 25px  25px",
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
                <label htmlFor="email" className="hiddenText">
                  Email
                </label>
                <TextField
                  id="email"
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      fontFamily: styles.font3,
                      color: styles.c3,
                      backgroundColor: styles.c11,
                      borderRadius: 0,
                      fontSize: "inherit",
                      fontWeight: "500",
                      margin: "0 25px 25px  25px",
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
                <label htmlFor="phone" className="hiddenText">
                  Phone
                </label>
                <Tooltip
                  title="Format: +###############"
                  placement="bottom-end"
                >
                  <TextField
                    id="phone"
                    InputProps={{
                      pattern: "[+]?[0-9]{3,15}",
                      disableUnderline: true,
                      style: {
                        fontFamily: styles.font3,
                        color: styles.c3,
                        backgroundColor: styles.c11,
                        borderRadius: 0,
                        fontSize: "inherit",
                        fontWeight: "500",
                        margin: "0 25px 25px 25px",
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
                </Tooltip>
                <div className="selectContainer">
                  <ListIcon
                    style={{ color: styles.c11, marginLeft: "27.5px" }}
                  />
                  <label htmlFor="select" className="hiddenText">
                    {parse(this.state.res.buttons[3])}
                  </label>
                  <Select
                    inputId="select"
                    classNamePrefix="react-select"
                    value={this.state.selectedOption}
                    onChange={this.handleChange}
                    options={this.state.res.options}
                    styles={customStyles}
                    placeholder={parse(this.state.res.buttons[3])}
                    maxMenuHeight={70}
                  />
                </div>
                <SubjectIcon
                  style={{
                    color: styles.c11,
                    marginLeft: "12.5px",
                    marginBottom: "7.5px",
                    display: "block",
                  }}
                />
                <label htmlFor="text" className="hiddenText">
                  Text
                </label>
                <TextField
                  id="text"
                  multiline
                  className="text"
                  minRows="20"
                  fullWidth={true}
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      fontFamily: styles.font3,
                      color: styles.c3,
                      display: "block",
                      width: "100%",
                      height: "150px",
                      backgroundColor: styles.c11,
                      borderRadius: 0,
                      overflowY: "auto",
                      overflowX: "hidden",
                      fontSize: "inherit",
                      fontWeight: "500",
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
                    fontFamily: styles.font3,
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
                  type="submit"
                  className="button"
                >
                  {parse(this.state.res.buttons[2])}
                </Button>
                <div style={{ height: "50px" }}>
                  <div style={this.state.disp}>
                    <Alertm alert={this.state.alert} />
                  </div>
                </div>
              </form>
            </section>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Home;
