import mongoose from 'mongoose';
import { Password } from '../services/password';

// interface for the user model attributes

interface UserAttrs {
  email: string;
  password: string;
}

// infertace for the build function

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// infertace for the User Document

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// mongoose model

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// workaround to get type script support when creating documents

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

// mongoose User model

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
