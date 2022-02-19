import { useMemo } from "react";
import { Box } from "@mui/material";
import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();
  const { loading, rows, pageSize, setPageSize, page, setPage, rowCount } =
    useGetRoleList();

  return (
    <Box display="flex">
      <DataGridPro
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
        onRowDoubleClick={(params) => {
          navigate(params.id as string);
        }}
      />
    </Box>
  );
}

export default Roles;
