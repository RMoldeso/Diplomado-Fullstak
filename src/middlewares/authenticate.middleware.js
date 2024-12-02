import jwt from 'jsonwebtoken';
import 'dotenv/config';

export function authenticateToken(req, res, next) {
//obtenemos un jwt de la autorización
const authHeader = req.headers['authorization'];
console.log('authHeader', authHeader);

const token = authHeader && authHeader.split(' ')[1]
console.log('token', token);

if (!token) return res.sendStatus(401);

//verificar el token
const secret = process.env.JWT_SECRET
jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403);

    console.log('user', user)

    req.user = user;
    next();
    })
}