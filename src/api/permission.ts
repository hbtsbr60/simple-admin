import { useQuery } from "@apollo/client";
import { useCallback, useMemo } from "react";
import { GET_PERMISSION_LIST } from "./queries/permission";

export const useGetPermissionList = () => {
  const { loading, data, error, refetch } = useQuery(GET_PERMISSION_LIST, {
    notifyOnNetworkStatusChange: true,
  });

  const handleRefresh = useCallback(() => refetch(), []);
  const rows = useMemo(
    () => data?.permissions?.items || [],
    [data?.permissions?.items]
  );

  return {
    loading,
    error,
    handleRefresh,
    rows,
  };
};

export default {};
