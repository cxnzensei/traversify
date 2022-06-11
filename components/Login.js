import Image from "next/image"
import { useState } from 'react'
import axios from "axios"
import Link from "next/link"
import Router, { useRouter } from "next/router"

const Login = () => {

    const [email, setEmail] = useState("")
    const [passkey, setPasskey] = useState("")
    const router = useRouter()

    const reset = () => {
        setEmail("")
        setPasskey("")
    }

    const submit = async (e) => {
        e.preventDefault()
      
        try {
          const user = {
              email, passkey
          }
          const response = await axios.post('http://localhost:3000/api/auth/login', user) 
          let userData = response.data;

          localStorage.setItem("token", userData.token)

          router.push('/')

          reset()

        } catch (error) {
          console.error(error.message)
        }
    }

    return (
    <div>
        <Image 
            src='/assets/image.jpg' 
            layout='fill' 
            alt='cat'
            className='object-cover object-top' 
        />
        <form className='relative space-x-3' onSubmit={submit}>
          <input 
            type="email"
            name='email'
            className="outline-none p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password"
            name='password'
            className="outline-none p-2"
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)} 
          />
          <button className="bg-white p-2" type="submit">Sign In</button>
        </form>
        <div className="relative">
          New here?
          <Link href='/signup'>
            Sign up
          </Link> 
        </div>
    </div>
  )
}

export default Login
