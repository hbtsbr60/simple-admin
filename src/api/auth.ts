import { useMutation, useQuery } from "@apollo/client";
import { useCallback } from "react";
import { accessTokenVar, refreshTokenVar } from "config/client";
import { LOGIN } from "./mutations";
import { AUTH } from "./queries";

export const useLogin = () => {
  const [mutate, { loading, data, reset, error }] = useMutation(LOGIN, {
    onError: (e) => console.log(e),
    onCompleted: ({ loginAsAdmin }) => {
      if (loginAsAdmin.success) {
        accessTokenVar(loginAsAdmin.accessToken);
        refreshTokenVar(loginAsAdmin.refreshToken);
      }
    },
  });

  const login = useCallback(async (input) => {
    await mutate({
      variables: {
        input,
      },
    });
  }, []);

  return {
    login,
    loading,
    reset,
    error,
    data: data?.loginAsAdmin,
  };
};

type Auth = {
  isLoggedIn?: boolean;
  accessToken?: string;
  refreshToken?: string;
};

export const useAuth = (): Auth => {
  const { data = {} } = useQuery(AUTH);

  return data;
};

export const useLogout = () => {};
