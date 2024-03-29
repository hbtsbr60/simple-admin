import { useCallback } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { User } from "types";
import { AUTH_STATE, GET_ME, LOGIN, LOGOUT } from "./queries/auth";

export const useLogin = () => {
  const [mutate, { loading, data, reset, error }] = useMutation(LOGIN, {
    onError: () => null,
  });

  const login = useCallback(async (input) => {
    await mutate({
      variables: {
        input,
      },
      update: (cache, { data: { loginToAdmin } }) => {
        if (loginToAdmin.success) {
          const { accessToken, refreshToken } = loginToAdmin;
          cache.writeQuery({
            query: AUTH_STATE,
            data: {
              auth: {
                isLoggedIn: true,
                accessToken,
                refreshToken,
              },
            },
          });
        }
      },
    });
  }, []);

  return {
    login,
    loading,
    reset,
    error,
    data: data?.loginToAdmin,
  };
};

export const useLogout = () => {
  const [mutate, { client }] = useMutation(LOGOUT, {
    onError: () => null,
  });

  const logout = useCallback(() => {
    mutate();
    client.resetStore();
  }, []);

  return {
    logout,
  };
};

export const useGetMe = () => {
  const { data, loading, refetch, error } = useQuery(GET_ME, {
    notifyOnNetworkStatusChange: true,
  });

  const handleRefresh = useCallback(() => refetch(), []);
  const user = data?.me?.user as User;
  return {
    loading,
    error,
    user,
    handleRefresh,
  };
};

type Auth = {
  isLoggedIn?: boolean;
  accessToken?: string;
  refreshToken?: string;
};
export const useAuthState = (): Auth => {
  const { data } = useQuery(AUTH_STATE);

  const auth = data?.auth;
  return {
    isLoggedIn: auth?.isLoggedIn,
    accessToken: auth?.accessToken,
    refreshToken: auth?.refreshToken,
  };
};
