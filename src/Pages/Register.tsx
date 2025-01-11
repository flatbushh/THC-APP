import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Card as MuiCard,
  CardContent,
  Grid,
  TextField,
  styled,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { number, object, ref, string } from "yup";
import { useAlertContext } from "../context/AlertContext";
import { FormTextfield } from "../components/FormComponents/FormTextField";

const registerSchema = object({
  email: string().email("Invalid email").required("Email is required"),
  password: string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
  passwordMatch: string()
    .oneOf([ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

type FormValues = {
  //defining types of form fields
  email: string;
  password: string;
  passwordMatch: string;
};

const Card = styled(MuiCard)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100vw",
  borderRadius: "16px",
  padding: 25,
  flexWrap: "wrap",
});

export const Register = () => {
  const { showErrorAlert, showSuccessAlert } = useAlertContext();

  const {
    register, //allow to register individual inputs into the hook form
    handleSubmit, //to retrieve the value after clicking submit
    formState: { errors }, //displaying an error if any input is invalid
    control,
  } = useForm<FormValues>({
    resolver: yupResolver(registerSchema),
    mode: "all",
    defaultValues: { email: "", password: "", passwordMatch: "" },
  });

  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  const onSubmit = async (data: FormValues) => {
    await axios
      .post("http://localhost:4000/register", data)
      .then(() => {
        showSuccessAlert("Registered");
        // navigate("/");
        // console.log(data);
      })
      .catch((err) => {
        showErrorAlert(err.response.data ?? "Unexpected error");
        // console.log(err);
      });
  };
  //gdy konstruuje klasyczny promise to podaje w argumrntavh reoslve i reject czy w async jest on gdzies schowany pod spodem
  // const onSubmit = async (data: FormValues) => {
  //   try {
  //     await axios.post("http://localhost:4000/register", data);
  //     navigate("/");
  //     console.log(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <Card>
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
          {/* <TextField
            fullWidth
            label={"email"}
            type="text"
            {...register("email")}
            error={!!errors.email} //!! is used to convert value into a boolean, It ensures that any truthy value becomes true, and any falsy value becomes false.
            //errors.email will either be undefined (when there is no error) or contain an error object (when validation fails).
            //By using !!, you convert undefined to false and a defined error object to true
            // !!erros.email to to samo co Boolean(errors.email)
            helperText={errors.email ? errors.email.message : ""}
          /> */}
          <FormTextfield label="email" control={control} name="email" />

          <FormTextfield
            label="password"
            control={control}
            name="password"
            type="password"
          />

          <FormTextfield
            label="passwordMatch"
            control={control}
            name="passwordMatch"
            type="password"
          />
          <Button type="submit" variant="contained" color="success">
            Register
          </Button>
        </form>

        <Button onClick={goBack} variant="outlined">
          Back
        </Button>
      </CardContent>
    </Card>
  );
};
