import React from 'react';
import HomeIcon from "@material-ui/icons/Home";
import "./Footer.scss";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
function Footer(props) {
  return (
    <footer>
      <ul id="ul">
        <li className="bl">
          <Link to="/">
            <HomeIcon />
          </Link>
        </li>
        <li >
          <Link to={"/" + props.buttons[0]}>
            {ReactHtmlParser(props.buttons[0])}
          </Link>
        </li>
        <li >
          <Link to={"/" + props.buttons[1]}>
            {ReactHtmlParser(props.buttons[1])}
          </Link>
        </li>
        <li >
          <Link to={"/" + props.buttons[2]}>
            {ReactHtmlParser(props.buttons[2])}
          </Link>
        </li>
        <li>
          <Link to={"/" + props.buttons[3]}>
            {ReactHtmlParser(props.buttons[3])}
          </Link>
        </li>
        <li className="bl">
          {ReactHtmlParser(props.time)} / {ReactHtmlParser(props.day)}
        </li>
        <li className="bl">
          <a href={"tel:" + props.ph}>{props.ph}</a>
        </li>
      </ul>
      <img
        src="https://candid.s3-ap-southeast-2.amazonaws.com/foot.png"
        alt="Smiley face"
        width="40"
        height="40"
      />
    </footer>
  );
}

export default Footer;
