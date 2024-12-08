import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PhoneIcon from '@mui/icons-material/Phone'
import parse from 'html-react-parser'

class Nav extends Component {
  constructor (props) {
    super(props)
    this.state = {
      class: '',
      bar1: {
        width: '25px',
        height: '3px',
        margin: '6px auto',
        transition: '0.4s'
      },
      bar2: {
        width: '25px',
        height: '3px',
        margin: '6px auto',
        transition: '0.4s'
      },
      bar3: {
        width: '25px',
        height: '3px',
        margin: '6px auto',
        transition: '0.4s'
      },
      dis: false
    }
  }

  componentDidMount () {
    document.querySelector('.clickBurger').addEventListener('click', this.menu)
    window.addEventListener('scroll', this.handleScroll, { passive: true })
    document.body.addEventListener('click', this.menuClose)
  }

  componentWillUnmount () {
    document.querySelector('.clickBurger').removeEventListener('click', this.menu)
    window.removeEventListener('scroll', this.handleScroll)
    document.body.removeEventListener('click', this.menuClose)
  }

  setDis = () => {
    this.setState({
      dis: false,
      bar1: {
        width: '25px',
        height: '3px',
        margin: '6px auto',
        transition: '0.4s'
      },
      bar2: {
        width: '25px',
        height: '3px',
        margin: '6px auto',
        transition: '0.4s'
      },
      bar3: {
        width: '25px',
        height: '3px',
        margin: '6px auto',
        transition: '0.4s'
      }
    })
  }

  menu = (event) => {
    !this.state.dis
      ? this.setState({
        dis: true,
        bar1: {
          width: '25px',
          height: '3px',
          margin: '6px auto',
          transition: '0.4s',
          WebkitTransform: 'rotate(-45deg) translate(-6px, 4px)',
          transform: 'rotate(-45deg) translate(-6px, 4px)'
        },
        bar2: {
          width: '25px',
          height: '3px',
          margin: '6px auto',
          transition: '0.4s',
          opacity: '0'
        },
        bar3: {
          width: '25px',
          height: '3px',
          margin: '6px auto',
          transition: '0.4s',
          WebkitTransform: 'rotate(45deg) translate(-7.5px, -7.5px)',
          transform: 'rotate(45deg) translate(-7.5px, -7.5px)'
        }
      })
      : this.setDis()
  }

  menuClose = (event) => {
    if (!event.target.classList.contains('clickBurger')) {
      this.setDis()
    }
  }

  handleScroll = () => {
    if (window.scrollY > document.querySelector('main').offsetTop) {
      this.setState({ class: 'hasAnimation' })
    } else {
      this.setState({ class: '' })
    }
  }

  render () {
    const { phone, hours, days, navigation, logo } =
      this.props
    return (
      <>
        <div className="overflow-hidden">
          <nav className={`${this.state.dis}`}>
            <ul>
              <li>
                <Link to="/">
                  <span className="hiddenText">Homepage Link</span>
                  <HomeIcon id="svg" />
                </Link>
              </li>
              <li>
                <Link to="/blog">{parse(navigation[0])}</Link>
              </li>
              <li>
                <Link to="/gallery">{parse(navigation[1])}</Link>
              </li>
              <li>
                <Link to="/about">{parse(navigation[2])}</Link>
              </li>
              <li>
                <Link to="/contact">{parse(navigation[3])}</Link>
              </li>
            </ul>
            <ul>
              <li>
                <AccessTimeIcon />
              </li>
              <li>
                <p>
                  {parse(hours)}
                  <br></br>
                  {parse(days)}
                </p>
              </li>
              <li>
                <PhoneIcon />
              </li>
              <li>
                <a href={'tel:' + phone}>{phone}</a>
              </li>
            </ul>
          </nav>
        </div>
        <header className={`${this.state.class}`} >
          <Link to="/">
            <img src={logo[0]} alt={logo[1]}></img>
            <div>Candid Cleaning</div>
          </Link>
          <div className="burger">
            <div>
              <div className="bar" style={this.state.bar1}></div>
              <div className="bar" style={this.state.bar2}></div>
              <div className="bar" style={this.state.bar3}></div>
            </div>
            <div className="clickBurger"></div>
          </div>
        </header>
      </>
    )
  }
}

export default Nav
