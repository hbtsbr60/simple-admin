import { useMutation, useQuery } from "@apollo/client";
import { useCallback } from "react";
import { LOGIN } from "./mutations";
import { AUTH } from "./queries";

export const useLogin = () => {
  const [mutate, { loading, data, reset, error }] = useMutation(LOGIN, {
    onError: () => null,
  });

  const login = useCallback(async (input) => {
    await mutate({
      variables: {
        input,
      },
      update: (cache, { data: { loginAsAdmin } }) => {
        if (loginAsAdmin.success) {
          const { accessToken, refreshToken } = loginAsAdmin;
          cache.writeQuery({
            query: AUTH,
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
    data: data?.loginAsAdmin,
  };
};

type Auth = {
  isLoggedIn?: boolean;
  accessToken?: string;
  refreshToken?: string;
  logout: () => null;
};

export const useAuth = (): Auth => {
  const { data, client } = useQuery(AUTH);

  const logout = useCallback(async () => {
    await client.resetStore();
  }, []);

  const auth = data?.auth || {};
  return { logout, ...auth };
};
