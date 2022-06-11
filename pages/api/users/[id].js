/* eslint-disable react-hooks/rules-of-hooks */
const pool = require('../../../postgresql/db')

export default async function getOneUser(req, res) {
    const { query, method } = req
    const { id } = query
    let result;
    
    switch (method) {
        case 'GET':
            result = await pool.query("select user_id, firstname, lastname, username, email, house from users left join houses using(house_id) where user_id = $1", [id])
            res.status(200).json(result.rows)
            break;
        case 'DELETE':
            result = await pool.query("delete from users where user_id = $1", [id])
            res.status(204)
        default:
            break;
    }
}