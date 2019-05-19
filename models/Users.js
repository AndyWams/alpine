import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Users = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: "User"
    }
});

// export default mongoose.model('Users', Users);
module.exports = Users = mongoose.model('Users', Users)