import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FRONTEND_URLS } from "../constants/Urls";
import { logout, login } from "../api/Auth.api";
import {
  changeNickname,
  changePassword,
  fetchMyUserData,
} from "../api/User.api";
import { UserBasicInfo } from "../models/User.model";

interface UseAuthReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  me: UserBasicInfo | null;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;
  handleChangeNickname: (nickname: string) => Promise<void>;
  handleChangePassword: (
    oldPassword: string,
    newPassword: string
  ) => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [me, setMe] = useState<UserBasicInfo | null>(null);
  const navigate = useNavigate();

  const updateAuthState = useCallback(
    (
      authenticated: boolean,
      userData: UserBasicInfo | null = null,
      loading: boolean = false,
      errorMessage: string | null = null
    ): void => {
      setIsAuthenticated(authenticated);
      setMe(userData);
      setIsLoading(loading);
      setError(errorMessage);
    },
    []
  );

  const handleError = useCallback((err: unknown, message: string): void => {
    if (import.meta.env.DEV) {
      console.error(err);
    }
    setError(message);
  }, []);

  const checkAuthStatus = useCallback(async () => {
    try {
      setIsLoading(true);
      const userData = await fetchMyUserData();
      updateAuthState(true, userData, false);
    } catch (err: unknown) {
      console.error("인증 상태 확인 중 오류:", err);
      updateAuthState(false, null, false);
    } finally {
      setIsLoading(false);
    }
  }, [updateAuthState]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const handleLogin = useCallback(
    async (email: string, password: string): Promise<void> => {
      try {
        updateAuthState(false, null, true);
        const userData = await login({ email, password });

        if (userData) {
          updateAuthState(true, userData, false);
          navigate(FRONTEND_URLS.HOME);
        } else {
          updateAuthState(
            false,
            null,
            false,
            "로그인에 실패했습니다. 다시 시도해주세요."
          );
        }
      } catch (err: unknown) {
        handleError(
          err,
          "로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요."
        );
        updateAuthState(false, null, false);
      }
    },
    [navigate, updateAuthState, handleError]
  );

  const handleLogout = useCallback(async (): Promise<void> => {
    try {
      updateAuthState(false, null, true);
      const success = await logout();
      if (success) {
        updateAuthState(false, null, false);
        navigate(FRONTEND_URLS.LOGIN);
      }
    } catch (err: unknown) {
      handleError(err, "로그아웃에 실패했습니다.");
      updateAuthState(false, null, false);
    }
  }, [navigate, updateAuthState, handleError]);

  const handleChangeNickname = useCallback(
    async (nickname: string): Promise<void> => {
      try {
        updateAuthState(isAuthenticated, me, true);
        await changeNickname(nickname);
        if (me) {
          updateAuthState(isAuthenticated, { ...me, nickname }, false);
        }
      } catch (err: unknown) {
        handleError(err, "닉네임 변경에 실패했습니다.");
        updateAuthState(isAuthenticated, me, false);
      }
    },
    [isAuthenticated, me, updateAuthState, handleError]
  );

  const handleChangePassword = useCallback(
    async (oldPassword: string, newPassword: string): Promise<void> => {
      try {
        updateAuthState(isAuthenticated, me, true);
        await changePassword(oldPassword, newPassword);
        updateAuthState(isAuthenticated, me, false);
      } catch (err: unknown) {
        handleError(err, "비밀번호 변경에 실패했습니다.");
        updateAuthState(isAuthenticated, me, false);
      }
    },
    [isAuthenticated, me, updateAuthState, handleError]
  );

  return {
    isAuthenticated,
    isLoading,
    error,
    me,
    handleLogin,
    handleLogout,
    handleChangeNickname,
    handleChangePassword,
  };
}
