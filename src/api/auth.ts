import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import { LOGIN } from "./mutations";

export const useLogin = () => {
  const [mutate, { loading, data }] = useMutation(LOGIN, {
    onError: (e) => console.log(e),
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
    response: data?.loginAsAdmin,
  };
};

export const useLogout = () => {};
