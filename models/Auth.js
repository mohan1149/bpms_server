import jwt from 'jsonwebtoken';
import connection from './DB.js';
export default {
    validateToken: (req) => {
        const secretKey = '14701A0549';
        const token = req.body.token;
        try {
            const decoded = jwt.verify(token, secretKey);
            if (decoded) {
                return ({
                    valid: true,
                    user: decoded,
                });
            } else {
                return ({
                    valid: false,
                });
            }
        } catch (error) {
            console.error('JWT validation error:', error.message);
            return null;
        }
    },
    login: async (req) => {
        let email = req.body.username;
        let password = req.body.password;
        let query = "SELECT * FROM users where email='" + email + "' AND password='" + password + "' AND status='active' limit 1";
        const list = await new Promise((resolve, reject) => {
            connection.query(query, (err, rows, columns) => {
                if (err) {
                    reject(err);
                } else {
                    if (rows.length > 0) {
                        let user = rows[0]
                        delete user.password;
                        const secretKey = '14701A0549';
                        const expiresIn = '2h';
                        const payload = {
                           ...user
                        };
                        const token = jwt.sign(payload, secretKey, { expiresIn });
                        resolve({
                            staus: 200,
                            message: 'login_success',
                            error: false,
                            user: user,
                            access_token:token,

                        });
                    } else {
                        resolve({
                            staus: 200,
                            message: 'invalid_credits',
                            error: true,
                        });
                    }

                }
            })
        });
        return list;
    },

};
