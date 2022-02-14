import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { INITIAL_PAGE, INITIAL_PAGE_SIZE } from "constants/pagination";
import { GET_PERMISSION_LIST } from "./queries/permission";

export const useGetPermissionList = () => {
  const [page, setPage] = useState(INITIAL_PAGE);
  const [pageSize, setPageSize] = useState(INITIAL_PAGE_SIZE);
  const { loading, data, error, refetch } = useQuery(GET_PERMISSION_LIST, {
    notifyOnNetworkStatusChange: true,
    variables: {
      page: {
        limit: pageSize,
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
    page,
    setPage,
    pageSize,
    setPageSize,
    rowCount: data?.permissions?.totalCount,
  };
};

export default {};
