const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

const admin = async (req, res, next) => {

    try {
        const token = req.cookies.token;

        if(!token) {
            return res
            .status(401)
            .json({Error: "Unauthorized Request"})
        }
        const data = jwt.verify(token, process.env.JWT_SECRET);
        const AdminUser = await User.findById(data.user);
        const passwordDecoded = bcrypt.compare(process.env.ADMIN_PASS,AdminUser.passwordHash)
        
        if (AdminUser.username !== process.env.ADMIN_USER) {
            
            return res
            .status(401)
            .json({Error : "Unauthorized Request"})
        }
        if (!passwordDecoded) {
            
            return res
            .status(401)
            .json({Error: "Unauthorized Request"})
        }
        
        req.user = data.user;
        next();

    } catch(err) {
        console.error(err)
        res
        .status(401)
        .json({Error: "Unauthorized Request"})
    }
}

module.exports = admin