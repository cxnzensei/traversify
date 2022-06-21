const pool = require('../../../postgresql/db')
const bcrypt = require('bcrypt')
import { serialize } from 'cookie'
const jwtGenerator = require('../../../utils/jwt')

export default async function login (req, res) {
    const { body, method } = req
    const { passkey, email } = body

    switch (method) {
        case 'POST':
            try {

                if(email.length === 0 || passkey.length === 0) {
                    return res.status(401).json({ message: "Missing Credentials. Enter Email and Password correctly" })
                }

                const userCheck = await pool.query("select * from users where email = $1", [email])
                if(userCheck.rowCount === 0) {
                    return res.status(401).json({ message: "Email or password is incorrect" })
                }

                const validPasskey = await bcrypt.compare(passkey, userCheck.rows[0].passkey);
                if(!validPasskey) {
                    return res.status(401).json({ message:"Password or Email is incorrect" })
                }

                const userID = userCheck.rows[0].user_id;
                const user = userCheck.rows[0]
                const token = jwtGenerator(userID)

                const tokenCookie = serialize('token', token, {
                    httpOnly: true,
                    sameSite: 'strict',
                    maxAge: 60*60*24*30,
                    path: '/'
                })

                const userCookie = serialize('user', userID, {
                    httpOnly: true,
                    sameSite: 'strict',
                    maxAge: 60*60*24*30,
                    path: '/'
                })

                res.setHeader('Set-Cookie', [tokenCookie, userCookie])

                res.json({ "message": "You have been logged in" })
            } 
            
            catch (error) {
                console.error(error.message)
                res.status(500).send("Server Error")
            }
            break;

        default:
            break;
    }
}