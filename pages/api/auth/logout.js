import { serialize } from "cookie"

export default async function logout (req, res) {
    const { cookies } = req

    const token = cookies.token

    if(!token) {
        return res.status(401).json({ message: 'Your session has expired, Log in to continue' })
    } else {

        const tokenCookie = serialize('token', null, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: -1,
            path: '/'
        })

        const userCookie = serialize('user', null, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: -1,
            path: '/'
        })

        res.setHeader('Set-Cookie', [tokenCookie, userCookie])
        res.status(200).json({ message: `You've been logged out`})
    }
}