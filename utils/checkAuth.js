import axios from "axios";

const checkAuth = async () => {
    try {
        const user = await axios.get("http://localhost:3000/api/auth/verify")
        return user.data;
    } 
    catch (error) {
        console.log(error.message)
    }
}

export default checkAuth