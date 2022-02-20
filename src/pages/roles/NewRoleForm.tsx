import { Box, Button, Stack, TextField } from "@mui/material";
import { useIntl } from "react-intl";

function NewRoleForm() {
  const t = useIntl();

  return (
    <Box maxWidth={800}>
      <Stack component="form" spacing={1} autoComplete="off">
        <TextField
          id="name"
          variant="filled"
          label={t.formatMessage({ id: "label.name" })}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          multiline
          rows={4}
          id="description"
          variant="filled"
          label={t.formatMessage({ id: "label.description" })}
          InputLabelProps={{ shrink: true }}
        />
        <Box>
          <Button variant="contained">
            {t.formatMessage({ id: "button.addRole" })}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default NewRoleForm;
