import mongoose, { Document, Schema } from 'mongoose';

interface User extends Document {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const userSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<User>('User', userSchema);

export default User;
