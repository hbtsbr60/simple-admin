/* eslint-disable react/jsx-props-no-spreading */
import { useMemo } from "react";
import {
  Container,
  Stack,
  TextField,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormData = {
  username: string;
  password: string;
};

function Login() {
  const schema = useMemo(
    () =>
      yup
        .object({
          userName: yup.string().required("Username is required"),
          password: yup.string().required("Password is required"),
        })
        .required(),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((values) => console.log(values));

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flex={1}>
      <Container maxWidth="xs">
        <Paper elevation={1}>
          <Box p={4}>
            <form onSubmit={onSubmit}>
              <Stack spacing={2}>
                <Box textAlign="center">
                  <Typography variant="h5">Simple Admin</Typography>
                </Box>
                <TextField
                  label="Username"
                  placeholder="Username"
                  error={touchedFields?.username && !!errors.username}
                  helperText={
                    touchedFields?.username && errors.username?.message
                  }
                  {...register("username")}
                />
                <TextField
                  label="Password"
                  placeholder="Password"
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
                  Login
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
