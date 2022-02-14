import { useQuery } from "@apollo/client";
import { useCallback, useMemo, useState } from "react";
import { GET_USER_LIST } from "./queries/user";

export const useGetUserList = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
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
  };
};

export default {};
