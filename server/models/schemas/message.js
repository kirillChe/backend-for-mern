import mongoose from "mongoose";

const message = {
    from: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    text: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        required: true
    }
};

export default message;