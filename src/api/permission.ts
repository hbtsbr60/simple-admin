import { useQuery } from "@apollo/client";
import { useCallback, useMemo, useState } from "react";
import { GET_PERMISSION_LIST } from "./queries/permission";

export const useGetPermissionList = () => {
  const [pageSize, setPageSize] = useState(100);
  const { loading, data, error, refetch } = useQuery(GET_PERMISSION_LIST, {
    notifyOnNetworkStatusChange: true,
    variables: {
      page: {
        size: pageSize,
      },
    },
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
    pageSize,
    setPageSize,
  };
};

export default {};
