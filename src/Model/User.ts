import mongoose, { Document, Schema } from "mongoose";
import type {
  userModelType,
  commonModelType,
} from "../Lib/DataTypes/Models/User";
// import { compare } from "bcrypt-ts"
import bcrypt from "bcryptjs";
const userSchema = new Schema<userModelType<commonModelType & Document>>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    token: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
userSchema.methods.comparePasswords = function (
  userPassword: string
): Promise<boolean> {
  return bcrypt.compare(userPassword, this.password);
};
const userModel = mongoose.model<userModelType<commonModelType & Document>>(
  "User",
  userSchema
);
export default userModel;
