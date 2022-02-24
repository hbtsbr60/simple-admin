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
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import languages from "constants/languages";

type FormData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  language: string;
};

function NewUserForm() {
  const t = useIntl();
  const [users, setUsers] = useState<Array<FormData>>([]);

  const schema = useMemo(
    () =>
      yup
        .object({
          firstName: yup
            .string()
            .required(t.formatMessage({ id: "error.firstName.required" })),
          lastName: yup
            .string()
            .required(t.formatMessage({ id: "error.lastName.required" })),
          username: yup
            .string()
            .required(t.formatMessage({ id: "error.username.required" })),
          email: yup
            .string()
            .email(t.formatMessage({ id: "error.email" }))
            .required(t.formatMessage({ id: "error.email.required" })),
          password: yup
            .string()
            .min(8, t.formatMessage({ id: "error.password.min" }))
            .max(64, t.formatMessage({ id: "error.password.max" }))
            .required(t.formatMessage({ id: "error.password.required" })),
          phoneNumber: yup
            .string()
            .length(11, t.formatMessage({ id: "error.phoneNumber.len" })),
        })
        .required(),
    [t.locale]
  );

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((values) => setUsers([...users, values]));

  return (
    <Box maxWidth={800} component="form" autoComplete="off" onSubmit={onSubmit}>
      <Stack spacing={1}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
          <TextField
            fullWidth
            variant="filled"
            label={t.formatMessage({ id: "label.firstName" })}
            InputLabelProps={{ shrink: true }}
            {...register("firstName")}
            error={touchedFields.firstName && !!errors.firstName}
            helperText={touchedFields?.firstName && errors.firstName?.message}
          />
          <TextField
            fullWidth
            variant="filled"
            label={t.formatMessage({ id: "label.lastName" })}
            InputLabelProps={{ shrink: true }}
            {...register("lastName")}
            error={touchedFields.lastName && !!errors.lastName}
            helperText={touchedFields?.lastName && errors.lastName?.message}
          />
        </Stack>
        <TextField
          id="username"
          variant="filled"
          label={t.formatMessage({ id: "label.username" })}
          InputLabelProps={{ shrink: true }}
          {...register("username")}
          error={touchedFields.username && !!errors.username}
          helperText={touchedFields?.username && errors.username?.message}
        />
        <TextField
          type="email"
          id="email"
          variant="filled"
          label={t.formatMessage({ id: "label.email" })}
          InputLabelProps={{ shrink: true }}
          {...register("email")}
          error={touchedFields.email && !!errors.email}
          helperText={touchedFields?.email && errors.email?.message}
        />
        <TextField
          type="tel"
          id="phoneNumber"
          variant="filled"
          label={t.formatMessage({ id: "label.phoneNumber" })}
          InputLabelProps={{ shrink: true }}
          {...register("phoneNumber")}
          error={touchedFields.phoneNumber && !!errors.phoneNumber}
          helperText={touchedFields?.phoneNumber && errors.phoneNumber?.message}
        />
        <TextField
          type="password"
          id="password"
          variant="filled"
          label={t.formatMessage({ id: "label.password" })}
          InputLabelProps={{ shrink: true }}
          {...register("password")}
          error={touchedFields.password && !!errors.password}
          helperText={touchedFields?.password && errors.password?.message}
        />
        <FormControl fullWidth>
          <InputLabel id="language">
            {t.formatMessage({ id: "label.language" })}
          </InputLabel>
          <Select
            variant="filled"
            labelId="language"
            label={t.formatMessage({
              id: "label.language",
            })}
            defaultValue="en"
            {...register("language")}
            error={touchedFields.language && !!errors.language?.message}
          >
            {languages.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box>
          <Button type="submit" variant="contained">
            {t.formatMessage({ id: "button.addUser" })}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default NewUserForm;
