import { useState, useEffect } from "react";
import { fetchUserStats } from "../api/User.api";
import { UserStats } from "../models/User.model";

interface UseUserReturn {
  userStats: UserStats | null;
  isLoading: boolean;
  error: Error | null;
  fetchStats: () => Promise<void>;
}

interface UseUserProps {
  isAuthenticated: boolean;
}

export function useUser({ isAuthenticated }: UseUserProps): UseUserReturn {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const stats = await fetchUserStats();
      setUserStats(stats);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("사용자 통계를 불러오는데 실패했습니다.")
      );
      setUserStats(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchStats();
    } else {
      setUserStats(null);
    }
  }, [isAuthenticated]);

  return { userStats, isLoading, error, fetchStats };
}
