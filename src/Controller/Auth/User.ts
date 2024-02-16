import { Request,Response } from "express"
import { userRegistrationRequestType } from "../../Lib/DataTypes/Requests/Auth/User"
import { userRegistrationResponseType } from "../../Lib/DataTypes/Responses/Auth/User"
import { Res } from "../../Lib/DataTypes/Common"
import userModel from "../../Model/User"
import jwt from "jsonwebtoken" 
import { genSalt, hash } from "bcrypt-ts";
const createToken = (data: Record<string, any>): string => {
	return jwt.sign(data, process.env.JWT_SECRET ?? "")
}

const userRegistration=async(req:Request<any,any,userRegistrationRequestType>,res:Response<Res<userRegistrationResponseType>>) =>{
	const {name,email,password}=req.body
	let userDetails
	try{
      userDetails= await userModel.findOne({email})
	  if(userDetails!==null){
		return res.status(400).send({status:false,message:"Already email exist in db!"})
	  }
	  const salt = await genSalt(10);
	  const hashedPassword = await hash(password, salt);
	  password=hashedPassword
      await userModel.create({req.body})
	}catch(error){

	}

}



const userControlller={
	userRegistration
}

export default userControlller