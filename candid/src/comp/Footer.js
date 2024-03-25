import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import "./Footer.scss";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

const Footer = (props) => {
  let { footer, phone, hours, days, buttons, logoFooter } = props;
  console.log(logoFooter)
  return (
    <footer className={footer}>
      <ul>
        <li className="block none">
          <Link to="/">
            <span id="hl3" className="hiddenText">
              Homepage Link
            </span>
            <HomeIcon aria-labelledby="hl3" role="link">
              Home
            </HomeIcon>
          </Link>
        </li>
        <li className="none">
          <Link to="/blog">{parse(buttons[0])}</Link>
        </li>
        <li className="none">
          <Link to="/gallery">{parse(buttons[1])}</Link>
        </li>
        <li className="none">
          <Link to="/about">{parse(buttons[3])}</Link>
        </li>
        <li className="none">
          <Link to="/contact">{parse(buttons[2])}</Link>
        </li>
        <li className="block" id="imh">
          <Link to="/">
            <img
              src={logoFooter[0]}
              alt={logoFooter[1]}
              width="40"
              height="40"
            />
          </Link>
        </li>
        <li className="block none">
          {parse(hours)} / {parse(days)}
        </li>
        <li className="block none">
          <a href={"tel:" + phone}>{phone}</a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
