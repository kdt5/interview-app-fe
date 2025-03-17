import { useEffect, useState } from "react";
import { fetchMyUserData } from "../api/User.api";
import { UserBasicInfo } from "../models/User.model";

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

  return { me, updateNickname };
}
