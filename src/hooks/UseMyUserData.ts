import { useQuery } from "@tanstack/react-query";
import { fetchMyUserData } from "../api/User.api";
import { UserBasicInfo } from "../models/User.model";

export function useMyUserData() {
  return useQuery<UserBasicInfo>({
    queryKey: ["myUserData"],
    queryFn: fetchMyUserData,
    staleTime: 1000 * 60 * 5,
  });
}
