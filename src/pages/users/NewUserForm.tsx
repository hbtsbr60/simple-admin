import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import languages from "constants/languages";
import { useIntl } from "react-intl";

function NewUserForm() {
  const t = useIntl();

  return (
    <Box maxWidth={800}>
      <Stack component="form" spacing={1} autoComplete="off">
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
          <TextField
            fullWidth
            id="firstName"
            variant="filled"
            label={t.formatMessage({ id: "label.firstName" })}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            id="lastName"
            variant="filled"
            label={t.formatMessage({ id: "label.lastName" })}
            InputLabelProps={{ shrink: true }}
          />
        </Stack>
        <TextField
          id="username"
          variant="filled"
          label={t.formatMessage({ id: "label.username" })}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          type="email"
          id="email"
          variant="filled"
          label={t.formatMessage({ id: "label.email" })}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          type="tel"
          id="phoneNumber"
          variant="filled"
          label={t.formatMessage({ id: "label.phoneNumber" })}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          type="password"
          id="password"
          variant="filled"
          label={t.formatMessage({ id: "label.password" })}
          InputLabelProps={{ shrink: true }}
        />
        <FormControl fullWidth>
          <InputLabel id="language">
            {t.formatMessage({ id: "label.language" })}
          </InputLabel>
          <Select
            variant="filled"
            labelId="language"
            value="en"
            id="language"
            label={t.formatMessage({
              id: "label.language",
            })}
          >
            {languages.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box>
          <Button variant="contained">
            {t.formatMessage({ id: "button.addUser" })}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default NewUserForm;
