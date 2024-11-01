import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  styled,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { number, object, ref, string } from "yup";
import { useAlertContext } from "../context/AlertContext";

const registerSchema = object({
  email: string().email("Invalid email").required("Email is required"),
  password: string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
});

type FormValues = {
  email: string;
  password: string;
};

const CustomCard = styled(Card)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100vw",
  borderRadius: "16px",
  padding: 25,
  flexWrap: "wrap",
});

export const Login = () => {
  // const [loginError, setLoginError] = useState<string | null>(null);
  // const [loggedIn, setLogggedIn] = useState<boolean>(false);

  const { showErrorAlert, showSuccessAlert } = useAlertContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(registerSchema),
    mode: "all",
    defaultValues: { email: "", password: "" },
  });

  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  const onSubmit = async (data: FormValues) => {
    await axios
      .post("http://localhost:4000/login", data)
      .then(() => {
        // setLogggedIn(true)
        showSuccessAlert("logged in");
        navigate("/dashboard");
        //navigate("/");
      })
      .catch((err) => {
        // if (err.response && err.response.data) { //skoro to jest async/await to czemu nie robimy tegow try/catch
        //   setLoginError(err.response.data);
        // } else {
        //   setLoginError("Unexpected error");
        // }
        // setLoginError(err.response.data ?? 'Unexpected error') -> krotsza wersja przykładu wyzej
        showErrorAlert(err.response.data ?? "Unexpected error");
        /*
        setLoginError(err.response.data ? err.response.data : 'Unexpected error')
        */
      });
  };

  return (
    <CustomCard>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "600px",
            border: "1px solid black",
            gap: "10px",
          }}
        >
          <TextField
            fullWidth
            label={"email"}
            type="text"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
          />

          <TextField
            fullWidth
            label={"password"}
            type="password"
            {...register("password")}
            error={!!errors.email}
            helperText={errors.password ? errors.password.message : ""}
          />

          <Button type="submit" variant="contained" color="success">
            Login
          </Button>
        </form>

        <Button onClick={goBack} variant="outlined">
          Back
        </Button>
      </CardContent>
    </CustomCard>
  );
};
