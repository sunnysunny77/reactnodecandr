import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import "./Footer.scss";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
function Footer(props) {
  let { ph, time, day, buttons, load } = props;
  return (
    <footer style={{ display: load }}>
      <ul>
        <li className="block none">
          <Link to="/">
            <span id="hl3" className="hiddentext">
              Homepage Link
            </span>
            <HomeIcon aria-labelledby="hl3" role="link">
              Home
            </HomeIcon>
          </Link>
        </li>
        <li className="none">
          <Link to={"/" + buttons[0]}>{ReactHtmlParser(buttons[0])}</Link>
        </li>
        <li className="none">
          <Link to={"/" + buttons[1]}>{ReactHtmlParser(buttons[1])}</Link>
        </li>
        <li className="none">
          <Link to={"/" + buttons[2]}>{ReactHtmlParser(buttons[2])}</Link>
        </li>
        <li className="none">
          <Link to={"/" + buttons[3]}>{ReactHtmlParser(buttons[3])}</Link>
        </li>
        <li className="block" id="imh">
          <img
            src="https://candid.s3-ap-southeast-2.amazonaws.com/foot.png"
            alt="Candid Icon"
            width="40"
            height="40"
          />
        </li>
        <li className="block none">
          {ReactHtmlParser(time)} / {ReactHtmlParser(day)}
        </li>
        <li className="block none">
          <a href={"tel:" + ph}>{ph}</a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
