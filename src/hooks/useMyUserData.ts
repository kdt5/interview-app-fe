import { useQuery } from "@tanstack/react-query";
import { fetchMyUserData } from "../api/User.api";

export const useMyUserData = () => {
  return useQuery({
    queryKey: ["myUserData"],
    queryFn: fetchMyUserData,
    staleTime: 1000 * 60 * 5,
  });
};
