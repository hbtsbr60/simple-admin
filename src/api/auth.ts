import { useMutation, useQuery } from "@apollo/client";
import { useCallback } from "react";
import { LOGIN } from "./mutations";
import { AUTH, GET_ME } from "./queries";

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

export const useGetMe = () => {
  const { data, loading, refetch, error } = useQuery(GET_ME, {
    notifyOnNetworkStatusChange: true,
  });

  const onRefresh = useCallback(() => refetch(), []);

  return {
    loading,
    onRefresh,
    user: data?.me?.user,
    message: data?.message,
    success: data?.success,
    error,
  };
};
