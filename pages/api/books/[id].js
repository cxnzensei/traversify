const pool = require('../../../postgresql/db')

export default async function book (req, res) {
    const { method, query, body } = req
    const { authors, descript, enddate, genres, pages, publisheddate, publisher, startdate, title } = body

    let response;

    const dateFormat = (d) => {
        let mArray = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
        let date = new Date(d).toLocaleDateString()
        let dateSplit = date.split('/')
        return [dateSplit[0], mArray[dateSplit[1] - 1], dateSplit[2]].join(" ")
    }
    
    switch (method) {
        case 'GET':
            response = await pool.query("select * from books where book_id=$1", [query.id])
            res.status(200).json({ ...response.rows[0], startdate: dateFormat(response.rows[0].startdate), enddate: dateFormat(response.rows[0].enddate)})
            break;
        
        case 'DELETE':
            response = await pool.query("delete from books where book_id=$1", [query.id])
            res.status(204).json({ "message": `${query.id} was deleted` })

        case 'PUT':
            try {
                response = await pool.query("update books set authors=$1, descript=$2, enddate=$3, genres=$4, pages=$5, publisheddate=$6, publisher=$7, startdate=$8 where book_id=$9", [authors, descript, enddate, genres, pages, publisheddate, publisher, startdate, query.id])
                res.status(200).json({ message: `${title} was successfully updated` })
            } 
            catch (error) {
                console.log(error.message)
                res.status(500).json({ message: `${title} wasn't updated.` })
            }
    
        default:
            break;
    }
}