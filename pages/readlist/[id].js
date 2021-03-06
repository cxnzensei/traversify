import axios from "axios"
import Head from "next/head"
import Icon from "@mdi/react"
import { mdiArrowLeftCircle, mdiCircleEditOutline, mdiDelete } from "@mdi/js"
import { motion } from "framer-motion"
import pageTransition from "../../utils/pageTransition"
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from "next/link"

const SingleBook = ({ book }) => {

    const router = useRouter()

    const deleteBook = async (ID) => {
        try {
            await axios.delete(`http://localhost:3000/api/books/${ID}`)
            router.push('/readlist')
        } 
        catch (error) {
            console.log(error.message)
        }
    }

    return (
        <motion.div
            variants={pageTransition}
            initial="initial"
            animate="in"
            exit="out"
            className="overflow-y-scroll w-full"
        >
            <Head>
                <title>Traversify/{book.title}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="p-5 space-y-10 w-full h-screen">
                <div className="flex items-center space-x-5">
                    <div onClick={() => router.back(-1)} className="cursor-pointer hover:scale-110 duration-300 ease-in-out">
                        <Icon path={mdiArrowLeftCircle} size={1.5} color="#004567" />
                    </div>
                    <div className="font-semibold text-xl">{book.title}</div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="w-52 h-auto">
                        <Image objectFit="contain" src={book.coverlink} alt={book.title} height={200} width={200} />
                    </div>
                    <div>
                        <div className="font-semibold flex space-x-2">
                            <div className="p-4">
                                <div className="border p-4 border-l-[12px] border-l-green-400 rounded-t-lg">From</div>
                                <div className="border p-4 rounded-b-lg">{book.startdate}</div>
                            </div>
                            <div className="p-4">
                                <div className="border p-4 border-l-[12px] border-l-red-400 rounded-t-lg">To</div>
                                <div className="border p-4 rounded-b-lg">{book.enddate}</div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 px-4 py-2">
                            <Link href={`/editBook/${book.book_id}`}>
                                <Icon className="hover:scale-105 duration-300 ease-in-out" path={mdiCircleEditOutline} size={1.2} color='green' />
                            </Link>
                            <div onClick={() => deleteBook(book.book_id)}>
                                <Icon className="hover:scale-105 duration-300 ease-in-out" path={mdiDelete} size={1.2} color='red' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="font-semibold space-y-4">
                    <div>Written by:
                        {book.authors && (
                            book.authors.map(author => (
                                <div key={author}>{author}</div>
                            ))
                        )}
                    </div>
                    <div>Published by:
                        <div>{book.publisher}</div>
                    </div>
                    <div>Pages:
                        <div>{book.pages}</div>
                    </div>
                    <div>Description:
                        <div>
                            {book.descript}
                        </div>
                    </div>
                    <div>Publish date:
                        <div>{book.publisheddate}</div>
                    </div>
                    <div>
                        {book.genres && (
                            <>
                                <div>
                                    {book.genres.length < 2 ? 'Genre:' : 'Genres:'}
                                </div>
                                <div>{book.genres.map(genre => (
                                    <div key={genre}>{genre}</div>
                                ))}</div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export async function getServerSideProps({ params }) {
    const id = params.id
    const res = await axios(`http://localhost:3000/api/books/${id}`)
    return {
        props: {"book": res.data}
    }
}

export default SingleBook