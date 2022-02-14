import { useMemo } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useIntl } from "react-intl";
import { useGetRoleList } from "api/role";
import TableToolbar from "components/TableToolbar";

function Roles() {
  const t = useIntl();
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "name",
        headerName: t.formatMessage({ id: "col.name" }),
        width: 150,
        hideable: false,
      },
      {
        field: "description",
        headerName: t.formatMessage({ id: "col.description" }),
        flex: 1,
      },
    ],
    [t.locale]
  );

  const { loading, rows, pageSize, setPageSize, page, setPage, rowCount } =
    useGetRoleList();

  return (
    <Box display="flex">
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
        page={page}
        onPageChange={setPage}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        rowCount={rowCount}
        components={{
          Toolbar: TableToolbar,
        }}
      />
    </Box>
  );
}

export default Roles;
