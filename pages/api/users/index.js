const pool = require('../../../postgresql/db')

export default async function getAllUsers(req, res) {
    const response = await pool.query("select user_id, firstname, lastname, username, email, house from users left join houses using(house_id)")
    return res.status(200).json(response.rows)
}