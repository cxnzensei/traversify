import Sidebar from "./Sidebar"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import checkAuth from "../utils/checkAuth"

const Layout = ({ children }) => {
    const path = useRouter().pathname

    if(path == '/login' || path == '/signup') {
        return (
            <div>{children}</div>
        )
    } else {
        return (
            <div className="flex">
                <Sidebar />
                {children}
            </div>
        )
    }
    
}

export default Layout
