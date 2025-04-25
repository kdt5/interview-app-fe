import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FRONTEND_URLS } from "../constants/Urls";
import { logout, refreshToken, login } from "../api/Auth.api";
import {
  changeNickname,
  changePassword,
  fetchMyUserData,
} from "../api/User.api";
import {
  REFRESH_TOKEN_LIFETIME,
  REFRESH_TOKEN_THRESHOLD,
} from "../constants/Auth";
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

function getCookieValue(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}

function hasAuthToken(): boolean {
  return !!getCookieValue("accessToken");
}

function getTokenExpiration(tokenName: string): number | null {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === tokenName) {
      try {
        const payload = JSON.parse(atob(value.split(".")[1]));
        return payload.exp * 1000;
      } catch {
        return null;
      }
    }
  }
  return null;
}

function shouldRefreshToken(): boolean {
  const refreshTokenExp = getTokenExpiration("refreshToken");
  if (!refreshTokenExp) return false;

  const now = Date.now();
  const tokenAge = now - (refreshTokenExp - REFRESH_TOKEN_LIFETIME);
  const usageRatio = tokenAge / REFRESH_TOKEN_LIFETIME;

  return usageRatio >= REFRESH_TOKEN_THRESHOLD;
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

  const refreshAuthToken = useCallback(async (): Promise<void> => {
    try {
      const success = await refreshToken();
      if (!success) {
        throw new Error("토큰 갱신 실패");
      }
    } catch (err: unknown) {
      handleError(err, "토큰 갱신 실패");
      await handleLogout();
    }
  }, [handleLogout, handleError]);

  const checkAuthStatus = useCallback(async () => {
    try {
      if (hasAuthToken()) {
        if (shouldRefreshToken()) {
          await refreshAuthToken();
        }

        const userData = await fetchMyUserData();
        updateAuthState(true, userData, false);
      } else {
        updateAuthState(false, null, false);
      }
    } catch (err: unknown) {
      handleError(err, "인증 상태 확인에 실패했습니다.");
      updateAuthState(false, null, false);
    }
  }, [refreshAuthToken, updateAuthState, handleError]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const handleLogin = useCallback(
    async (email: string, password: string): Promise<void> => {
      try {
        updateAuthState(false, null, true);
        const response = await login({ email, password });

        if (response) {
          const userData = await fetchMyUserData();
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
