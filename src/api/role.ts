import { useQuery } from "@apollo/client";
import { useCallback, useMemo } from "react";
import { GET_ROLE_LIST } from "./queries/role";

export const useGetRoleList = () => {
  const { loading, data, error, refetch } = useQuery(GET_ROLE_LIST, {
    notifyOnNetworkStatusChange: true,
  });

  const handleRefresh = useCallback(() => refetch(), []);
  const rows = useMemo(() => data?.roles?.items || [], [data?.roles?.items]);

  return {
    loading,
    error,
    handleRefresh,
    rows,
  };
};

export default {};
