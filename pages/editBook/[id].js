/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router"
const axios = require('axios').default;
import { useState } from "react"
import Head from "next/head"
import Icon from "@mdi/react"
import { mdiArrowLeftCircle } from "@mdi/js"
import { motion } from "framer-motion"
import pageTransition from "../../utils/pageTransition"

const EditBook = ({ book }) => {
    const router = useRouter()
    const [authors, setAuthors] = useState(book.authors)
    const [publisher, setPublisher] = useState(book.publisher)
    const [pages, setPages] = useState(book.pages)
    const [descript, setDescript] = useState(book.descript)
    const [publishedDate, setPublishedDate] = useState(book.publisheddate)
    const [genres, setGenres] = useState(book.genres)
    
    const calenderFormat = (d) => {
        let date = new Date(d).toLocaleDateString()
        let dateSplit = date.split('/')
        if(dateSplit[0]?.length === 1) {
            dateSplit[0] = `0${dateSplit[0]}`
        }
        if(dateSplit[1]?.length === 1) {
            dateSplit[1] = `0${dateSplit[1]}`
        }
        return [dateSplit[2], dateSplit[0], dateSplit[1]].join('-')
    }

    const editFunction = async (e) => {
        e.preventDefault()
        const obj = {
            authors,
            descript,
            enddate: endDate,
            startdate: startDate,
            genres,
            pages,
            publisheddate: publishedDate,
            publisher,
            title: book.title
        }
        const res = await axios.put(`http://localhost:3000/api/books/${book.book_id}`, obj)
        router.back(-1);
    }
    
    const [startDate, setStartDate] = useState(calenderFormat(book.startdate))
    const [endDate, setEndDate] = useState(calenderFormat(book.enddate))

    return (
        <motion.div
            variants={pageTransition}
            initial="initial"
            animate="in"
            exit="out"
            className="w-full overflow-y-scroll"
        >
            <Head>
                <title>Editing/{book.title}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <form onSubmit={editFunction} className="p-5 space-y-10 w-full h-screen">
                <div className="flex items-center space-x-5">
                    <div onClick={() => router.back(-1)} className="cursor-pointer hover:scale-110 duration-300 ease-in-out">
                        <Icon path={mdiArrowLeftCircle} size={1.5} color="#004567" />
                    </div>
                    <div className="font-semibold text-xl">{book.title}</div>
                </div>
                <div className="flex items-center space-x-4">
                    <img src={book.coverlink} alt={book.title} />
                    <div className="font-semibold flex space-x-2">
                        <div className="p-4">
                            <div className="border p-4 border-l-[12px] border-l-green-400 rounded-t-lg">From</div>
                            <input 
                                type="date" 
                                value={startDate} 
                                className="border p-4 rounded-b-lg"
                                onChange={(e) => setStartDate(e.target.value)} 
                            />
                        </div>
                        <div className="p-4">
                            <div className="border p-4 border-l-[12px] border-l-red-400 rounded-t-lg">To</div>
                            <input 
                                type='date' 
                                className="border p-4 rounded-b-lg" 
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)} 
                            />
                        </div>
                    </div>
                </div>
                <div className="font-semibold space-y-4">
                    <div className="space-y-3">Written by: (For multiple authors, separate names with a comma)
                        <div>Eg: a,b</div>
                        <textarea 
                            type="text" 
                            className="border rounded p-1.5 outline-none min-w-[60ch]"
                            value={authors}
                            onChange={(e) => setAuthors(e.target.value.split(','))}
                        />
                    </div>
                    <div className="space-y-3">
                        <div>Published by:</div>
                        <textarea 
                            className="border rounded p-1.5 outline-none min-w-[30ch]"
                            value={publisher}
                            onChange={(e) => setPublisher(e.target.value)}
                        />
                    </div>
                    <div className="space-y-3">
                        <div>Pages:</div>
                        <textarea 
                            className="border rounded p-1.5 outline-none min-w-[50%]"
                            value={pages}
                            onChange={(e) => setPages(e.target.value)}
                        />
                    </div>
                    <div className="space-y-3">
                        <div>Description:</div>
                        <textarea 
                            className="border rounded p-1.5 outline-none min-w-full"
                            value={descript}
                            onChange={(e) => setDescript(e.target.value)}
                        />
                    </div>
                    <div className="space-y-3">
                        <div>Publish date:</div>
                        <textarea 
                            type="text"
                            className="border rounded p-1.5 outline-none min-w-[10ch]"
                            value={publishedDate}
                            onChange={(e) => setPublishedDate(e.target.value)}
                        />
                    </div>
                    <div className="space-y-3">Genres: (For multiple genres, separate names with a comma)
                        <div>Eg: a,b</div>
                        <textarea 
                            type="text" 
                            className="border rounded p-1.5 outline-none min-w-[50ch]"
                            value={genres}
                            onChange={(e) => setGenres(e.target.value.split(','))}
                        />
                    </div>
                    <div className="pb-3">
                        <button type="submit" className="button">Edit</button>
                    </div>
                </div>
            </form>
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

export default EditBook
