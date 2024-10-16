import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const header = req.headers['authorization'];
    let token;

    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const bearerToken = bearer[1];

        token = bearerToken;

        jwt.verify(token, process.env.JWT, (err, user) => {
            if (err) return res.status(403).json({ message: "Access forbidden: token not authenticated" });
            next();
        });
    } else {
        //If header is undefined return Forbidden (403)
        return res.status(403).json({ message: "Access forbidden: no authentication token"})
    }
}