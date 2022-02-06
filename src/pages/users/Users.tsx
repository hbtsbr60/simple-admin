import { useMemo } from "react";
import { Box } from "@mui/material";
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
      <Box display="flex" flexGrow={1}>
        <DataGrid checkboxSelection autoHeight rows={[]} columns={columns} />
      </Box>
    </Box>
  );
}

export default Users;
