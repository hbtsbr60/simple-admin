import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { INITIAL_PAGE, INITIAL_PAGE_SIZE } from "constants/pagination";
import { GET_ROLE_LIST } from "./queries/role";

export const useGetRoleList = () => {
  const [page, setPage] = useState(INITIAL_PAGE);
  const [pageSize, setPageSize] = useState(INITIAL_PAGE_SIZE);
  const { loading, data, error, refetch } = useQuery(GET_ROLE_LIST, {
    notifyOnNetworkStatusChange: true,
    variables: {
      page: {
        size: pageSize,
      },
    },
  });

  const handleRefresh = useCallback(() => refetch(), []);
  const rows = useMemo(() => data?.roles?.items || [], [data?.roles?.items]);

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
