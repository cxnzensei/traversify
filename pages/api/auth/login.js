const pool = require('../../../postgresql/db')
const bcrypt = require('bcrypt')
const jwtGenerator = require('../../../utils/jwt')
const validInfo = require('../../../middlewares/validInfo')

export default async function login (req, res) {
    const { body, method } = req
    const { passkey, email } = body

    switch (method) {
        case 'POST':
            try {
                const userCheck = await pool.query("select * from users where email = $1", [email])
                if(userCheck.rowCount === 0) {
                    return res.status(401).json({ message: "Email or password is incorrect" })
                }

                const validPasskey = await bcrypt.compare(passkey, userCheck.rows[0].passkey);
                if(!validPasskey) {
                    return res.status(401).json({ message:"Password or Email is incorrect" })
                }

                const userID = userCheck.rows[0].user_id;
                const token = jwtGenerator(userID)

                res.json({ "token": token })
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