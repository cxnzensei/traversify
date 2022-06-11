const validInfo = (handler) => {

    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    return async (req, res) => {
        try {
            const { body, url } = req

            if (url === "/api/auth/register") {
                const { email, username, firstname, lastname, passkey } = body
                if (![email, firstname, lastname, username, passkey].every(Boolean)) {
                    return res.json({ "message": "Missing Credentials" });
                } else if (!validEmail(email)) {
                    return res.json({ "message": "Invalid Email" });
                } else return true
            }
        
            else if (url === "/api/auth/login") {
                const { email, passkey } = body
                if (![email, passkey].every(Boolean)) {
                    return res.json({ "message": "Missing Credentials" });
                } else if (!validEmail(email)) {
                    return res.json({ "message": "Invalid Email" });
                }
            }

            return handler(req, res)
        }

        catch (error) {
            console.log(error.message)
            res.status(500).json({ "message": "Server Error" })
        }
    }
}

export default validInfo