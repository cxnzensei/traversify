import axios from "axios"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

const SignupForm = () => {

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [passkey, setPasskey] = useState('')
    const [confPasskey, setConfPasskey] = useState('')
    const router = useRouter()

    const setter = (message) => {
        const notif = document.getElementById('notif')
        notif.innerText = message
    }

    const reset = () => {
        setFirstname('')
        setLastname('')
        setUsername('')
        setEmail('')
        setPasskey('')
        setConfPasskey('')
    }

    const buttonSetter = (text) => {
        const button = document.getElementById('button')
        button.innerText = 'ACCOUNT CREATED!'
        setTimeout(() => {
            button.innerText = 'CREATE ACCOUNT'
        }, 1500);
    }

    const submit = async (e) => {
        e.preventDefault()

        try {
            if(passkey !== confPasskey) {
                setter(`passwords don't match`)
            }
            else {
                const user = {
                    firstname, lastname, username, email, passkey
                }
                const response = await axios.post('http://localhost:3000/api/auth/register', user) 
                let userToken = response.data;

                localStorage.setItem("token", userToken.token)
                router.push('/')

                setter('')
                buttonSetter('ACCOUNT CREATED')
                reset()
            }


        } catch (error) {
            console.error(error.message)
        }

    }
    
    return (
        <div>
            <div className="px-10 py-8 shadow-xl">
                <div className="w-3/4">
                    <div className="font-semibold text-2xl">
                        Let&apos;s do this!
                    </div>
                    <form className="relative" onSubmit={submit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:gap-x-10 lg:gap-y-6 gap-4 mt-7">
                            <div className="font-semibold text-gray-700">
                                <div className="tracking-wider">FIRST NAME</div>
                                <input 
                                    type="text"
                                    name="firstname"
                                    required={true}
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)} 
                                    className="outline-none w-full rounded border-2 px-2 py-1" 
                                />
                            </div>
                            <div className="font-semibold text-gray-700">
                                <div className="tracking-wider">LAST NAME</div>
                                <input 
                                    type="text"
                                    name="lastname"
                                    required={true}
                                    onChange={(e) => setLastname(e.target.value)} 
                                    value={lastname} 
                                    className="outline-none w-full rounded border-2 px-2 py-1" 
                                />
                            </div>
                            <div className="font-semibold text-gray-700">
                                <div className="tracking-wider">USER NAME</div>
                                <input 
                                    type="text"
                                    name="username"
                                    required={true}
                                    onChange={(e) => setUsername(e.target.value)} 
                                    value={username} 
                                    className="outline-none w-full rounded border-2 px-2 py-1" 
                                />
                            </div>
                            <div className="font-semibold text-gray-700">
                                <div className="tracking-wider">EMAIL</div>
                                <input 
                                    type="email"
                                    name="email"
                                    required={true}
                                    onChange={(e) => setEmail(e.target.value)} 
                                    value={email} 
                                    className="outline-none w-full rounded border-2 px-2 py-1" 
                                />
                            </div>
                            <div className="font-semibold text-gray-700">
                                <div className="tracking-wider">PASSWORD</div>
                                <input 
                                    type="password"
                                    name="password"
                                    required={true}
                                    onChange={(e) => setPasskey(e.target.value)} 
                                    value={passkey} 
                                    className="outline-none rounded w-full border-2 px-2 py-1" 
                                />
                                <div className="text-red-500 pl-1 h-3 text-sm" id="notif"></div>
                            </div>
                            <div className="font-semibold text-gray-700">
                                <div className="tracking-wider">CONFIRM PASSWORD</div>
                                <input
                                    name="confpasskey"
                                    value={confPasskey}
                                    required={true} 
                                    onChange={(e) => setConfPasskey(e.target.value)} 
                                    type="password" 
                                    className="outline-none rounded w-full border-2 px-2 py-1" 
                                />
                            </div>
                        </div>
                        <div className="my-14 absolute flex flex-col items-start">
                            <button id="button" type="submit" className="border outline-none px-10 md:px-14 py-4 font-bold text-xl text-white shadow-md rounded-xl bg-green-800">Create Account</button>
                            <div className="my-3 font-bold text-base md:text-xl">Already have an account? 
                                <span className="text-green-800">{" "}
                                    <Link href='/login'>
                                        Log in
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default SignupForm
