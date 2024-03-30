import React, { Component } from 'react'
import './Contact.scss'
import Wave from './Wave'
import ContactsIcon from '@mui/icons-material/Contacts'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import axios from 'axios'
import parse from 'html-react-parser'

export default class Contactc extends Component {
  constructor (props) {
    super(props)
    this.state = {
      window: window.scrollTo(0, 0),
      res: {},
      phone: props.phone,
      navigation: props.navigation,
      load: true
    }
    this.props.footer('loading')
  }

  componentDidMount () {
    axios
      .post('/api-contact')
      .then((res) => {
        this.setState({ res: res.data, load: false })
        this.props.footer('load')
      })
      .catch((error) => {
        alert(error)
      })
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.load !== this.state.load) {
      window.addEventListener('scroll', this.handleScroll, { passive: true })
      window.addEventListener('resize', this.handleScroll, { passive: true })
    }
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleScroll)
  }

  handleScroll = () => {
    if (window.innerWidth > 1200) { return (document.querySelector('.sticky').style.top = '40px') }
    if (window.innerWidth <= 1200) { document.querySelector('.sticky').style.top = '0px' }
  }

  render () {
    return (
      <React.Fragment>
        {this.state.load
          ? (
          <img
            id="load"
            src="https://candid.s3-ap-southeast-2.amazonaws.com/load.gif"
            alt="loading"
          />
            )
          : (
          <React.Fragment>
            {this.state.window}
            <div className="headingCont">
              <h1> {parse(this.state.navigation)} </h1>
            </div>
            <section className="contactContOne">
              <img
                alt={this.state.res.Image_Alt}
                src={this.state.res.Image}
                className="contactOne"
              ></img>
              <div className="contactTwo">
                <h2>
                  {parse(this.state.res.Heading_One)}
                  <ContactsIcon />
                </h2>
                <hr />
                <p>
                  {parse(this.state.res.Email_Tag)}
                  <a href={'mailto:' + this.state.res.Email}>
                    {this.state.res.Email}
                  </a>
                  {parse(this.state.res.Phone_Tag)}
                  <a href={'tel:' + this.state.phone}>{this.state.phone}</a>
                  {parse(this.state.res.Enquiries_Tag)}
                  <span className="enquiries">
                    <span> {parse(this.state.res.Enquiries_Button)}</span>
                    <HelpOutlineIcon
                      onClick={() => {
                        const x = window.location.origin
                        window.location.replace(x + '?enquiries=enquiries')
                      }}
                    />
                  </span>
                </p>
              </div>
              <br className="clearFloat" />
            </section>
            <section className="contactContTwo">
              <h2>
                {parse(this.state.res.Heading_Two)}
                <ContactsIcon />
              </h2>
              <hr />
              <Wave>
                <div id="contactResponse" className="prop">
                  {parse(this.state.res.Availabilty)}
                </div>
              </Wave>
            </section>
          </React.Fragment>
            )}
      </React.Fragment>
    )
  }
}
