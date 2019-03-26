import validate from 'mongoose-validator';

const emailValidator = [
    validate({
        validator: 'isEmail'
    })
];

const user = {
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        enum: [
            'guru',
            'adept'
        ]
    },
    nickname: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: emailValidator
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true
    },
    createDate: {
        type: Date,
        required: true
    }
};

export default user;