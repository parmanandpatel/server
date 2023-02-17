
import Customer from '../models/customer'
import { encryptPass, decryptPass } from "../middleware/common"
import { tokenValidation, createToken } from "../middleware/auth"
import Global from "../helper/message"
import { checkId } from "../dataproviders/customerprovider";
import sendMail from "../helper/emali"
import { findByEmail } from '../dataproviders/customerprovider';

// register customer
export const register = async (req, res) => {
    const { fullname, email, password, role_id, home_address, billing_address } = req.body

    try {
        if (!fullname)
            throw Global.message.FULL_NAME_REQ

        const findCustomer = await Customer.findOne({ email: email })
        if (findCustomer && findCustomer !== null) {
            res.status(200).json({
                success: true,
                message: Global.message.ALREAY_CREATE
            })
        }
        else {
            let myPass = encryptPass(password)
            let registerCustomers = new Customer({
                fullname: fullname ? fullname : "",
                email: email,
                password: myPass,
                role_id: role_id ? role_id : 1,
                home_address: home_address ? home_address : {},
                billing_address: billing_address ? billing_address : {}

            })
            let saveCustomer = await registerCustomers.save()
            res.status(201).json({
                success: true,
                data: saveCustomer
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            err: error
        })
    }
}

// login 
export const login = async (req, res) => {
    const { email, password, } = req.body
    try {
        const findCustomer = await Customer.findOne({ email: email })
        if (findCustomer && findCustomer !== null) {
            const checkPass = decryptPass(findCustomer.password)
            if (password == checkPass) {
                let token = createToken(findCustomer.email, findCustomer._id);
                res.status(200).json({
                    success: true,
                    data: findCustomer,
                    token: token
                })
            }
            else
                throw Global.message.PASSWORD_NOT_MATCH

        }
        else
            throw Global.message.CHECK_EMAIL_PASS


    } catch (error) {
        res.status(400).json({
            success: false,
            err: error
        })
    }
}

// Update customer profile
export const updateProfile = async (req, res) => {
    try {
        const { fullname, home_address, billing_address } = req.body
        const Id = req.params.id
        const customerId = await checkId(Customer, Id);
        if (customerId._id == undefined) {
            throw Global.message.NO_Data_
        }
        else {
            const customerData = {
                fullname: fullname,
                home_address: home_address,
                billing_address: billing_address
            };
            await Customer.updateOne(
                { _id: Id },
                customerData
            );
            res.status(200).json({
                success: true,
                message: Global.message.USER_UPDATED_SUCC
            })
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            err: error
        })
    }
};

// update profile by customer token
export const updateProfileByToken = async (req, res) => {
    try {

        const { fullname, role_id, home_address, billing_address } = req.body
        const customerData = {
            fullname: fullname,
            role_id: role_id,
            home_address: home_address,
            billing_address: billing_address
        };
        //ObjectId(params.testId)
        await Customer.findByIdAndUpdate(
            { _id: req.decoded.id },
            customerData
        );
        res.status(200).json({
            success: true,
            message: Global.message.USER_UPDATED_SUCC
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            err: error
        })
    }
};

// list of all customers
export const allCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json({
            success: true,
            customers,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            err: error
        })
    }
};

// list of all customers with pagination
export const allCustomer = async (req, res) => {
    try {
        let size = req.query.size ? parseInt(req.query.size) : 0
        let page = req.query.page ? parseInt(req.query.page) : 0
        const customers = await Customer.find().limit(size)
            .skip(page)
        res.status(200).json({
            success: true,
            data: customers,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            err: error
        })
    }
};

export const getCustomer = async (req, res) => {
    try {
        const Id = req.params.id
        const customerId = await checkId(Customer, Id);
        if (customerId._id == undefined) {
            throw Global.message.NO_Data_
        }
        else {
            // const customer = await Customer.findById({ Id });
            // const email = await idExist.findByEmail(Customer, customerId.email);
            res.status(200).json({
                success: true,
                data: customerId,
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            err: error
        })
    }
};

// delete customer by id 
export const deleteCustomer = async (req, res) => {
    try {
        const Id = req.params.id
        const customerId = await checkId(Customer, Id);
        if (customerId._id == undefined) {
            throw Global.message.NO_Data_
        }
        else {
            const deleteCustom = await Customer.deleteOne({ _id: Id });
            res.status(200).json({
                success: true,
                data: deleteCustom,
            })
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            err: error
        })
    }
};

export const logOut = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "success"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            err: error
        })
    }
};

export const forGetPassword = async (req, res) => {
    try {
        const email = req.body.email;
        if (!email)
            throw Global.message.EMAIL_REQR
        const userData = await findByEmail(Customer, email);
        if (userData.result == null) {
            throw Global.message.NO_Data_
        }
        else {
            sendMail(userData.result.email)
            res.status(200).json({
                success: true,
                message: "success"
            })
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            err: error
        })
    }
};

export const updatePassword = async (req, res) => {
    try {
        const { password, conformpassword, email } = req.body;
        const userData = await idExist.findByEmail(Customer, email);
        if (userData.result == null) {
            throw Global.message.NO_Data_
        }
        else {
            let myPass = encryptPass(password)
            await Customer.updateOne({ _id: userData.result._id }, {
                set: {
                    password: myPass
                }
            })
            res.status(200).json({
                success: true,
                message: "success"
            })
        }


    } catch (error) {
        res.status(400).json({
            success: false,
            err: error
        })
    }
};

export const uploadFile = async (req, res) => {
    try {
        const id = req.decoded.id;
        let file = req.file.filename;
        await Customer.updateOne({
            _id: id
        }, {
            $set: {
                image: file

            }
        })
        res.status(200).json({
            success: true,
            data: req.file
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            err: error
        })
    }
};