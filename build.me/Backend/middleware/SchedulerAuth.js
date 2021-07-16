const SchedulerAuth = async (req, res, next) => {
    try {
        const { password } = req.body;
        if (password !== process.env.ADMIN_PASS) {
            return res
            .status(404)
            .json({Error: "Unauthorized Password"})
        } else {
            console.log("Authorized!")
        }

        next();

    } catch(err) {
        res
        .status(404)
        .json({Error: err})
    }
}

module.exports = SchedulerAuth;