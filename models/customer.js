import mongoose from 'mongoose';
const Schema = mongoose.Schema
const customerSchema = new Schema({
    fullname: {
        type: String
    },

    email: {
        type: String,
        unique: true,
        required: true,
    },

    password: {
        type: String
    },
    billing_address: {
        type: Object
    },
    home_address: {
        type: Object
    },
    status:
        { type: Boolean },

    image: {
        type: String
    },
  
    role_id: {
        type: String,
        enum: [
           1,2
        ],
        default: 1
    },
},
    { timestamps: true }
)
let Customer = mongoose.model('customer', customerSchema);
// Customer.index({ email: 1, })

// module.exports = Customer
export default Customer