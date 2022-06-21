const pool = require('../../../postgresql/db')
import authorization from '../../../middlewares/authorization'

async function verify(req, res) {
    const { method, cookies } = req

    if(method === 'GET') {
        try {
            const user = await pool.query('select user_id, house, firstname, lastname, username, email from users left join houses using(house_id) where user_id = $1', [cookies.user])
            res.json({ "user": user.rows[0], "auth": true })

        } catch (error) {
            console.error(error.message)
            res.status(500).json({ message: "Server Error" })
        }
    }
}

export default authorization(verify)