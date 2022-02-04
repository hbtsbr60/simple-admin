/* eslint-disable react/jsx-props-no-spreading */
import { useMemo } from "react";
import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormData = {
  userName: string;
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
    formState: { errors, touchedFields },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((values: FormData) => console.log(values));

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
                  error={touchedFields?.userName && !!errors.userName}
                  helperText={
                    touchedFields?.userName && errors.userName?.message
                  }
                  {...register("userName")}
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
                <Button type="submit" variant="contained">
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;
