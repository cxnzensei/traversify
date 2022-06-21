/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react"
import axios from "axios"

const Preview = ({ book, readList, setBook, setReadList }) => {
    
    const dateFormat = (d) => {
        let d1 = new Date(d)
        let year = d1.getFullYear()
        let month = d1.getMonth()
        let date = d1.getDate()
        return [year, month, date].join('-')
    }

    const [start, setStart] = useState(dateFormat(new Date()))
    const [end, setEnd] = useState(dateFormat(new Date()))
    const [token, setToken] = useState(null)

    useEffect(() => {
        setToken(localStorage.getItem('token'))
    }, [])


    const reset = () => {
        setBook({
            title: '', 
            authors: [], 
            coverLink: '', 
            description: '', 
            genres: [], 
            pageCount: 0, 
            publishedDate: '', 
            publisher: '', 
            startDate: '',
            endDate: ''
        })

        setStart('')
        setEnd('')
    }
    
    const addToShelf = async () => {
        let obj = {...book, startDate: start, endDate: end}
        console.log(obj)
        try {
            const response = await axios.post('http://localhost:3000/api/books', obj, {
                headers: {
                    "token": token
                }
            })
            console.log(response)
            setReadList(readList.concat(response.data))
        } 
        catch (error) {
            console.log(error.message)    
        }
        reset()
    }
    
    if(book.title.length > 0) {
        return (
            <div className="bg-black relative w-full space-y-3 flex flex-col items-center justify-center p-10 text-white">
                <button onClick={reset} 
                className="bg-white text-black px-4 py-2 font-bold hover:scale-105 duration-200 ease-out top-0 right-0 border m-4 absolute rounded-full">X</button>
                <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row items-center justify-center space-x-7 w-full">
                    <div className="md:w-2/5 flex items-center flex-col space-y-3 justify-center">
                        <img className="border p-2 rounded-lg" src={book.coverLink} alt={book.title} />
                        <button onClick={addToShelf} className="text-xs shadow-xl hover:scale-105 duration-200 ease-in-out font-semibold rounded border bg-yellow-700 p-2">Add to Shelf</button>
                    </div>
                    <div className="text-xs md:text-sm space-y-2 md:w-3/5">
                        <div className="font-bold text-xl">{book.title}</div>
                        <div>
                            <span className="space-y-2">
                                {book.authors.map((author) => (
                                    <div className="font-bold max-w-fit bg-red-500 px-2 py-1 rounded" key={author}>{author}</div>
                                ))}
                            </span>
                        </div>
                        <div>
                            {book.publisher && (
                                <div className="font-semibold">{book.publisher}</div>
                            )}
                        </div>
                        <div className={`${book?.genres?.length > 0 && 'py-1'}`}>
                            {book?.genres?.length > 0 && (
                                <div className="space-x-2">
                                    {book?.genres?.map((genre) => (
                                        <span className="px-2 py-1 rounded bg-blue-500" key={genre}>{genre}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div>{book.pageCount} pages</div>
                        <div className="max-w-[60ch] md:max-w-[100ch]">{book.description}</div>
                        <div>
                            {book.publishedDate && (
                                <div>Published Date : {book.publishedDate}</div>
                            )}
                        </div>
                        <div className="flex flex-col max-w-fit font-semibold space-y-2">
                            <div className="space-x-2 p-2 text-black bg-white">
                                <span className="pr-2 border-r-2 border-r-black">Start Date</span>
                                <input 
                                    type="date" 
                                    className="outline-none bg-transparent" 
                                    value={start}
                                    onChange={(e) => setStart(e.target.value)}
                                />
                            </div>
                            <div className="space-x-2 p-2 text-black bg-white">
                                <span className="pr-2 border-r-2 border-r-black">End Date</span>
                                <input 
                                    type="date" 
                                    className="outline-none bg-transparent"
                                    value={end}
                                    onChange={(e) => setEnd(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Preview
