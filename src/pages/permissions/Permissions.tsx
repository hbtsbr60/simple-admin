import { useMemo } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

function Permissions() {
  const columns: GridColDef[] = useMemo(
    () => [
      { field: "name", headerName: "Name", width: 150 },
      { field: "action", headerName: "Action", width: 150 },
      { field: "resource", headerName: "Resource", width: 150 },
      { field: "description", headerName: "Description", flex: 1 },
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

export default Permissions;
