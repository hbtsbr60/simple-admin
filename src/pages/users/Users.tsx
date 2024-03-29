import { useMemo } from "react";
import { Box } from "@mui/material";
import {
  DataGridPro,
  GridCellValue,
  GridColDef,
  GridValueFormatterParams,
  GRID_CHECKBOX_SELECTION_COL_DEF,
} from "@mui/x-data-grid-pro";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { useGetUserList } from "api/user";
import TableToolbar from "components/TableToolbar";

function Users() {
  const t = useIntl();
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "firstName",
        headerName: t.formatMessage({ id: "col.firstname" }),
        width: 150,
        hideable: false,
      },
      {
        field: "lastLame",
        headerName: t.formatMessage({ id: "col.lastname" }),
        width: 150,
      },
      {
        field: "username",
        headerName: t.formatMessage({ id: "col.username" }),
        width: 150,
        hideable: false,
      },
      {
        field: "email",
        headerName: t.formatMessage({ id: "col.email" }),
        width: 150,
      },
      {
        field: "createdAt",
        type: "dateTime",
        headerName: t.formatMessage({ id: "col.createdOn" }),
        width: 150,
        valueFormatter: (params: GridValueFormatterParams) =>
          t.formatDate(params.value as string, {
            dateStyle: "medium",
          }),
        valueGetter: ({ value }) => new Date(value as string),
        valueParser: (value: GridCellValue) => new Date(value as string),
      },
    ],
    [t.locale]
  );
  const navigate = useNavigate();
  const { rows, loading, pageSize, setPageSize, page, setPage, rowCount } =
    useGetUserList();

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
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        page={page}
        onPageChange={setPage}
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

export default Users;
