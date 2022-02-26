import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Stack, TextField } from "@mui/material";
import { isAlphaNumeric } from "utils/validators";

type FormData = {
  name: string;
  action: string;
  resource: string;
  description: string;
};

function NewPermissionForm() {
  const t = useIntl();
  const schema = useMemo(
    () =>
      yup
        .object({
          name: yup
            .string()
            .required(t.formatMessage({ id: "error.name.required" }))
            .max(64, t.formatMessage({ id: "error.text.tooLong" }))
            .test(
              "isAlphaNumeric",
              t.formatMessage(
                { id: "error.text.alphaNumeric" },
                { field: "Name" }
              ),
              isAlphaNumeric
            ),
          action: yup
            .string()
            .required(t.formatMessage({ id: "error.action.required" }))
            .max(64, t.formatMessage({ id: "error.text.tooLong" })),
          resource: yup
            .string()
            .required(t.formatMessage({ id: "error.resource.required" }))
            .max(64, t.formatMessage({ id: "error.text.tooLong" })),
          description: yup
            .string()
            .max(240, t.formatMessage({ id: "error.text.tooLong" })),
        })
        .required(),
    [t.locale]
  );

  const [permissions, setPermissions] = useState<Array<FormData>>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((values) => {
    setPermissions([...permissions, values]);
    reset();
  });

  return (
    <Box component="form" autoComplete="off" maxWidth={600} onSubmit={onSubmit}>
      <Stack spacing={1}>
        <TextField
          id="name"
          variant="filled"
          label={t.formatMessage({ id: "label.name" })}
          InputLabelProps={{ shrink: true }}
          {...register("name")}
          error={touchedFields.name && !!errors.name}
          helperText={touchedFields?.name && errors.name?.message}
        />
        <TextField
          id="action"
          variant="filled"
          label={t.formatMessage({ id: "label.action" })}
          InputLabelProps={{ shrink: true }}
          placeholder={t.formatMessage({ id: "placeholder.action" })}
          {...register("action")}
          error={touchedFields.action && !!errors.action}
          helperText={touchedFields?.action && errors.action?.message}
        />
        <TextField
          id="resource"
          variant="filled"
          label={t.formatMessage({ id: "label.resource" })}
          InputLabelProps={{ shrink: true }}
          placeholder={t.formatMessage({ id: "placeholder.resource" })}
          {...register("resource")}
          error={touchedFields.resource && !!errors.resource}
          helperText={touchedFields?.resource && errors.resource?.message}
        />
        <TextField
          multiline
          rows={4}
          id="description"
          variant="filled"
          label={t.formatMessage({ id: "label.description" })}
          InputLabelProps={{ shrink: true }}
          {...register("description")}
          error={touchedFields.description && !!errors.description}
          helperText={touchedFields?.description && errors.description?.message}
        />
        <Box>
          <Button type="submit" variant="contained">
            {t.formatMessage({ id: "button.addPermission" })}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default NewPermissionForm;
