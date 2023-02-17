import mongoose from 'mongoose';
const Schema = mongoose.Schema
const bookClassSchema = new Schema({
   
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    bookslot:[{ 
        startdatetime: Date,
        enddatetime: Date,
        slots:Number
    }]
},
    { timestamps: true }
)
let BookSlotClass = mongoose.model('bookslot', bookClassSchema);
// Customer.index({ email: 1, })

// module.exports = BookSlotClass
