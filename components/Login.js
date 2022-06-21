import { useState } from 'react'
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import Icon from '@mdi/react'
import { mdiAlphabetAurebesh } from '@mdi/js'

const Login = () => {

    const [email, setEmail] = useState("")
    const [passkey, setPasskey] = useState("")
    const [vis, setVis] = useState(false)
    const router = useRouter()

    const reset = () => {
        setEmail("")
        setPasskey("")
    }

    const submit = async (e) => {
      e.preventDefault()
      setVis(true)
      try {
        const user = { email, passkey }
        const response = await axios.post('http://localhost:3000/api/auth/login', user)
        router.push('/')
        reset()
      } 
      catch (error) {
        console.error(error.message)
      }
    }

    return (
      <div className='h-screen bg-gradient-to-r from-[#DECBA4] to-[#3E3E51] flex items-center justify-center'>
        <div className='bg-white border p-10 border-gray-300 rounded shadow-md'>
          <div className='space-y-4'>
            <div className={`flex -ml-1 items-center ${vis ? 'animate-pulse' : ''} justify-start space-x-1`}>
              <Icon path={mdiAlphabetAurebesh} size={1.5} rotate={90} />
              <div className="font-semibold text-xl text-gray-600">Traversify</div>
            </div>
            <div className='font-semibold text-xl'>Sign In</div>
            <form className="space-y-3" onSubmit={submit}>
              <div>
                <input 
                  type="email"
                  name='email'
                  className={`outline-none border-b w-60 md:w-80 py-1 border-blue-400`}
                  value={email}
                  placeholder='Email'
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
              <div>
                <input 
                  type="password"
                  name='password'
                  className={`outline-none w-60 md:w-80 border-b py-1 border-blue-400`}
                  value={passkey}
                  placeholder='password'
                  onChange={(e) => setPasskey(e.target.value)} 
                />
              </div>
              <div className='text-sm text-gray-500'>
                No account?{' '}
                <span className='text-blue-600 hover:underline underline-offset-1'>
                  <Link href='/signup'>Create one!</Link>
                </span>
              </div>
              <div className='w-full flex items-end justify-end'>
                <button type='submit' className="py-2 px-4 bg-blue-500 text-white rounded">Sign In</button>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
}

export default Login
