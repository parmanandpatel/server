import mongoose from 'mongoose';
const Schema = mongoose.Schema
const userClassSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
    },

    avlslots:[{ 
        startdatetime: Date,
        enddatetime: Date,
        slots:Number
    }]
},
    { timestamps: true }
)
let UserClass = mongoose.model('userclass', userClassSchema);
// Customer.index({ email: 1, })

export default UserClass