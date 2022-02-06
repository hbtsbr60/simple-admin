import { useMemo } from "react";
import { Box, Stack, Button } from "@mui/material";
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

export default Permissions;
