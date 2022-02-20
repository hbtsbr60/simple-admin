import { useMemo } from "react";
import { Box } from "@mui/material";
import {
  DataGridPro,
  GridColDef,
  GRID_CHECKBOX_SELECTION_COL_DEF,
} from "@mui/x-data-grid-pro";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { useGetPermissionList } from "api/permission";
import TableToolbar from "components/TableToolbar";

function Permissions() {
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
        field: "action",
        headerName: t.formatMessage({ id: "col.action" }),
        width: 150,
        hideable: false,
      },
      {
        field: "resource",
        headerName: t.formatMessage({ id: "col.resource" }),
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
    useGetPermissionList();

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
        initialState={{
          pinnedColumns: { left: [GRID_CHECKBOX_SELECTION_COL_DEF.field] },
        }}
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

export default Permissions;
