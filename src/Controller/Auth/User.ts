import { Request, Response } from "express";
import {
  userLoginRequestType,
  userRegistrationRequestType,
} from "../../Lib/DataTypes/Requests/Auth/User";
import {
  userLoginResponseType,
  userRegistrationResponseType,
} from "../../Lib/DataTypes/Responses/Auth/User";
import { Res } from "../../Lib/DataTypes/Common";
import userModel from "../../Model/User";
import jwt from "jsonwebtoken";
// import { genSalt, hash } from "bcrypt-ts"
import bcrypt from "bcryptjs";
const createToken = (data: Record<string, any>): string => {
  return jwt.sign(data, process.env.JWT_SECRET ?? "");
};

const userRegistration = async (
  req: Request<any, any, userRegistrationRequestType>,
  res: Response<Res<userRegistrationResponseType>>
) => {
  const { email, password } = req.body;
  let userDetails;
  try {
    userDetails = await userModel.findOne({
      email: email,
      isDeleted: false,
    });
    if (userDetails !== null) {
      return res
        .status(400)
        .send({ status: false, message: "Already email exist in db!" });
    }
    // const bcrypt = await import("bcrypt-ts");
    // const { genSalt, hash } = bcrypt.default;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // console.log(hashedPassword)
    const userData = await userModel.create({
      ...req.body,
      password: hashedPassword,
      token: createToken({ ...req.body, password: hashedPassword }),
    });

    return res.status(200).send({
      status: true,
      message: "User registered successfully!",
      data: userData,
    });
  } catch (error: any) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
const userLogin = async (
  req: Request<any, any, userLoginRequestType>,
  res: Response<Res<userLoginResponseType>>
) => {
  const { email, password } = req.body;
  console.log(email);
  let userDetails;
  try {
    userDetails = await userModel.findOne({ email, isDeleted: false });

    if (userDetails && userDetails.comparePasswords) {
      let isCorrectPassword = await userDetails.comparePasswords(password);
      if (isCorrectPassword) {
        return res.status(200).send({
          status: true,
          message: `${userDetails.name} logged in successfully!`,
          data: { token: userDetails.token },
        });
      } else {
        return res
          .status(400)
          .send({ status: false, message: "Invalid credentials!" });
      }
    } else {
      return res.status(400).send({ status: false, message: "User not found" });
    }
  } catch (error: any) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
const userControlller = {
  userRegistration,
  userLogin,
};

export default userControlller;
