const pool = require('../../../postgresql/db')
import authorization from '../../../middlewares/authorization'

async function getBooks (req, res) {
    const { method, body } = req
    const { title, authors, coverLink, description, genres, pageCount, publishedDate, publisher, startDate, endDate } = body
    let response;

    console.log(body)
    
    switch (method) {
        case 'GET':
            response = await pool.query("select * from books where user_id = $1", [req.user])
            res.status(200).json(response.rows)
            break;

        case 'POST':
            response = await pool.query("insert into books(title, authors, coverlink, descript, genres, pages, publisheddate, publisher, startDate, endDate, user_id) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *", [title, authors, coverLink, description, genres, pageCount, publishedDate, publisher, startDate, endDate, req.user])
            res.status(200).json(response.rows[0])
            break
    
        default:
            break;
    }
}

export default authorization(getBooks)