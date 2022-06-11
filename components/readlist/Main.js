import Header from "./Header"
import Books from "./Books"
import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"

const Main = ({ user }) => {

  const [readList, setReadList] = useState([])
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    const books = async () => {
    const res = await axios.get("http://localhost:3000/api/books", {
        headers: {
          "token": token
        }
      })
      setReadList(res.data)
    }
    books()
  }, [])

  const [book, setBook] = useState({
    title: '',
    authors: [], 
    publisher: '', 
    publishedDate: '', 
    pageCount: 0, 
    coverLink: '',
    genres: [],
    description: '',
    startDate: '',
    endDate: ''
  })

  return (
    <div className="w-full h-screen bg-[#fafafa] overflow-y-scroll">
      <Header user={user} book={book} setBook={setBook} setReadList={setReadList} readList={readList} />
      <div className="w-full">
        <Books readList={readList} setReadList={setReadList} />
      </div>
    </div>
  )
}

export default Main