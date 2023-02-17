import Global from "../helper/message"

function validateEmailAndPassword(req, res, next) {
    try {
        const { email, password } = req.body || req.params || req.query;
        if (!email)
            throw "Email is required"

        if (!password)
            throw Global.message.Pass_REQ

        if (email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/)) {
            next()
        }
        else
            throw Global.message.EMAIL_NOT_EXISTS
    }
    catch (error) {
        console.log("errorr", error);
        res.status(400).json({
            error
        })
    }
}

function validEmail(req, res, next) {
    try {
        const { email } = req.body || req.params || req.query;
        if (!email)
            throw "Email is required"

        if (email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/)) {
            next()
        }
        else
            throw Global.message.EMAIL_NOT_EXISTS
    }
    catch (error) {
        console.log("errorr", error);
        res.status(400).json({
            error
        })
    }
}

function checkPassword(req, res, next) {
    try {
        const { password, conformpassword, email } = req.body || req.params || req.query;
        if (!email)
            throw Global.message.EMAIL_REQR
        if (!conformpassword)
            throw Global.message.CONF_PASSWORD
        if (!password)
            throw Global.message.PASSWORD

        if (password !== conformpassword)
            throw Global.message.PASSWORD_Not_MATCH_
        next()
    }
    catch (error) {
        res.status(400).json({
            error
        })
    }
}

export { validateEmailAndPassword, validEmail, checkPassword }

