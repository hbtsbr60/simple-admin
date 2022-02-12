import { useQuery } from "@apollo/client";
import { useCallback, useMemo } from "react";
import { GET_USER_LIST } from "./queries/user";

export const useGetUserList = () => {
  const { loading, data, error, refetch } = useQuery(GET_USER_LIST, {
    notifyOnNetworkStatusChange: true,
  });

  const handleRefresh = useCallback(() => refetch(), []);
  const items = useMemo(() => data?.users?.items || [], [data?.users?.items]);

  return {
    loading,
    error,
    handleRefresh,
    items,
  };
};

export default {};
