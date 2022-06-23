import axios from 'axios'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Icon from '@mdi/react'
import { mdiArrowLeftCircle, mdiPencil } from '@mdi/js'
import { motion } from 'framer-motion'
import pageTransition from '../../utils/pageTransition'
import Head from 'next/head'
import Link from 'next/link'
import checkAuth from '../../utils/checkAuth'
import { useState, useEffect } from 'react'

const Profile = ({ user }) => {

    const router = useRouter()

    const [loggedInUser, setLoggedInUser] = useState(null)

    useEffect(() => {
        const Auth = async () => {
            let response = await checkAuth();
            setLoggedInUser(response?.user?.user_id)
        }
        Auth()
    }, [])

    if(user) {
        return (
            <motion.div
                variants={pageTransition}
                initial="initial"
                animate="in"
                exit="out"
                className="overflow-y-scroll w-full"
            >
                <Head>
                    <title>Traversify/{user?.username}</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className='p-6 space-y-2'>
                    <div className='flex items-center space-x-3'>
                        <div className='hover:scale-105 duration-300 ease-in-out' onClick={() => router.back(-1)}>
                            <Icon path={mdiArrowLeftCircle} size={1.3} color='gray' />
                        </div>
                        <div className='font-semibold'>profiles/{user?.username}</div>
                    </div>
                    <div className='flex flex-col space-y-4'>
                        <div className='flex items-center space-x-1'>
                            <div className='w-36 h-36 relative'>
                                <Image 
                                    src={`/assets/hp_badges/${user?.house}.png`} 
                                    layout='fill'
                                    objectFit='contain' 
                                    alt={user?.house} 
                                />
                            </div>
                            <div className='font-semibold'>
                                <div className='flex items-center space-x-3'>
                                    <div className='text-2xl'>{user?.firstname + " " + user?.lastname}</div>
                                    {user?.user_id === loggedInUser && (
                                        <Link href={`/editUser/${user?.user_id}`}>
                                            <div className='rounded-full hover:bg-gray-400 duration-300 ease-in-out p-1.5'>
                                                <Icon path={mdiPencil} size={1} />
                                            </div>
                                        </Link>
                                    )}
                                </div>
                                <div className='text-gray-500'>{user?.username}</div>
                            </div>
                        </div>
                    </div>
                    {user?.user_id === loggedInUser && (
                        <button className='button'>Delete Account</button>
                    )}
                </div>
            </motion.div>
        )
    }
}

export default Profile

export async function getServerSideProps({ params }) {
    const id = params.id
    const response = await axios.get(`http://localhost:3000/api/users/${id}`)
    return {
        props: {
            "user": response?.data[0]
        }
    }
}