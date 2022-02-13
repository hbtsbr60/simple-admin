import { useMemo } from "react";
import { Box, Button, Stack } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { useIntl } from "react-intl";
import { useGetUserList } from "api/user";

function Users() {
  const t = useIntl();
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "firstName",
        headerName: t.formatMessage({ id: "col.firstname" }),
        width: 150,
      },
      {
        field: "lastLame",
        headerName: t.formatMessage({ id: "col.lastname" }),
        width: 150,
      },
      {
        field: "username",
        headerName: t.formatMessage({ id: "col.username" }),
        width: 150,
      },
      {
        field: "email",
        headerName: t.formatMessage({ id: "col.email" }),
        width: 150,
      },
      {
        field: "createdAt",
        type: "dateTime",
        headerName: t.formatMessage({ id: "col.createdOn" }),
        width: 150,
        valueFormatter: (params: GridValueFormatterParams) =>
          t.formatDate(params.value as string, {
            dateStyle: "medium",
          }),
        valueGetter: ({ value }) => value && new Date(value as string),
      },
    ],
    [t.locale]
  );
  const { rows, loading } = useGetUserList();

  return (
    <Box display="flex">
      <Box display="flex" flexGrow={1} flexDirection="column">
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="flex-end">
            <Button>{t.formatMessage({ id: "button.delete" })}</Button>
            <Button>{t.formatMessage({ id: "button.create" })}</Button>
          </Stack>
          <DataGrid
            disableColumnMenu
            checkboxSelection
            autoHeight
            rows={rows}
            columns={columns}
            loading={loading}
          />
        </Stack>
      </Box>
    </Box>
  );
}

export default Users;
