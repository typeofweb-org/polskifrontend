import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  user: String,
  password: String
});

UserSchema.options.toJSON = UserSchema.options.toJSON || {};
UserSchema.options.toJSON.transform = (doc, ret) => {
  return ret;
};

const User = mongoose.model('user', UserSchema);

export async function getUser(user) {
  return await User.findOne({ user });
}
