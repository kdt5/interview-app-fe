import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FRONTEND_URLS } from "../constants/Urls";
import {
  logout,
  signUp,
  checkEmailExists,
  checkNicknameExists,
  recoverPassword,
  resetPassword,
  refreshToken,
  login,
} from "../api/Auth.api";
import {
  changeNickname,
  changePassword,
  fetchMyUserData,
} from "../api/User.api";
import {
  REFRESH_TOKEN_LIFETIME,
  REFRESH_TOKEN_THRESHOLD,
} from "../constants/Auth";
import { SignUpData, UserBasicInfo } from "../models/User.model";

interface UseAuthReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  me: UserBasicInfo | null;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleSignUp: (userData: SignUpData) => Promise<void>;
  handleLogout: () => Promise<void>;
  checkEmail: (email: string) => Promise<boolean>;
  checkNickname: (nickname: string) => Promise<boolean>;
  handleChangeNickname: (nickname: string) => Promise<void>;
  handleChangePassword: (
    oldPassword: string,
    newPassword: string
  ) => Promise<void>;
  handleRecoverPassword: (email: string) => Promise<void>;
  handleResetPassword: (
    token: string,
    email: string,
    newPassword: string
  ) => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [me, setMe] = useState<UserBasicInfo | null>(null);
  const navigate = useNavigate();

  const getCookieValue = useCallback((name: string): string | null => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? match[2] : null;
  }, []);

  const hasAuthToken = useCallback((): boolean => {
    return !!getCookieValue("accessToken");
  }, [getCookieValue]);

  const getTokenExpiration = useCallback((tokenName: string): number | null => {
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
  }, []);

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

  const shouldRefreshToken = useCallback((): boolean => {
    const refreshTokenExp = getTokenExpiration("refreshToken");
    if (!refreshTokenExp) return false;

    const now = Date.now();
    const tokenAge = now - (refreshTokenExp - REFRESH_TOKEN_LIFETIME);
    const usageRatio = tokenAge / REFRESH_TOKEN_LIFETIME;

    return usageRatio >= REFRESH_TOKEN_THRESHOLD;
  }, [getTokenExpiration]);

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
  }, [
    hasAuthToken,
    shouldRefreshToken,
    refreshAuthToken,
    updateAuthState,
    handleError,
  ]);

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

  const handleSignUp = useCallback(
    async (userData: SignUpData): Promise<void> => {
      try {
        updateAuthState(false, null, true);
        const success = await signUp(userData);
        if (success) {
          updateAuthState(false, null, false);
          navigate(FRONTEND_URLS.LOGIN);
        }
      } catch (err: unknown) {
        handleError(err, "회원가입에 실패했습니다. 다시 시도해주세요.");
        updateAuthState(false, null, false);
      }
    },
    [navigate, updateAuthState, handleError]
  );

  async function checkEmail(email: string): Promise<boolean> {
    try {
      return await checkEmailExists(email);
    } catch (err: unknown) {
      handleError(err, "이메일 확인에 실패했습니다.");
      return false;
    }
  }

  async function checkNickname(nickname: string): Promise<boolean> {
    try {
      return await checkNicknameExists(nickname);
    } catch (err: unknown) {
      handleError(err, "닉네임 확인에 실패했습니다.");
      return false;
    }
  }

  async function handleRecoverPassword(email: string): Promise<void> {
    try {
      updateAuthState(false, null, true);
      await recoverPassword(email);
    } catch (err: unknown) {
      handleError(err, "비밀번호 복구 이메일 전송에 실패했습니다.");
      updateAuthState(false, null, false);
    }
  }

  async function handleResetPassword(
    token: string,
    email: string,
    newPassword: string
  ): Promise<void> {
    try {
      updateAuthState(false, null, true);
      const success = await resetPassword(token, email, newPassword);
      if (success) {
        updateAuthState(false, null, false);
        navigate(FRONTEND_URLS.LOGIN);
      }
    } catch (err: unknown) {
      handleError(err, "비밀번호 재설정에 실패했습니다.");
      updateAuthState(false, null, false);
    }
  }

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
    handleSignUp,
    handleLogout,
    checkEmail,
    checkNickname,
    handleChangeNickname,
    handleChangePassword,
    handleRecoverPassword,
    handleResetPassword,
  };
}
