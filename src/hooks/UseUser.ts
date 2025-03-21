import { useEffect, useState } from "react";
import { fetchMyUserData } from "../api/User.api";
import { UserBasicInfo } from "../models/User.model";
import { logout as logoutApi } from "../api/Auth.api";

export function useUser() {
  const [me, setMe] = useState<UserBasicInfo | null>(null);

  useEffect(() => {
    fetchMyUserData()
      .then((data) => {
        setMe(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const updateNickname = (nickname: string) => {
    setMe((prev) => {
      if (prev) {
        return { ...prev, nickname };
      }
      return prev;
    });
  };

  const logout = async () => {
    try {
      const success = await logoutApi();
      if (success) {
        setMe(null);
      }
    } catch (error) {
      console.log("로그아웃 실패", error);
    }
  };

  return { me, updateNickname, logout };
}
