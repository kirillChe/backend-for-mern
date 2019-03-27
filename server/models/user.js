import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import schema from './schemas/user';

const UserSchema = new mongoose.Schema(schema);

UserSchema.pre('save', async function () {
    const user = this;
    if (user.isModified('password')) {
        let salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});

UserSchema.methods.comparePassword = function (toCompare, done) {
    bcrypt.compare(toCompare, this.password, (err, isMatch) => {
        if (err) done(err);
        else done(err, isMatch);
    });
};

export default mongoose.model('User', UserSchema);