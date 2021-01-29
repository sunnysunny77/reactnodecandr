
import React, { Component } from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import PhoneIcon from '@material-ui/icons/Phone'


class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bar1: { width: '35px', height: '5px', backgroundColor: 'black', margin: "6px 0", transition: '0.4s' },
      bar2: { width: '35px', height: '5px', backgroundColor: 'black', margin: "6px 0", transition: '0.4s' },
      bar3: { width: '35px', height: '5px', backgroundColor: 'black', margin: "6px 0", transition: '0.4s' },
      s: false,
      dis: { display: 'none' }
    }
  }
  componentDidMount() {
    let a = document.getElementById('di')
    a.addEventListener('click', this.out)
    window.addEventListener('scroll', this.handleScroll)
  }
  componentWillUnmount() {
    let a = document.getElementById('di')
    a.removeEventListener('click', this.out)
    window.removeEventListener('scroll', this.handleScroll)
  }
  handleScroll = () => {
    if (window.scrollY >= 90) {
      document.querySelector('.menu').style.position = 'fixed'
      document.querySelector('.menu').style.top = '0'
      document.querySelector('#di').style.position = 'relative'
      document.querySelector('#di').style.paddingTop = '70px'

    } else {
      document.querySelector('.menu').style.position = 'relative'
      document.querySelector('#di').style.paddingTop = '0'
    }
  }
  out = () => {
    if (this.state.s === true) {
      this.setState({ s: false, dis: { display: 'none' }, bar1: { width: '35px', height: '5px', backgroundColor: 'black', margin: "6px 0", transition: '0.4s' }, bar2: { width: '35px', height: '5px', backgroundColor: 'black', margin: "6px 0", transition: '0.4s' }, bar3: { width: '35px', height: '5px', backgroundColor: 'black', margin: "6px 0", transition: '0.4s' } })
    }
  }
  bars = () => {
    this.state.s ? this.setState({ s: false, dis: { display: 'none' }, bar1: { width: '35px', height: '5px', backgroundColor: 'black', margin: "6px 0", transition: '0.4s' }, bar2: { width: '35px', height: '5px', backgroundColor: 'black', margin: "6px 0", transition: '0.4s' }, bar3: { width: '35px', height: '5px', backgroundColor: 'black', margin: "6px 0", transition: '0.4s' } }) : this.setState({ s: true, dis: { display: 'block' }, bar1: { width: '35px', height: '5px', backgroundColor: 'black', margin: "6px 0", transition: '0.4s', WebkitTransform: "rotate(-45deg) translate(-9px, 6px)", transform: "rotate(-45deg) translate(-9px, 6px)" }, bar2: { width: '35px', height: '5px', backgroundColor: 'black', margin: "6px 0", transition: '0.4s', opacity: "0" }, bar3: { width: '35px', height: '5px', backgroundColor: 'black', margin: "6px 0", transition: '0.4s', WebkitTransform: "rotate(45deg) translate(-8px, -8px)", transform: "rotate(45deg) translate(-8px, -8px)" } })
  }
  render() {
    return (<React.Fragment>
      <div className='barDraw' onClick={this.bars}>
        <div style={this.state.bar1}></div>
        <div style={this.state.bar2}></div>
        <div style={this.state.bar3}></div>
      </div>
      <div className='menuDraw' style={this.state.dis}>
        <div>
          <hr></hr>
          <Link to="/"><HomeIcon id='homI' /></Link>
          <Link to="/blog"><button >Blog</button></Link>
          <Link to="/gallery"><button >Gallery</button></Link>
          <Link to="/contact"><button >Contact</button></Link>
          <Link to="/about"><button >About</button></Link>
          <hr></hr>
        </div>
        <div>
          <PhoneIcon className='phI' />
          <br></br>
          <a href="tel:+0412620989">0412620989</a>
          <br></br>
          <br></br>
          <AccessTimeIcon className='phI' />
          <br></br>
          <span> 
            7am - 7pm 
            <br></br>
            Mon - Fri
          </span>
        </div>
        <img src="./logos.jpg" alt="Smiley face" width="60" height="60"></img>
      </div>
      <header>
          <img src="./logo.jpg" alt="Smiley face" width="140" height="32"></img>
      </header>
      <div className='menu'>
        <div className='mMove'>
          <Link to="/blog"><button >Blog</button></Link>
          <Link to="/gallery"><button >Gallery</button></Link>
          <Link to="/contact"><button >Contact</button></Link>
          <Link to="/about"><button >About</button></Link>
          <div className='mMove0'>
            <PhoneIcon className='apI' />
            <a href="tel:+0412620989">0412620989</a>
            <AccessTimeIcon className='apI' />
            <span>7am - 7pm / Mon - Fri</span>
            <Link to="/"><HomeIcon id='homIa' className='apI' /></Link>
          </div>
        </div>
      </div>
    </React.Fragment>);
  }
}

export default Nav;