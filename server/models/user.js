import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        trim: true,
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
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: String,
        trim: true
    },
    age: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
});


UserSchema.pre('save', function (next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err)
            return next(err);
        bcrypt.hash(user.password, salt, (hashErr, hash) => {
            if (hashErr) return next(hashErr);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (toCompare, done) {
    bcrypt.compare(toCompare, this.password, (err, isMatch) => {
        if (err) done(err);
        else done(err, isMatch);
    });
};

export default mongoose.model('User', UserSchema);