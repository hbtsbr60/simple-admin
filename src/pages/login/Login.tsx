/* eslint-disable react/jsx-props-no-spreading */
import { useMemo } from "react";
import {
  Container,
  Stack,
  TextField,
  Typography,
  Box,
  Paper,
  Alert,
  AlertTitle,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Navigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useIntl } from "react-intl";
import { useLogin } from "api/auth";
import routesMap from "pages/routesMap";

type FormData = {
  username: string;
  password: string;
};

function Login() {
  const t = useIntl();
  const schema = useMemo(
    () =>
      yup
        .object({
          username: yup.string().required(
            t.formatMessage({
              id: "login.validate.username",
            })
          ),
          password: yup.string().required(
            t.formatMessage({
              id: "login.validate.password",
            })
          ),
        })
        .required(),
    [t.locale]
  );

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { login, error, reset, data } = useLogin();
  const { state }: any = useLocation();

  const onSubmit = handleSubmit(async (values) => {
    await login(values);
  });

  if (data?.success) {
    return <Navigate to={state?.from?.pathname || routesMap.HOME} replace />;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flex={1}>
      <Container maxWidth="xs">
        <Paper elevation={1}>
          <Box p={4}>
            <form onSubmit={onSubmit}>
              <Stack spacing={2}>
                <Box textAlign="center">
                  <Typography variant="h5">
                    {t.formatMessage({ id: "app.name" })}
                  </Typography>
                </Box>
                {data && !data.success && (
                  <Alert severity="error" onClose={reset}>
                    {data?.message}
                  </Alert>
                )}
                {!!error && (
                  <Alert severity="error" onClose={reset}>
                    <AlertTitle>{error.name}</AlertTitle>
                    {error.message}
                  </Alert>
                )}
                <TextField
                  label={t.formatMessage({ id: "login.input.username" })}
                  placeholder={t.formatMessage({
                    id: "login.input.username",
                  })}
                  error={touchedFields?.username && !!errors.username}
                  helperText={
                    touchedFields?.username && errors.username?.message
                  }
                  {...register("username")}
                />
                <TextField
                  label={t.formatMessage({ id: "login.input.password" })}
                  placeholder={t.formatMessage({
                    id: "login.input.password",
                  })}
                  type="password"
                  autoComplete="password"
                  error={touchedFields?.password && !!errors.password}
                  helperText={
                    touchedFields?.password && errors.password?.message
                  }
                  {...register("password")}
                />
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  {t.formatMessage({ id: "button.submit" })}
                </LoadingButton>
              </Stack>
            </form>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;
