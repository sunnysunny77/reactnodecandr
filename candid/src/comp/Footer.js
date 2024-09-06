import React from 'react'
import HomeIcon from '@mui/icons-material/Home'
import parse from 'html-react-parser'
import { Link } from 'react-router-dom'

const Footer = (props) => {
  const { footer, phone, hours, days, navigation, logo } = props
  return (
    <footer className={footer}>
      <ul>
        <li className="block none">
          <Link to="/">
            <span className="hiddenText">Homepage Link</span>
            <HomeIcon />
          </Link>
        </li>
        <li className="none">
          <Link to="/blog">{parse(navigation[0])}</Link>
        </li>
        <li className="none">
          <Link to="/gallery">{parse(navigation[1])}</Link>
        </li>
        <li className="none">
          <Link to="/about">{parse(navigation[2])}</Link>
        </li>
        <li className="none">
          <Link to="/contact">{parse(navigation[3])}</Link>
        </li>
        <li className="block" id="logoFooter">
          <Link to="/">
            <img src={logo[0]} alt={logo[1]} />
          </Link>
        </li>
        <li className="block none">
          {parse(hours)} / {parse(days)}
        </li>
        <li className="block none">
          <a href={'tel:' + phone}>{phone}</a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
