/* eslint-disable @next/next/no-img-element */
import Icon from '@mdi/react'
import { mdiCircleEditOutline, mdiDelete } from '@mdi/js';
import axios from 'axios';
import Link from 'next/link';

const Books = ({ readList, setReadList }) => {

    const removeBook = async(ID) => {
        setReadList(readList.filter(book => book.book_id !== ID))
        await axios.delete(`http://localhost:3000/api/books/${ID}`)
    }

    const dateFormat = (d) => {
        let mArray = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
        let date = new Date(d).toLocaleDateString()
        let dateSplit = date.split('/')
        return [dateSplit[1], mArray[dateSplit[0] - 1], dateSplit[2]].join(" ")
    }

    return (
        <div className="px-6 py-4 text-gray-700">
            {readList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 my-5">
                    {
                        readList.map(book => (
                            <div key={book.book_id}>
                                <div className='py-4 px-4 cursor-pointer hover:border-l-red-500 space-y-2 ease-in-out duration-300 justify-between bg-white shadow-md mr-4 mb-4 border border-l-8 border-l-yellow-500 rounded-lg'>
                                    <Link href={`/readlist/${book.book_id}`}>
                                        <div className='md:flex items-center md:space-x-7 space-y-4 md:space-y-0'>
                                            <div className='md:w-4/12'>
                                                <img 
                                                    src={book.coverlink} 
                                                    alt={book.title} 
                                                    className="object-contain w-full h-44"
                                                />
                                            </div>
                                            <div className='md:w-8/12 space-y-1'>
                                                <div className='font-bold text-lg'>{book.title}</div>
                                                <div className='text-sm'>
                                                    {book.authors.join(', ')}
                                                </div>
                                                <div className='text-xs'>{book.publisher}</div>
                                                <div className='text-[0.8em]'>{dateFormat(book.startdate)} - {dateFormat(book.enddate)}</div>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className='flex items-center justify-end space-x-3'>
                                        <Link href={`/edit/${book.book_id}`}>
                                            <Icon className='hover:scale-110 duration-100 ease-in-out' path={mdiCircleEditOutline} size={1} color='green' />
                                        </Link>
                                        <div onClick={() => removeBook(book.book_id)}>
                                            <Icon className='hover:scale-110 duration-100 ease-in-out' path={mdiDelete} size={1} color='red' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            ) : (
                <div>You haven&apos;t added anything to your readlist yet. Start by searching in the bar above.</div>
            )}
        </div>
    )
}

export default Books
