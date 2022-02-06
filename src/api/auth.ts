import {
  ApolloError,
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client";
import { useCallback } from "react";
import { User } from "types";
import { LOGIN } from "./mutations";
import { AUTH_STATE, GET_ME } from "./queries";

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
    data: data?.loginAsAdmin,
  };
};

type Auth = {
  isLoggedIn?: boolean;
  accessToken?: string;
  refreshToken?: string;
  loading: boolean;
  logout: () => void;
  getIdentity: () => void;
  handleRefresh: () => void;
  error?: ApolloError;
  user?: User;
};

export const useAuth = (): Auth => {
  const { data, client } = useQuery(AUTH_STATE);
  const [getIdentity, { data: identity, loading, refetch, error }] =
    useLazyQuery(GET_ME, { notifyOnNetworkStatusChange: true });

  const logout = useCallback(async () => {
    await client.resetStore();
  }, []);

  const handleRefresh = useCallback(() => refetch(), []);

  const auth = data?.auth;
  const user = identity?.me?.user as User;
  return {
    logout,
    loading,
    error,
    user,
    handleRefresh,
    getIdentity,
    isLoggedIn: auth?.isLoggedIn,
    accessToken: auth?.accessToken,
    refreshToken: auth?.refreshToken,
  };
};
