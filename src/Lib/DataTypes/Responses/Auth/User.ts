import { userModelType } from "../../Models/User"

export type userRegistrationResponseType = userModelType;

export type userLoginResponseType = {
  token: string;
};
