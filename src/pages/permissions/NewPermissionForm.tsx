import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import {
  DataGridPro,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  useGridApiRef,
} from "@mui/x-data-grid-pro";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Stack, TextField } from "@mui/material";
import { isAlphaNumeric } from "utils/validators";
import { Edit, Delete } from "@mui/icons-material";
import { nanoid } from "nanoid";

type FormData = {
  id?: string;
  name: string;
  action: string;
  resource: string;
  description: string;
};

function NewPermissionForm() {
  const apiRef = useGridApiRef();
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

  const [rows] = useState<Array<FormData>>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((values, e) => {
    if (values.id) {
      apiRef.current.updateRows([values]);
    } else {
      apiRef.current.updateRows([{ id: nanoid(), ...values }]);
    }
    reset({}, { keepValues: false });
    e?.target.reset();
  });

  const handleDelete = useCallback((id) => {
    apiRef.current.updateRows([{ id, _action: "delete" }]);
  }, []);

  const handleEdit = useCallback((values) => {
    reset(values);
  }, []);

  const getActions = useCallback(
    (params: GridRowParams) => [
      <GridActionsCellItem
        icon={<Edit />}
        label="Edit"
        onClick={() => handleEdit(params.row)}
      />,
      <GridActionsCellItem
        icon={<Delete />}
        label="Delete"
        onClick={() => handleDelete(params.id)}
      />,
    ],
    [handleDelete]
  );

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "name", headerName: "Name", flex: 1 },
      { field: "action", headerName: "Action", flex: 1 },
      { field: "resource", headerName: "Resource", flex: 1 },
      { field: "description", headerName: "Description", flex: 3 },
      {
        field: "actions",
        type: "actions",
        getActions,
        resizable: false,
      },
    ],
    [getActions]
  );

  return (
    <Stack flexGrow={1} direction={{ xs: "column", sm: "row" }} spacing={1}>
      <Box flexGrow={1}>
        <DataGridPro
          apiRef={apiRef}
          autoHeight
          columns={columns}
          rows={rows}
          initialState={{ pinnedColumns: { right: ["actions"] } }}
        />
      </Box>
      <Box
        component="form"
        autoComplete="off"
        maxWidth={500}
        onSubmit={onSubmit}
        flex={1}
      >
        <Stack spacing={1}>
          <TextField
            autoFocus
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
            helperText={
              touchedFields?.description && errors.description?.message
            }
          />
          <Box>
            <Button type="submit" variant="contained">
              {t.formatMessage({ id: "button.addPermission" })}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}

export default NewPermissionForm;
