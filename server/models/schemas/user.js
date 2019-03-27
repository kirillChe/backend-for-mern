import validate from 'mongoose-validator';

validate.extend(
    'isUnique',
    async function(val) {
        let count = await this.model('User').countDocuments({ email: val });
        return !count;
    },
    'Not unique'
);

const emailValidator = [
    validate({
        validator: 'isEmail'
    }),
    validate({
        validator: 'isUnique'
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
            'adept',
            'admin'
        ]
    },
    nickname: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
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
        default: Date.now,
        required: true
    }
};

export default user;