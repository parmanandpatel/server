const mongoose = require('mongoose');
const Schema = mongoose.Schema
const userSchema = new Schema({
   name:String, 
    email: {
        type: String,
        unique: true,
        required: true,
    },

    password: {
        type: String,
        require:true
    },
   
    status:
        { type: Boolean },

},
    { timestamps: true }
)
let User = mongoose.model('user', userSchema);
// User.index({ email: 1, })

// module.exports = User
export default User