const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token; // cookie intercepted and recieved whenever an post/get/del/patch is done

        if(!token) {
            return res
            .status(401)
            .json({Error: "Unauthorized Request"})
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET); // make sure token is legit as only legit tokens are created at the login/register page
        // if legit, jwt token is DECODED with infomation, verified contains user id

        req.user = verified.user;

        next() // carry on to the next function after middleware
    } catch(err) {
        console.error(err)
        res.status(401).json({Error: "Unauthorized Request"})
    }
}

module.exports = auth