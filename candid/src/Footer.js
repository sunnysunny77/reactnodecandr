import React from 'react';
import HomeIcon from "@material-ui/icons/Home";
import "./Footer.scss";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
function Footer(props) {
 let {ph, time, day, buttons} = props
  return (
    <footer>
      <ul >
        <li className="bl lid">
          <Link to="/">
            <HomeIcon />
          </Link>
        </li>
        <li className="lid" >
          <Link to={"/" + buttons[0]}>
            {ReactHtmlParser(buttons[0])}
          </Link>
        </li>
        <li className="lid">
          <Link to={"/" + buttons[1]}>
            {ReactHtmlParser(buttons[1])}
          </Link>
        </li>
        <li  className="lid">
          <Link to={"/" + buttons[2]}>
            {ReactHtmlParser(buttons[2])}
          </Link>
        </li>
        <li className="lid">
          <Link to={"/" + buttons[3]}>
            {ReactHtmlParser(buttons[3])}
          </Link>
        </li>
        <li className="bl" id="imh">
          <img
          src="https://candid.s3-ap-southeast-2.amazonaws.com/foot.png"
          alt="Smiley face"
          width="40"
          height="40"
        />
        </li>  
        <li className="bl lid">
          {ReactHtmlParser(time)} / {ReactHtmlParser(day)}
        </li>
        <li className="bl lid">
          <a href={"tel:" + ph}>{ph}</a>
        </li>
      </ul>
      
    </footer>
  );
}

export default Footer;
