
import UserClass  from'../models/userclass'
import BookSlot from '../models/bookslot'


// register customer
export const createClass = async (req, res) => {
    let { title, description, startdatetime, enddatetime, slots } = req.body

    try {
        if (!title && startdatetime && enddatetime)
            throw 'All filed required'
        // startdatetime = moment(startdatetime).format("DD/MM/YYYY hh:mm a")
        // enddatetime = moment(enddatetime).format("DD/MM/YYYY hh:mm a")
        let createClasss = new UserClass({
            title: title,
            description: description ? description : "",
            avlslots: [{ startdatetime: new Date(startdatetime), enddatetime: new Date(enddatetime), slots: slots }]

        })
        let saveClass = await createClasss.save();
        res.status(201).json({
            success: true,
            // data: "success"
            message: "success"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            err: error
        })
    }
}

export const search = async (req, res) => {
    try {
        let { startdatetime, enddatetime, } = req.body
        const serachData = await UserClass.findOne();
        let serach = await UserClass.find({ avlslots: { $elemMatch: { startdatetime: { $gte: new Date(startdatetime) }, enddatetime: { $lte: new Date(enddatetime) } } } })
        res.status(200).json({
            success: true,
            total: serach.length,
            data: serach
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            err: error
        })
    }
};

export const bookClassSlot = async (req, res) => {
    try {      
        let { startdatetime, enddatetime, title } = req.body
        let findSlot = await UserClass.find({ avlslots: { $elemMatch: { startdatetime: { $gte: new Date(startdatetime) }, enddatetime: { $lte: new Date(enddatetime) } } } }).sort({ _id: -1 })

        if (findSlot && findSlot.length > 0) {
            const findSlot = await UserClass.findOne({ title: title })
            if (findSlot && findSlot !== null && findSlot.avlslots[0].slots >= 1) {
                const book = new BookSlot({
                    userId: req.params.id,
                    bookslot: [{ startdatetime: new Date(startdatetime), enddatetime: new Date(enddatetime) }]
                })
                await book.save();
                await UserClass.updateOne({
                    _id: findSlot._id,
                    "avlslots": { $elemMatch: { slots: { $eq: findSlot.avlslots[0].slots } } }
                }, {
                    $set: {
                        "avlslots.$.slots": (findSlot.avlslots[0].slots - 1)
                    }
                })
                res.status(200).json({
                    success: true,
                    data: findSlot
                })
            }
            else {
                throw 'No slot book'
            }
        } else {
            throw 'No slot found'
        }

        //    const book = await new BookSlot({


    } catch (error) {
        res.status(400).json({
            success: false,
            err: error
        })
    }
};