import axios from "axios";

const checkAuth = async () => {
    try {
        const token1 = localStorage.getItem('token')
        if(token1 !== null) {
            const user = await axios.get("http://localhost:3000/api/auth/verify", {
                headers: {
                    token: token1
                }
            })
            return user.data;
        }
    } 
    catch (error) {
        console.log(error.message)
    }
}

export default checkAuth