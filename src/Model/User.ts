import mongoose,{ Document,Schema } from "mongoose";
import type {userModelType,commonModelType} from "../Lib/DataTypes/Models/User"
import { compare } from "bcrypt-ts";
const userSchema=new Schema<userModelType<commonModelType & Document>>(
	{
     name:{
		type:String
	 },
	 email:{
		type:String
	 },
	 password:{
		type:String
	 },
	 token:{
        type:String
	 },
	 isDeleted:{
      type:Boolean
	 }
},
{timestamps:true}
)
userSchema.methods.comparePasswords=function(userPassword:string):Promise<boolean> {
	return compare(userPassword,this.password)
}
const userModel=mongoose.model<userModelType<commonModelType & Document>>("User",userSchema)
export default userModel