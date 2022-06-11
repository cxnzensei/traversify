/* eslint-disable @next/next/no-img-element */
import Icon from "@mdi/react"
import Image from 'next/image'
import { useState, useEffect } from "react";

const Header = ({ user }) => {

    const fullname = user.firstname + " " + user.lastname;
    const username = user.username;
    const [greet, setGreet] = useState('')
    
    useEffect(() => {
        const hour = new Date().getHours()
        const min = new Date().getMinutes()
        const time = hour + ":" + min
        if(hour > 0 && hour <= 11 && min <= 59) {
            setGreet('Good Morning!')
        } else if (hour >= 12 && hour <= 17 && min <= 59) {
            setGreet('Good Afternoon!')
        } else {
            setGreet('Good Evening!')
        }
    }, [])


    return (
        <>
            <div className="top-0 border-b-2 shadow-md sticky z-10 bg-white text-gray-700">
                <div className="flex items-center px-5 justify-between">
                    <div className="flex px-5 py-8 items-center space-x-3">
                        <div className="w-16 h-16 border rounded-full">
                            <Image 
                                src="/assets/cat1.jpg"
                                height={80}
                                width={80} 
                                alt="profilePhoto"
                                className="object-cover rounded-full" 
                            />
                        </div>
                        <div className="font-bold text-lg">
                            <p>{greet}</p>
                            <p>{`${fullname} (@${username})`}</p>
                        </div>
                        {/* <div>
                            <Image className="object-contain" src={`/assets/hp_badges/${user.house}.png`} width={100} height={100} alt="slytherin badge" />
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
