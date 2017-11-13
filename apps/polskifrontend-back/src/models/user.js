import mongoose from 'mongoose';

const { Schema } = mongoose;
const UserSchema = new Schema({
  user: String,
  password: String
});

UserSchema.options.toJSON = UserSchema.options.toJSON || {};
UserSchema.options.toJSON.transform = (doc, ret) => ret;

const User = mongoose.model('user', UserSchema);

export async function getUser(user) {
  const foundUser = await User.findOne({ user });
  return foundUser;
}
