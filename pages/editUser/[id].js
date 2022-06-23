import React from 'react'
import Head from 'next/head'
import axios from 'axios'
import { motion } from 'framer-motion'
import pageTransition from '../../utils/pageTransition'
import Icon from '@mdi/react'
import { mdiArrowLeftCircle, mdiPencilPlus } from '@mdi/js'
import { useRouter } from 'next/router'

const EditUser = ({ user }) => {
    const router = useRouter()
    return (
        <motion.div
            variants={pageTransition}
            initial="initial"
            animate="in"
            exit="out"
            className="overflow-y-scroll w-full"
        >
            <Head>
                <title>Editing/{user?.username}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='p-6'>
                <div className='flex items-center space-x-3'>
                    <div className='hover:scale-105 duration-300 ease-in-out' onClick={() => router.back(-1)}>
                        <Icon path={mdiArrowLeftCircle} size={1.3} color='gray' />
                    </div>
                    <div className='font-semibold'>profiles/{user?.username}</div>
                    <Icon path={mdiPencilPlus} size={1} color='gray' />
                </div>
            </div>
        </motion.div>
    )
}

export default EditUser

export async function getServerSideProps({ params }) {
    const id = params.id
    const response = await axios.get(`http://localhost:3000/api/users/${id}`)
    return {
        props: {
            "user": response?.data[0]
        }
    }
}
