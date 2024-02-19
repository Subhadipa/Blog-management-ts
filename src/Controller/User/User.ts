import { Request, Response } from "express";
import { Res } from "../../Lib/DataTypes/Common";
import { userProfileType } from "../../Lib/DataTypes/Responses/User";
import userModel from "../../Model/User";

const getUserDetails = async (
  req: Request,
  res: Response<Res<userProfileType[]>>
) => {
  let userDetails;
  try {
    userDetails = await userModel.aggregate([
      {
        $match: {
          isDeleted: false,
        },
      },
      {
        $project: {
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
      },
    ]);
    if (userDetails.length > 0) {
      return res.status(200).send({
        status: false,
        message: "User details fetched successfully!",
        data: userDetails,
      });
    } else {
      return res.status(400).send({ status: false, message: "No data found!" });
    }
  } catch (error: any) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const userController = {
  getUserDetails,
};

export default userController;
