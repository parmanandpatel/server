import mongoose from 'mongoose';
const Schema = mongoose.Schema
const userClassTimeSchema = new Schema({

    startdatetime: {
        type: Date,
        required: true
    },
    enddatetime: {
        type: Date,
        required: true
    },

    userclassid: {
        type: Schema.Types.ObjectId,
        ref: 'userclass',
        required: true
    },
},
    { timestamps: true }
)
let UserClassTime = mongoose.model('userclasstime', userClassTimeSchema);
// Customer.index({ email: 1, })

// module.exports = UserClassTime
export default UserClassTime