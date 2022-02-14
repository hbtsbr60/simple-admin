import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { INITIAL_PAGE, INITIAL_PAGE_SIZE } from "constants/pagination";
import { GET_USER_LIST } from "./queries/user";

export const useGetUserList = () => {
  const [page, setPage] = useState(INITIAL_PAGE);
  const [pageSize, setPageSize] = useState(INITIAL_PAGE_SIZE);
  const { loading, data, error, refetch } = useQuery(GET_USER_LIST, {
    notifyOnNetworkStatusChange: true,
    variables: {
      page: {
        size: pageSize,
      },
    },
  });

  const handleRefresh = useCallback(() => refetch(), []);
  const rows = useMemo(() => data?.users?.items || [], [data?.users?.items]);

  return {
    loading,
    error,
    handleRefresh,
    rows,
    page,
    setPage,
    pageSize,
    setPageSize,
    rowCount: data?.users?.totalCount,
  };
};

export default {};
