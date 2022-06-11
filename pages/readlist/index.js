import Head from 'next/head'
import Main from '../../components/readlist/Main'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import pageTransition from '../../utils/pageTransition'

export default function Home() {
  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(false)

  
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token')
      setToken(true)
      if(token) {
        const user = await axios.get("http://localhost:3000/api/auth/verify", {
          headers: {
            "token": token
          }
        })
        if(user?.data?.auth) {
          setAuth(true)
          setUser(user?.data?.user)
        } else {
          setAuth(false)
          setUser(null)
        }
      } 
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    checkAuth()
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
        {user && (
          <title>{user.username} | readlist</title>
        )}
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        (token && auth) && (
            <Main user={user} />
        )
      }
    </motion.div>
  )
}