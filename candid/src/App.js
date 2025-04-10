import React, { useState, useEffect } from 'react'
import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import About from './pages/About'
import axios from 'axios'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function App () {
  const [navigation, setNavigation] = useState([])
  const [imagesPreLoad, setImagesPreLoad] = useState({
    '/': [],
    '/about': [],
    '/gallery': [],
    '/contact': [],
    '/blog': []
  })
  const [logo, setLogo] = useState(null)

  const [load, setLoad] = useState(true)
  const [footer, setFooter] = useState('loading')
  const [table, setTable] = useState(null)
  useEffect(() => {
    const path = window.location.pathname
    for (const source of imagesPreLoad[path]) {
      const img = new Image()
      img.src = source
      imagesPreLoad[path] = []
      setImagesPreLoad({ ...imagesPreLoad })
    }
  }, [imagesPreLoad])
  useEffect(() => {
    axios
      .post('/api-init')
      .then((res) => {
        setNavigation(res.data.Navigation)
        setImagesPreLoad(res.data.ImagesPreLoad)
        setLogo([
          res.data.ImagesPreLoad['/'][0],
          res.data.LogoAlt
        ])
        setLoad(false)
      })
      .catch((error) => {
        alert(error)
      })
  }, [])
  if (load) {
    return (
      <React.Fragment>
        <img
          id="loadFront"
          src="https://candid.s3-ap-southeast-2.amazonaws.com/load.gif"
          alt="loading"
        />
      </React.Fragment>
    )
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              navigation={navigation}
              footer={footer}
              logo={logo}
            />
          }
        >
          <Route
            index
            element={<Home footer={(param) => setFooter(param)} />}
          />
          <Route
            path="/blog"
            element={
              <Blog
                navigation={navigation[0]}
                table={table}
                setTable={(param) => setTable(param)}
                footer={(param) => setFooter(param)}
              />
            }
          />
          <Route
            path="/gallery"
            element={
              <Gallery
                navigation={navigation[1]}
                footer={(param) => setFooter(param)}
              />
            }
          />
          <Route
            path="/about"
            element={
              <About
                navigation={navigation[2]}
                footer={(param) => setFooter(param)}
              />
            }
          />
          <Route
            path="/contact"
            element={
              <Contact
                navigation={navigation[3]}
                footer={(param) => setFooter(param)}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
