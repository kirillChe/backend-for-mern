import mongoose from "mongoose";

const rating = {
    rater: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    rated: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    value: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    createDate: {
        type: Date,
        required: true
    }
};

export default rating;