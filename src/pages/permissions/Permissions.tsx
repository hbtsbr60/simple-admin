import { useMemo } from "react";
import { Box, Stack, Button } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useIntl } from "react-intl";
import { useGetPermissionList } from "api/permission";

function Permissions() {
  const t = useIntl();
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "name",
        headerName: t.formatMessage({ id: "col.name" }),
        width: 150,
      },
      {
        field: "action",
        headerName: t.formatMessage({ id: "col.action" }),
        width: 150,
      },
      {
        field: "resource",
        headerName: t.formatMessage({ id: "col.resource" }),
        width: 150,
      },
      {
        field: "description",
        headerName: t.formatMessage({ id: "col.description" }),
        flex: 1,
      },
    ],
    [t.locale]
  );

  const { loading, rows, pageSize, setPageSize, page, setPage } =
    useGetPermissionList();

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
          autoHeight
          pagination
          paginationMode="server"
          loading={loading}
          rows={rows}
          columns={columns}
          page={page}
          onPageChange={setPage}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Box>
    </Box>
  );
}

export default Permissions;
