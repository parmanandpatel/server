import mongoose from 'mongoose';
const Schema = mongoose.Schema
const categorySchema = new Schema({
    title: {
        type: String
    },
 
},
    { timestamps: true }
)
let Category = mongoose.model('category', categorySchema);
// Customer.index({ email: 1, })

export default Category