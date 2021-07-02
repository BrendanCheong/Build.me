const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const handlebars = require('handlebars');
const fs = require('fs');
const sgMail = require('@sendgrid/mail');


router.route('/').get((req, res) => { // /users/ is for GET req
    User.find()                         // will get array of ALL users
    .then(users => res.json(users))     //  Promise, if success, return users, json style
    .catch(err => res.status(400).json('Error: ' + err)); // spit out error if problem
});

router.post('/add/secret', async (req, res) => { // secret registration account for API testing
    const { username, password, email } = req.body;
    if (password !== process.env.SECRET_PASS) {
        res
        .status(400)
        .json("wrong password dummy")
    }

    if (username !== process.env.SECRET_USER) {
        res
        .status(400)
        .json('wrong username dummy')
    }

    if (email !== process.env.EMAIL_USERNAME) {
        res
        .status(400)
        .json('wrong email dummy')
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
            return res
            .status(400)
            .json({Error: "That username already exists!"})
    }
    try {

    const salt = await bcrypt.genSalt().catch((err) => {throw new Error (err)});
    const passwordHash = await bcrypt.hash(password, salt).catch((err) => { throw new Error (err)})


    const newUser = new User({
            username,
            email,
            passwordHash
    })

    const savedUser = await newUser.save().catch((err) => {throw new Error (err)});
    console.log('Secret user added!')

    const token = jwt.sign({
        user: savedUser._id
    },  process.env.JWT_SECRET,)

    res.cookie("token", token, { /** MAKE SURE TO UNCOMMENT secure and sameSite! */
        httpOnly: true,
        // secure: true,
        // sameSite: "none",
    })
    .json("Secret User Added Successfully!, Cookie sent!")

    } catch(err) {
        console.log(err)
        res
        .status(500)
        .json({Error: err})
    }

})

router.post('/add', async (req, res) => { // Register User and Log in
    try {
        const {username, email, password, passwordVerify} = req.body;
        const validateEmail = (email) => {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
            
        }
        
        // the following if statements are for validation, the user must have these conditions to create an account
        
        // user must enter ALL fields
        if (!username || !email || !password || !passwordVerify) {
            return res
            .status(400)
            .json({Error : "Please enter all required fields"})
        }

        // user email must be valid
        if (!validateEmail(email)) {
            return res
            .status(400)
            .json({Error: "Please enter a valid email"})
        }

        // user password must be 8 characters long
        if (password.length < 8) {
            return res
            .status(400)
            .json({Error : "Password needs to be at least 8 characters"})
        }
        
        // user's 'confirm password' must be equal to password set
        if (password !== passwordVerify) {
            return res
            .status(400)
            .json({Error: "Please enter the same password twice"})
        }

        // user's username Must be UNIQUE 
        // if exisitng User exists, it means that theres a duplicate
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res
            .status(400)
            .json({Error: "That username already exists!"})
        }

        // Encrypt using bcrypt
        // first we add salt to the password to make it truly unique
        // then we hash it
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt)


        const readHTMLfile = function(path, callback) {
            fs.readFile(path, {encoding: 'utf-8'}, function(err, html) {
                if(err) {
                    res.status(500).json(err)
                } else {
                    callback(null, html)
                }
            })
        }

        const token = jwt.sign({
            username: username,
            email: email,
            password: passwordHash,
        },
        process.env.EMAIL_SECRET,
        {
            expiresIn:'300s' // 5 minute email token expiry
        })

        sgMail.setApiKey(process.env.SENDGRID_API);

        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: process.env.EMAIL_USERNAME,
        //         pass: process.env.EMAIL_SECRET
        //     },
        //     from: process.env.EMAIL_USERNAME
        // });

        const url = `http://localhost:3000/confirm/${token}`

        readHTMLfile(__dirname + '/public/index.html', function(err, html) {
            const template = handlebars.compile(html);
            const replacements = {
                url: url
            }
            const htmlToSend = template(replacements);
            const mailOptions = {
                from: process.env.EMAIL_USERNAME,
                to: email,
                subject: "Confirm Email for Build.me",
                html: htmlToSend
            }

            sgMail.send(mailOptions, function(err, data) {
                if(err) {
                    res.status(500).json(err)
                } else {
                    res.status(200).json("Email sent!")
                }
            })
        })

        
    } catch(err) {
        console.error(err)
        res.status(400).json({Error: err})
    }
})

// log in the users using POST

router.post("/login",async (req, res) => {
    try {
        const {username, password, email} = req.body

        /* Validation process */

        // validate that all fields are sent
        if ( !username || !password || !email) {
            return res
            .status(401)
            .json({Error : "Please enter all required fields"})
        }

        // check if /username is entered correctly
        const existingUser = await User.findOne({username})
        if (!existingUser) {
            return res
            .status(401)
            .json({Error: "One of the fields is wrong!"})
        }

        // check if /email is entered correctly
        const EmailUser = await User.findOne({email})
        if (!EmailUser) {
            return res
            .status(401)
            .json({Error :"One of the fields is wrong!"})
        }
        // boolean, checks if password given matches the encryption
        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        if (!passwordCorrect) {
            return res
            .status(401)
            .json({Error: "One of the fields is wrong!"})
        }

        // if all is good, sign in the user with token
        const token = jwt.sign({
            user: existingUser._id
        },  process.env.JWT_SECRET)

        // send the token in a HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            // secure: true,
            // sameSite: "none",
        })
        .json("User logged in successfully")
        
    } catch(err) {
        console.error(err)
        res.status(400).json('Error' + err)
    }
})

// Logout functionality
router.get('/logout', (req, res) => { // GET REQUEST
    res.cookie("token", "",{ // clear cookie or make the cookie empty
        httpOnly:true,
        expires: new Date(0), // completely remove cookie
        // secure: true,
        // sameSite: "none",
    })
    .json("Logout Successful");
})

router.get("/loggedIn", (req, res) => { // validates whether Im logged in or not
    try { // requires CORs to accept origin, credentials true, and axios to send credentials true
        const token = req.cookies.token;
        if (!token) return res.json({status: false});

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        decoded["status"] = true;

        res.status(200)
        .json(decoded)

    } catch (err) {
        res.json(false);
    }
});

router.get('/verify/:token', async (req, res) => { // verify token, create user, send cookie
    try {
        const token = req.params.token;
        const decoded = jwt.verify(token, process.env.EMAIL_SECRET);
        const username = decoded.username;
        const email = decoded.email;
        const passwordHash = decoded.password;

        const newUser = new User({
            username,
            email,
            passwordHash
        })

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res
            .status(400)
            .json({Error: {name: "That user already exists!"}})
        }

        const savedUser = await newUser.save(); // after saving, this returns a new document/json of the user

        // log the user in after they have registered an account
        // sign the token immediately after registering
        const cookie = jwt.sign({
            user: savedUser._id // unique userid
        },  process.env.JWT_SECRET); // secret decryption key we created used
        // send the token in a cookie in HTTP-only

        res.cookie("token", cookie, {
            httpOnly: true,
            // secure: true,
            // sameSite: "none",
        })
        .json("User Added Successfully")


    } catch(err) {
        res
        .status(500)
        .json({Error: err})
    }

})

router.delete('/delete', auth, async (req, res) => {// DELETE USER by removing from DB and delete cookie
    try {
        await User.findByIdAndDelete(req.user).catch((err) => {
            throw new Error(err)})
        res.cookie("token", "",{ // clear cookie or make the cookie empty
            httpOnly:true,
            expires: new Date(0), // completely remove cookie
        })
        .json("Deletion of User Complete");
    } catch(err) {
        console.error(err)
        res.status(400).json("Error: " + err)
    }
})

router.get('/', auth, async (req, res) => { // GET USER by specific ID 
    /** IMPORTANT, PUT THIS FUNCTION AT THE BOTTOM if not everything else breaks */
    try {
        const UserById = await User.findById(req.user)

        res.json(UserById);
    } catch(err) {
        console.error(err)
        res.status(400).json('Error: ' + err)
    }
})

module.exports = router; // now can be used