import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import "./Footer.scss";
import parse from 'html-react-parser';
import { Link } from "react-router-dom";
function Footer(props) {
  let { ph, time, day, buttons } = props;
  return (
    <footer>
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
          <Link to={"/" + buttons[0]}>{parse(buttons[0])}</Link>
        </li>
        <li className="none">
          <Link to={"/" + buttons[1]}>{parse(buttons[1])}</Link>
        </li>
        <li className="none">
          <Link to={"/" + buttons[2]}>{parse(buttons[2])}</Link>
        </li>
        <li className="none">
          <Link to={"/" + buttons[3]}>{parse(buttons[3])}</Link>
        </li>
        <li className="block" id="imh">
          <Link to="/">
            <img
              src="https://candid.s3-ap-southeast-2.amazonaws.com/foot.png"
              alt="Candid Icon"
              width="40"
              height="40"
            />
          </Link>
        </li>
        <li className="block none">
          {parse(time)} / {parse(day)}
        </li>
        <li className="block none">
          <a href={"tel:" + ph}>{ph}</a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
