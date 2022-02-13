import { useMemo } from "react";
import { Box, Button, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useIntl } from "react-intl";
import { useGetUserList } from "api/user";

function Users() {
  const t = useIntl();
  const columns: GridColDef[] = useMemo(
    () => [
      { field: "firstName", headerName: "First name", width: 150 },
      { field: "lastLame", headerName: "Last name", width: 150 },
      { field: "username", headerName: "Username", width: 150 },
      { field: "email", headerName: "Email", width: 150 },
      { field: "createdAt", headerName: "Created on", width: 150 },
    ],
    []
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
