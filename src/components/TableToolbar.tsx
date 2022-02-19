import { Add, Delete } from "@mui/icons-material";
import { Stack, Button } from "@mui/material";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid-pro";
import { Link } from "react-router-dom";
import { useIntl } from "react-intl";
import routeNameMap from "constants/routeNameMap";

function TableToolbar() {
  const t = useIntl();

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
          to={routeNameMap.NEW}
        >
          {t.formatMessage({ id: "button.add" })}
        </Button>
        <Button color="error" size="small" startIcon={<Delete />}>
          {t.formatMessage({ id: "button.delete" })}
        </Button>
      </Stack>
    </GridToolbarContainer>
  );
}

export default TableToolbar;
