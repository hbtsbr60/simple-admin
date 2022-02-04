import { useMutation, useQuery } from "@apollo/client";
import { useCallback } from "react";
import { LOGIN } from "./mutations";
import { AUTH } from "./queries";

export const useLogin = () => {
  const [mutate, { loading, data, reset, error }] = useMutation(LOGIN, {
    onError: (e) => console.log(e),
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
};

export const useAuth = (): Auth => {
  const { data: { auth } = {} } = useQuery(AUTH);

  return auth || {};
};

export const useLogout = () => {};
