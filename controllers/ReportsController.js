import Auth from '../models/Auth.js';
export default {
    validateUserToken: (req, res) => {
        const user = Auth.validateToken(req);
        res.json({user:user});
    },
    login: (req, res) => {
        const user = Auth.login(req);
        res.json({user:user});
    },

   
};
