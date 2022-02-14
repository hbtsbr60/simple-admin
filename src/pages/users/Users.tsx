import { useMemo } from "react";
import { Box, Button, Stack } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridValueFormatterParams,
  GridToolbar,
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
  const { rows, loading, pageSize, setPageSize, page, setPage, rowCount } =
    useGetUserList();

  return (
    <Box display="flex">
      <Box display="flex" flexGrow={1} flexDirection="column">
        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <Button size="small">
            {t.formatMessage({ id: "button.delete" })}
          </Button>
          <Button size="small">
            {t.formatMessage({ id: "button.create" })}
          </Button>
        </Stack>
        <DataGrid
          disableColumnMenu
          checkboxSelection
          disableSelectionOnClick
          autoHeight
          pagination
          paginationMode="server"
          loading={loading}
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          page={page}
          onPageChange={setPage}
          rowCount={rowCount}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Box>
    </Box>
  );
}

export default Users;
