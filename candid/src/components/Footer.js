import React from 'react'
import { Link } from 'react-router-dom'

const Footer = (props) => {
  const { footer, logo } = props
  return (
    <footer className={`${footer}`}>
      <ul>
        <li>
          <Link to="/">
            <img src={logo[0]} alt={logo[1]} />
          </Link>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
