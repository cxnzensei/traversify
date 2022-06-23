const pool = require('../../../postgresql/db')

async function verify(req, res) {
    const { method, cookies } = req

    if(method === 'GET') {
        try {
            if(cookies.token) {
                const user = await pool.query('select user_id, house, firstname, lastname, username, email from users left join houses using(house_id) where user_id = $1', [cookies.user])
                res.status(200).json({ user: user.rows[0], auth: true })
            } else {
                res.status(401).json({ user: null, auth: false })
            }

        } catch (error) {
            console.error(error.message)
            res.status(500).json({ message: "Server Error" })
        }
    }
}

export default verify