import mongoose from 'mongoose';

import autoIncrement from 'mongoose-auto-increment';


const userSchema= mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    phone: String,
    gender:String
})

autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin,'user');

const user= mongoose.model('user',userSchema);

export default  user;