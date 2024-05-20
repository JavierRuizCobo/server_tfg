import { Schema, model, Document, Model } from 'mongoose';

interface UserInterface extends Document {
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  creationDate: Date;
  active : boolean;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});

export const User: Model<UserInterface> = model<UserInterface>('User', userSchema);
