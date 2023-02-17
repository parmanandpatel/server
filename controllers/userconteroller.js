
import User  from '../models/user'
import Global  from "../helper/message"
import { encryptPass } from '../middleware/common'

// register customer
export const create = async (req, res) => {
    const { email, password, } = req.body
    try {
        // if (!fullname)
        //     throw Global.message.FULL_NAME_REQ

        const findCustomer = await User.findOne({ email: email });
        if (findCustomer && findCustomer !== null) {
            res.status(200).json({
                success: true,
                message: Global.message.ALREAY_CREATE
            })
        }
        else {
            let myPass = encryptPass(password)
            let registerCustomers = new User({
                email: email,
                password: myPass
            })
            let save = await registerCustomers.save()
            res.status(201).json({
                success: true,
                data: save
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            err: error
        })
    }
}
