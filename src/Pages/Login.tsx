import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, CardContent, TextField, styled } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { useAlertContext } from "../context/AlertContext";
import { useAuthContext } from "../context/AuthContext";
import { useToken } from "../hooks/useToken";

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
  const { setUser } = useAuthContext(); // Access setUser to update the context

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

  const { setToken } = useToken();

  const onSubmit = async (data: FormValues) => {
    await axios
      .post("http://localhost:4000/login", data)
      .then((response) => {
        const user = response.data.user;
        const token = response.data.token;

        setToken(token); //The token from the response is saved using useToken. ustawiam Token na ten otrzymany z bazy
        setUser(user); //setUser updates the AuthContext with the logged-in user’s details.
        localStorage.setItem("userId", user.id); // After a successful login, the user's id is saved in localStorage
        localStorage.setItem("userRole", user.role);
        showSuccessAlert("Logged in successfully");

        if (user.role === "ADMIN") {
          navigate("/");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        showErrorAlert(
          (err.response?.data?.message as string) ?? "Unexpected error"
        );
      });
  };

  //The API responds with user and token.
  // userId (from the user object) is stored in localStorage.
  // token is saved via the useToken hook.
  // The user object is passed to AuthContext via setUser.
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
