import { useMemo } from "react";
import { Box, Button, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

function Users() {
  const columns: GridColDef[] = useMemo(
    () => [
      { field: "firstName", headerName: "First name", width: 150 },
      { field: "lastLame", headerName: "Last name", width: 150 },
      { field: "username", headerName: "Username", width: 150 },
      { field: "email", headerName: "Email", width: 150 },
    ],
    []
  );

  return (
    <Box display="flex">
      <Box display="flex" flexGrow={1} flexDirection="column">
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="flex-end">
            <Button>Delete</Button>
            <Button>Create</Button>
          </Stack>
          <DataGrid checkboxSelection autoHeight rows={[]} columns={columns} />
        </Stack>
      </Box>
    </Box>
  );
}

export default Users;
