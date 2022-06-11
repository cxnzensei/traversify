import '../styles/globals.css'
import Layout from '../components/Layout'
import ProgressBar from '@badrap/bar-of-progress'
import Router from 'next/router'
import { useEffect, useState } from 'react'

const progress = new ProgressBar({
  size: 4,
  color: '#FE595E',
  className: 'z-50',
  delay: 100
})

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)


function MyApp({ Component, pageProps }) {

  const [token, setToken] = useState(null)

  useEffect(() => {
    setToken(localStorage.getItem('token'));

    if(token !== null) {
      if(Router.pathname === '/login' || Router.pathname === '/signup') {
        Router.push('/')
      }
    }
  }, [token])

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
