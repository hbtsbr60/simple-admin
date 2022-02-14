import { Add, Delete } from "@mui/icons-material";
import { Stack, Button } from "@mui/material";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { useIntl } from "react-intl";

function TableToolbar() {
  const t = useIntl();

  return (
    <GridToolbarContainer>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
        <Button size="small" startIcon={<Add />}>
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
