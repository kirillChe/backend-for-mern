import mongoose from 'mongoose';
// import validate from 'mongoose-validator';
//
// const nameValidator = [
//     validate({
//         validator: 'isLength',
//         arguments: [3, 50],
//         message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
//     }),
//     validate({
//         validator: 'isAlphanumeric',
//         passIfEmpty: true,
//         message: 'Name should contain alpha-numeric characters only',
//     }),
// ];


const MessageSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    text: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    }
});

export default mongoose.model('Message', MessageSchema);