/* eslint-disable @next/next/no-img-element */
import Icon from "@mdi/react"
import { mdiMagnify, mdiCloseCircle, mdiArrowLeftCircle } from "@mdi/js"
import { useState, useEffect } from 'react'
import Preview from "./Preview"
import axios from "axios"
import { useRouter } from 'next/router'

const Header = ({ book, setBook, readList, setReadList, user }) => {

    const [title, setTitle] = useState('')
    const [data, setData] = useState([])
    const username = user?.username
    const router = useRouter()

    useEffect(() => {
        const fetcher = async () => {
            let response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}+intitle:${title}`)
            setData(response.data.items)
        }
        if(title.length > 0) {
            fetcher()
        }
    }, [title])

    return (
        <>
            <div className="top-0 border-b-2 px-5 py-[1.35rem] shadow-md space-y-5 sticky z-10 bg-white text-gray-700">
                <div className="flex items-center w-full justify-start md:w-3/5 space-x-3">
                    <div>
                        <Icon path={mdiMagnify} size={1.2} />
                    </div>
                    <div className="w-full relative">
                        <input 
                            type="text"
                            value={title}
                            placeholder='Search for a book cover'
                            onChange={(e) => setTitle(e.target.value)} 
                            className="outline-none border-2 w-full rounded-full px-3 py-1 bg-gray-300" 
                        />
                        <div onClick={() => setTitle('')} className={`absolute ${title.length > 0 ? 'inline-block' : 'hidden'} top-[18%] cursor-pointer right-3`}>
                            <Icon path={mdiCloseCircle} size={1} />
                        </div>
                    </div>
                </div>
                <div className="flex space-x-3">
                    <div className="cursor-pointer" onClick={() => router.back(-1)}>
                        <Icon path={mdiArrowLeftCircle} size={1.2} />
                    </div>
                    <div className="font-semibold text-xl">{`${username[username.length - 1] === 's' ? username+"'" : username+"'s"}`} readlist</div>
                </div>
            </div>
            <div className="relative">
                {title.length > 0 && (
                    <div className="absolute grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 z-50 items-center top-0 w-full bg-black text-white">
                        {data?.map((item) => (
                            item?.volumeInfo?.imageLinks?.thumbnail && (
                                <div onClick={() => {
                                    setBook({
                                        title: item?.volumeInfo?.title,
                                        authors: item?.volumeInfo?.authors,
                                        publisher: item?.volumeInfo?.publisher,
                                        publishedDate: item?.volumeInfo?.publishedDate,
                                        pageCount: item?.volumeInfo?.pageCount,
                                        coverLink: item?.volumeInfo?.imageLinks?.thumbnail,
                                        genres: item?.volumeInfo?.categories,
                                        description: item?.volumeInfo?.description,
                                        startDate: '',
                                        endDate: ''
                                    })
                                    setTitle('')
                                }} className="flex flex-col bg-white cursor-pointer hover:scale-95 duration-200 ease-in-out rounded-md p-3 h-96 text-black m-4 items-center justify-center" key={item?.id}>
                                    <img 
                                        src={item?.volumeInfo?.imageLinks?.thumbnail} 
                                        alt={item?.volumeInfo?.title}
                                        className='object-contain m-4 w-48 h-48' 
                                    />
                                    <div className="font-semibold p-3 text-sm">
                                        {item?.volumeInfo?.title?.length > 40 ? (
                                            <p>{(item?.volumeInfo?.title).substring(0, 40) + '...'}</p>
                                        ) : (
                                            <p>{item?.volumeInfo?.title}</p>
                                        )}
                                        {item?.volumeInfo?.authors ? (
                                            <div>by {(item?.volumeInfo?.authors).map((author) => (
                                                <span className="" key={author}>{author}{" "}</span>
                                            ))}</div>
                                        ) : (
                                            <p>by <span className="text-red-500">not available</span></p>
                                        )}
                                        {item?.volumeInfo?.publisher ? (
                                            <p className="font-bold underline underline-offset-1">{item?.volumeInfo?.publisher}</p>
                                        ) : (
                                            <p className="text-red-500 font-bold">No publisher info</p>
                                        )}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                )}
            </div>
            <div className="absolute top-0 z-50 md:z-0 md:relative">
                <Preview book={book} setBook={setBook} readList={readList} setReadList={setReadList} />
            </div>
        </>
    )
}

export default Header
