import React from 'react'
import './Blog.scss'
import styles from './Blog.module.scss'
import Alert from './Alert.js'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import AccountCircle from '@mui/icons-material/AccountCircle'
import SubjectIcon from '@mui/icons-material/Subject'
import TitleIcon from '@mui/icons-material/Title'
import Button from '@mui/material/Button'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import { styled } from '@mui/material/styles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import axios from 'axios'
import Resizer from 'react-image-file-resizer'
import parse from 'html-react-parser'

const StyledAccordion = styled(Accordion)({
  margin: 0,
  backgroundColor: styles.c3
})

export default class Blog extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      blog: null,
      title: null,
      data: null,
      file: null,
      name: null,
      passAdd: '',
      passRemove: '',
      date: null,
      dispAdd: { display: 'none' },
      dispRemove: { display: 'none' },
      alertAdd: null,
      alertRemove: null,
      window: window.scrollTo(0, 0),
      navigation: props.navigation,
      res: {},
      load: true,
      extension: null,
      table: null
    }
    this.props.footer('loading')
  }

  componentDidMount () {
    axios
      .get('/api-blog')
      .then((res) => {
        this.mapTable(this.props.table || res.data.Results)
        this.setState({
          res: res.data.Blog,
          load: false
        })
        this.props.footer('load')
      })
      .catch((error) => {
        alert(error)
      })
  }

  mapTable = (res) => {
    this.props.setTable(res)
    res.length
      ? this.setState({
        table: res.map((key) => {
          const { _id, blog, date, name, title, loc } = key
          return (
              <React.Fragment key={_id}>
                <tr>
                  <td>{title}</td>
                </tr>
                <tr>
                  <td>&bull;&nbsp;{date}</td>
                </tr>
                <tr>
                  <td>
                    <img
                      alt={title}
                      src={'https://' + window.location.hostname + loc}
                    />
                  </td>
                </tr>
                <tr>
                  <td>{name}:</td>
                </tr>
                <tr className="center">
                  <td>
                    {blog}
                    <hr />
                  </td>
                </tr>
              </React.Fragment>
          )
        })
      })
      : this.setState({
        table: (
            <tr style={{ height: '35vh' }}>
              <th> No posts yet </th>
            </tr>
        )
      })
  }

  change = (event) => {
    const nam = event.target.name
    const val = event.target.value
    this.setState({
      [nam]: val,
      dispAdd: { display: 'none' },
      dispRemove: { display: 'none' }
    })
  }

  file = (event) => {
    const extension = event.target.value.split('.').pop()
    const types = ['jpg', 'JPG', 'png', 'PNG', 'jpeg', 'JPEG']
    if (types.includes(extension)) {
      return Resizer.imageFileResizer(
        event.target.files[0],
        150,
        150,
        extension,
        50,
        0,
        (uri) => {
          this.setState({
            file: uri,
            extension,
            dispAdd: { display: 'none' }
          })
        },
        'base64'
      )
    }
    this.setState({
      alertAdd: 'choose || jpg || png',
      dispAdd: { display: 'block', lineHeight: '50px' },
      extension
    })
  }

  submitAdd = (event) => {
    event.preventDefault()
    const types = ['jpg', 'JPG', 'png', 'PNG', 'jpeg', 'JPEG']
    if (!types.includes(this.state.extension)) {
      return this.setState({
        alertAdd: 'choose || jpg || png',
        dispAdd: { display: 'block', lineHeight: '50px' }
      })
    }
    if (
      this.state.passAdd &&
      this.state.blog &&
      this.state.name &&
      this.state.title &&
      this.state.file
    ) {
      return axios
        .post('/api-formAdd', {
          passAdd: this.state.passAdd,
          blog: this.state.blog,
          name: this.state.name,
          title: this.state.title,
          file: this.state.file
        })
        .then((res) => {
          if (res.data.Error) {
            return this.setState({
              alertAdd: res.data.Error,
              dispAdd: { display: 'block', lineHeight: '50px' }
            })
          }
          this.mapTable(res.data)
          this.setState({
            alertAdd: 'Blog sent',
            dispAdd: { display: 'block', lineHeight: '50px' },
            passAdd: null,
            blog: null,
            name: null,
            title: null,
            file: null
          })
          document.querySelector('#formAdd').reset()
        })
        .catch((error) => {
          this.setState({
            alertAdd: error.response.statusText,
            dispAdd: { display: 'block', lineHeight: '50px' }
          })
        })
    }
    this.setState({
      alertAdd: 'Blog from incomplete',
      dispAdd: { display: 'block', lineHeight: '50px' }
    })
  }

  submitRemove = (event) => {
    event.preventDefault()
    axios
      .post('/api-formRemove', {
        passRemove: this.state.passRemove,
        date: this.state.date
      })
      .then((res) => {
        if (res.data.Error) {
          return this.setState({
            alertRemove: res.data.Error,
            dispRemove: { display: 'block', lineHeight: '50px' }
          })
        }
        this.mapTable(res.data)
        this.setState({
          alertRemove: 'Blog delete',
          dispRemove: { display: 'block', lineHeight: '50px' },
          passRemove: null,
          date: null
        })
        document.querySelector('#formRemove').reset()
      })
      .catch((error) => {
        this.setState({
          alertRemove: error.response.statusText,
          dispRemove: { display: 'block', lineHeight: '50px' }
        })
      })
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
            <div className="headingCont blogHeading">
              <h1>{parse(this.state.navigation)}</h1>
            </div>
            <section className="blogCont">
              <div className="blogResponse">
                <div className="sticky"></div>
                <table>
                  <tbody>{this.state.table}</tbody>
                </table>
              </div>
              <div style={{ backgroundColor: styles.c3 }}>
                <StyledAccordion>
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon style={{ color: styles.c11 }} />
                    }
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <div className="accordianHeading headingCont">
                      <h2>{parse(this.state.res.Blog_Add_Title)}</h2>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <form
                      id="formAdd"
                      className="formAdd"
                      onSubmit={this.submitAdd}
                      autoComplete="off"
                      style={{
                        width: '100%',
                        fontFamily: styles.font3,
                        color: styles.c11
                      }}
                    >
                      <SubjectIcon />
                      <label htmlFor="passs" className="hiddenText">
                        passAddord
                      </label>
                      <TextField
                        id="passs"
                        autoComplete="true"
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            color: styles.c3,
                            fontSize: 'inherit',
                            fontWeight: '500',
                            borderRadius: 0,
                            backgroundColor: styles.c11,
                            fontFamily: styles.font3
                          },
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockOpenIcon />
                            </InputAdornment>
                          )
                        }}
                        variant="filled"
                        type="passAddord"
                        name="passAdd"
                        placeholder="Pass:"
                        onChange={this.change}
                      />
                      <label htmlFor="title" className="hiddenText">
                        Title
                      </label>
                      <TextField
                        id="title"
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            color: styles.c3,
                            fontSize: 'inherit',
                            fontWeight: '500',
                            borderRadius: 0,
                            backgroundColor: styles.c11,
                            fontFamily: styles.font3
                          },
                          startAdornment: (
                            <InputAdornment position="start">
                              <TitleIcon />
                            </InputAdornment>
                          )
                        }}
                        variant="filled"
                        type="text"
                        name="title"
                        placeholder="Title:"
                        onChange={this.change}
                      />
                      <label htmlFor="name" className="hiddenText">
                        Name
                      </label>
                      <TextField
                        id="name"
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            color: styles.c3,
                            fontSize: 'inherit',
                            fontWeight: '500',
                            borderRadius: 0,
                            backgroundColor: styles.c11,
                            fontFamily: styles.font3
                          },
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircle />
                            </InputAdornment>
                          )
                        }}
                        variant="filled"
                        type="text"
                        name="name"
                        placeholder="Name:"
                        onChange={this.change}
                      />
                      <label htmlFor="text" className="hiddenText">
                        Text
                      </label>
                      <TextField
                        id="text"
                        multiline
                        minRows="20"
                        fullWidth={true}
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            fontFamily: styles.font3,
                            color: styles.c3,
                            fontSize: 'inherit',
                            fontWeight: '500',
                            height: '135px',
                            backgroundColor: styles.c11,
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            borderRadius: 0,
                            display: 'block'
                          }
                        }}
                        variant="filled"
                        type="text"
                        name="blog"
                        placeholder="Text:"
                        onChange={this.change}
                      />
                      <label htmlFor="avatar">Upload a picture:</label>
                      <input
                        id="avatar"
                        type="file"
                        name="file"
                        onChange={this.file}
                      />
                      <Button
                        style={{
                          color: styles.c11,
                          backgroundColor: styles.c3,
                          width: '100%',
                          height: '50px',
                          fontSize: 'inherit',
                          fontWeight: '400',
                          paddingTop: '10px',
                          marginTop: '25px',
                          borderRadius: 0
                        }}
                        variant="contained"
                        type="submit"
                        className="button"
                      >
                        {parse(this.state.res.Submitt_Form)}
                      </Button>
                      <div style={{ height: '50px' }}>
                        <div style={this.state.dispAdd}>
                          <Alert alert={this.state.alertAdd} />
                        </div>
                      </div>
                    </form>
                  </AccordionDetails>
                </StyledAccordion>
                <StyledAccordion>
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon style={{ color: styles.c11 }} />
                    }
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <div className="accordianHeading headingCont">
                      <h2>{parse(this.state.res.Blog_Remove_Title)}</h2>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <form
                      id="formRemove"
                      className="formRemove"
                      onSubmit={this.submitRemove}
                      autoComplete="off"
                      style={{
                        width: '100%',
                        fontFamily: styles.font3,
                        color: styles.c11
                      }}
                    >
                      <label htmlFor="pass" className="hiddenText">
                        passAddord
                      </label>
                      <TextField
                        id="pass"
                        autoComplete="true"
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            color: styles.c3,
                            fontSize: 'inherit',
                            fontWeight: '500',
                            borderRadius: 0,
                            backgroundColor: styles.c11,
                            fontFamily: styles.font3
                          },
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockOpenIcon />
                            </InputAdornment>
                          )
                        }}
                        variant="filled"
                        type="passAddord"
                        name="passRemove"
                        placeholder="Pass:"
                        onChange={this.change}
                      />
                      <label htmlFor="date" className="hiddenText">
                        Date
                      </label>
                      <TextField
                        id="date"
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            color: styles.c3,
                            fontSize: 'inherit',
                            fontWeight: '500',
                            borderRadius: 0,
                            backgroundColor: styles.c11,
                            fontFamily: styles.font3
                          },
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccessTimeIcon />
                            </InputAdornment>
                          )
                        }}
                        variant="filled"
                        type="text"
                        name="date"
                        placeholder="Date:"
                        onChange={this.change}
                      />
                      <Button
                        style={{
                          color: styles.c11,
                          backgroundColor: styles.c3,
                          width: '100%',
                          height: '50px',
                          fontSize: 'inherit',
                          fontWeight: '400',
                          paddingTop: '10px',
                          borderRadius: 0
                        }}
                        variant="contained"
                        className="button"
                        type="submit"
                      >
                        {parse(this.state.res.Submitt_Form)}
                      </Button>
                      <div style={{ height: '50px' }}>
                        <div style={this.state.dispRemove}>
                          <Alert alert={this.state.alertRemove} />
                        </div>
                      </div>
                    </form>
                  </AccordionDetails>
                </StyledAccordion>
              </div>
            </section>
          </React.Fragment>
            )}
      </React.Fragment>
    )
  }
}
