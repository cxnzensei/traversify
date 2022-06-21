const jwt = require('jsonwebtoken');
require('dotenv').config();

const authorization = (handler) => {
    return async (req, res) => {
        const { cookies } = req
        try {
            const jwtToken = cookies.token
            if(jwtToken === null) {
                res.status(403).json({ message: "Not Authorized", "auth": false })
            } 
            
            const payload = jwt.verify(jwtToken, process.env.jwtSecret)
            req.user = payload.user;
            return handler(req, res)
            
        } 
        catch (error) {
            console.log(error.message)
            res.status(403).json({ "message": "Not Authorized" })
        }
    }
}

export default authorization