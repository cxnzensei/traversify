import Head from 'next/head'
import Main from '../components/Main'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import pageTransition from '../utils/pageTransition'
import checkAuth from '../utils/checkAuth'

export default function Home() {
  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState(null)

  const Auth = async () => {
    try {
      const res = await checkAuth()
      if(res?.auth) {
        setAuth(true)
        setUser(res?.user)
      } else {
        setAuth(false)
        setUser(null)
      } 
    } 
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    Auth()
  }, [])

  return (
    <motion.div 
      variants={pageTransition}
      initial="initial"
      animate="in"
      exit="out"
      className='w-full'
    >
      <Head>
        <title>Traversify | Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        (auth) && (
          <Main user={user} />
        )
      }
    </motion.div>
  )
}