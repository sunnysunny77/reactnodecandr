import React from "react";
import "./About.css";
import Wave from "./Wave";
import Maps from "./Maps.js";
import axios from "axios";
import Papa from "papaparse";
import ListAltIcon from "@material-ui/icons/ListAlt";

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      w: window.scrollTo(0, 0),
      abc: null,
      cba: null,
    };
  }
  componentDidMount() {
    axios
      .get(
        `https://docs.google.com/spreadsheets/d/e/2PACX-1vSX0Yy5ynVsKaFMU030TAdltTWZQ-tlQFho-na8RKmgIiZpkfyomov9uUVrhr6xQbUTrF3AHGI9olbn/pub?output=csv`
      )
      .then((res) => {
        let parsedData = Papa.parse(res.data);
        let l = parsedData.data[0][1];
        this.setState({ cba: String(parsedData.data[0][0]) });

        let a = [];
        for (let i = 1; i <= l; i++) {
          let g = i * 2;
          a.push({
            [i]: {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [[]],
              },
            },
          });
          for (let x in parsedData.data) {
            if (x >= 1) {
              if (
                parsedData.data[x][g - 2].length &&
                parsedData.data[x][g - 1].length
              ) {
                a[i - 1][i].geometry.coordinates[0].push([
                  parsedData.data[x][g - 2],
                  parsedData.data[x][g - 1],
                ]);
              }
            }
          }
        }
        this.setState({ abc: <Maps data={a} /> });
      })
      .catch((error) => {});
  }
  render() {
    return (
      <React.Fragment>
        {this.state.w}
        <div className="rh">
          <h6>About</h6>
        </div>
        <div className="about0">
          <ListAltIcon id="infe" />
          <h4>Currently Cleaning</h4>
          <p style={{ textAlign: "center" }}>{this.state.cba}</p>
          <hr />
        </div>
        <div>{this.state.abc}</div>
        <div className="about1">
          <ListAltIcon id="infe" />
          <h4>Summary</h4>
          <hr />
          <Wave>
            <div className="p">
              <h5>From The Supervisor</h5>
              <div className="jus">
                <span>
                  My name is Naomi, over the last 14 years whilst I have been
                  working within the cleaning industry, I experienced an
                  increased frustration with how often cleaners were not
                  provided with all the necessary procedures, training and
                  realistic time frames to perform their work satisfactorily.
                  Further exasperation watching greed and intense profit not
                  shared with those doing the hard work, the cleaners!
                  Eventually this vexation forced a realisation that I needed to
                  be an independent business owner/operator to ensure the
                  cleaners and clientele are cared for. I created a business
                  where the cleaners do benefit from their efforts, financially
                  and personally. A happy cleaner means a happy client. Both are
                  very important to me.
                </span>
              </div>
              <br />
              <br />
              <br />

              <div className="jus">
                <img
                  src="breakp.jpg"
                  alt="Smiley face"
                  className="imga"
                ></img>
                <br />
                <br />
                <br />
                <span>So here I am!</span>
                <br />
                <br />
                <span>Welcome to CANDID CLEANING!</span>
                <br />
                <br />
                <button
                  className="cent0"
                  onClick={() => {
                    document.getElementById("rm").style.display = "block";
                  }}
                >
                  read more
                </button>
              </div>

              <div id="rm" className="cent">
                <br />
                <span>
                  Candid Cleaning offers work to proven and experienced cleaners
                  located in many metropolitan areas of Perth and we value the
                  support of local community businesses. We also offer training
                  and guidance to all our new and current cleaners to ensure
                  each premise, and the occupants within, receive respect and
                  consideration whist Candid Cleaning work towards maintaining
                  your office and/or your investment.
                </span>
                <br />
                <br />
                <span>
                  One of our priorities at Candid Cleaning is to assist in the
                  elimination of toxic chemicals used in cleaning products and
                  focus on a cleaning solution that is environmentally sound and
                  certified without any harsh toxic chemicals, fumes or
                  fragrances. The products used are designed to reduce cleaning
                  time and get results where other products have failed.
                </span>
                <br />
                <br />
                <span>
                  At Candid Cleaning our cleaners are genuinely happy, they
                  respect the environment and they will look after your
                  workspace as if it were their own.
                </span>
                <br />
                <br />
                <button
                  className="cent0"
                  onClick={() => {
                    document.getElementById("rm").style.display = "none";
                  }}
                >
                  {" "}
                  close
                </button>
              </div>

              <div>
                <br />
                <hr />
                <br />
                <br />
              </div>
              <span id="pic"></span>
              <h5>Inductions</h5>
              <span id="serv" className="jus">
                Our Cleaners determination is to ensure that the job is done
                safely and properly every time and that hazards are reported to
                the management team so that we can all work towards a safe work
                environment and eliminate risks and hazards in the workplace.
              </span>

              <div id="hi">
                <br />
                <button
                  id="btn"
                  onClick={() => {
                    document.getElementById("rm1").style.display = "block";
                  }}
                >
                  read more
                </button>
              </div>

              <div id="rm1" className="cent">
                <hr />
                <br />
                <h5>Induction Contents</h5>
                <br />
                <span>
                  Background
                  <br></br>
                  Environment Management
                  <br></br>
                  Training
                  <br></br>
                  Do Not
                  <br></br>
                  Do
                  <br></br>
                  Other Information
                  <br></br>
                  Equal Opportunity &amp; Harassment
                  <br></br>
                  Basic equipment
                  <br></br>
                  How to Sheet
                  <br></br>
                  Safety At Work
                  <br></br>
                  Law
                  <br></br>
                  General Duties
                  <br></br>
                  Consultation
                  <br></br>
                  Hazard Management
                  <br></br>
                  Chemicals
                  <br></br>
                  Task Management
                  <br></br>
                  Bins
                  <br></br>
                  Electrical equipment
                  <br></br>
                  Noise, Eyes Damage, infection &amp; Illness
                  <br></br>
                  Needle Stick Injuries &amp; Slips, Trips &amp; Falls
                  <br></br>
                  Working alone
                  <br></br>
                  Manual Handling
                  <br></br>
                  Backpack Vacuum Safety
                  <br></br>
                  Incident/Accident Excuses
                  <br></br>
                  Injury Management
                  <br></br>
                  Incident/Injury Reporting
                  <br></br>
                  Evacuation Procedures
                  <br></br>
                  Fire Emergencies
                  <br></br>
                  Equipment &amp; Machinery Checklist
                  <br></br>
                  Vacuum Maintenance
                  <br></br>
                  Work Right
                  <br></br>
                  Operate Right
                  <br></br>
                  Troubleshooting
                  <br></br>
                </span>
                <br />
                <br />
                <button
                  className="cent0"
                  onClick={() => {
                    document.getElementById("rm1").style.display = "none";
                  }}
                >
                  {" "}
                  close
                </button>
                <br />
              </div>
            </div>
          </Wave>
        </div>
      </React.Fragment>
    );
  }
}
