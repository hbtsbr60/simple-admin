import { useMemo } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

function Roles() {
  const columns: GridColDef[] = useMemo(
    () => [
      { field: "name", headerName: "Name", width: 150 },
      {
        field: "permissionCount",
        headerName: "Permissions",
        width: 150,
      },
      { field: "description", headerName: "Description", flex: 1 },
    ],
    []
  );

  return (
    <Box display="flex">
      <Box display="flex" flexGrow={1}>
        <DataGrid autoHeight rows={[]} columns={columns} checkboxSelection />
      </Box>
    </Box>
  );
}

export default Roles;
