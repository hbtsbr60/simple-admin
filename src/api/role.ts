import { useQuery } from "@apollo/client";
import { useCallback, useMemo, useState } from "react";
import { GET_ROLE_LIST } from "./queries/role";

export const useGetRoleList = () => {
  const [pageSize, setPageSize] = useState(100);
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
    pageSize,
    setPageSize,
  };
};

export default {};
