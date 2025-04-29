import { http, HttpResponse } from "msw";
import { UserBasicInfo } from "../models/User.model";

export const myUserInfoData: UserBasicInfo = {
  email: "myUser@interview.it",
  nickname: "myUser",
  level: 10,
  answerCount: 10,
  positionId: 1,
};

export const userInfoData: UserBasicInfo = {
  email: "user@gmail.com",
  nickname: "user",
  level: 1,
  answerCount: 10,
  positionId: 1,
};

export const myUserInfo = http.get(
  `${import.meta.env.VITE_BACKEND_BASE_URL}/api/users/me`,
  () => {
    return HttpResponse.json(myUserInfoData, { status: 200 });
  }
);
