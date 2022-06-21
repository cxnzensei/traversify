const pool = require('../../../postgresql/db')
const bcrypt = require('bcrypt')
const jwtGenerator = require('../../../utils/jwt')

export default async function register(req, res) {
    const { method, body } = req
    const { username, email, passkey, firstname, lastname } = body

    switch (method) {
        case "POST":
            try {
                const emailCheck = await pool.query("select user_id from users where email = $1", [email])
                if(emailCheck.rowCount != 0) {
                    res.status(401).json({message: "Email taken, try another email."})
                }

                const usernameCheck = await pool.query("select user_id from users where username = $1", [username])
                if(usernameCheck.rowCount != 0) {
                    res.status(401).json({ message: "Username taken, try something else."})
                }

                if(usernameCheck.rowCount === 0 && emailCheck.rowCount === 0) {
    
                    const saltRounds = 10;
                    const salt = await bcrypt.genSalt(saltRounds);
    
                    const bcryptpasskey = await bcrypt.hash(passkey, salt)
    
                    const newUser = await pool.query("insert into users(username, email, passkey, firstname, lastname) values($1, $2, $3, $4, $5) returning *", [username, email, bcryptpasskey, firstname, lastname])

                    const token = jwtGenerator(newUser.rows[0].user_id);
    
                    res.status(200).json({ "token" : token })

                }

            } catch (error) {
                console.error(error.message)
                res.status(400).json({ success: false })
            }
            break;
        default:
            break;
    }
}