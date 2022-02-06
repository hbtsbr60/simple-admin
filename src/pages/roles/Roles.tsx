import { useMemo } from "react";
import { Box, Stack, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useIntl } from "react-intl";

function Roles() {
  const t = useIntl();
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
      <Box display="flex" flexGrow={1} flexDirection="column">
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="flex-end">
            <Button>{t.formatMessage({ id: "button.delete" })}</Button>
            <Button>{t.formatMessage({ id: "button.create" })}</Button>
          </Stack>
          <DataGrid checkboxSelection autoHeight rows={[]} columns={columns} />
        </Stack>
      </Box>
    </Box>
  );
}

export default Roles;
