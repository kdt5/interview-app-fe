import { http, HttpResponse } from "msw";
import { UserBasicInfo } from "../models/User.model";

export const myUserInfo = http.get(
  `${import.meta.env.VITE_BACKEND_BASE_URL}/api/users/me`,
  () => {
    const myUserInfoData: UserBasicInfo = {
      email: "myUser@interview.it",
      nickname: "myUser",
    };

    return HttpResponse.json(myUserInfoData, { status: 200 });
  }
);
