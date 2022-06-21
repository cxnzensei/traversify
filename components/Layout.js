import Sidebar from "./Sidebar"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import checkAuth from "../utils/checkAuth"

const Layout = ({ children }) => {
    const path = useRouter().pathname
    const [user, setUser] = useState(null)

    useEffect(() => {
        const Auth = async () => {
            const res = await checkAuth()
            if(res?.auth) {
                setUser(res?.user)
            }
        }
        Auth()
    }, [])

    if(path == '/login' || path == '/signup') {
        return (
            <div>{children}</div>
        )
    } else {
        return (
            <div className="flex">
                <Sidebar user={user} />
                {children}
            </div>
        )
    }
    
}

export default Layout
