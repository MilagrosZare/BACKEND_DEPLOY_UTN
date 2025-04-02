import jwt from 'jsonwebtoken'
import { ServerError } from '../utils/errors.utils.js';
export const authMiddleware = (req, res, next) => {
    try {
        //console.log(req.headers);
        const authorization_header = req.headers['authorization']
        if (!authorization_header) {
            throw new ServerError('No authorization header found', 401);
        }

        const authorization_token = authorization_header.split(' ')[1]
        if (!authorization_token) {
            throw new ServerError('No authorization token found', 401);
        }
        try {
            const user_info = jwt.verify(authorization_token, ENVIROMENT.SECRET_KEY_JWT)
            req.user = user_info
            next()
        } catch (error) {
            throw new ServerError('Token invalido o vencido', 400);
        }
    }
    catch (error) {
        console.log("error al autentificar", error.message);

        if (error.status) {
            return response.json({
                ok: false,
                status: error.status,
                message: error.message
            });
        }

        response.json({
            status: 500,
            ok: false,
            message: "internal server error"
        });
    }
}