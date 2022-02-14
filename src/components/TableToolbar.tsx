import { Add, Delete } from "@mui/icons-material";
import { Stack, Button } from "@mui/material";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useIntl } from "react-intl";

function TableToolbar() {
  const t = useIntl();
  const { pathname } = useLocation();

  return (
    <GridToolbarContainer>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
        <Button
          size="small"
          startIcon={<Add />}
          component={Link}
          to={`${pathname}/create`}
        >
          {t.formatMessage({ id: "button.create" })}
        </Button>
        <Button color="error" size="small" startIcon={<Delete />}>
          {t.formatMessage({ id: "button.delete" })}
        </Button>
      </Stack>
    </GridToolbarContainer>
  );
}

export default TableToolbar;
