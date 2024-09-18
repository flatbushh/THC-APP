import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Card, CardContent, Grid, TextField, styled } from "@mui/material";
import axios from "axios";
import React from "react"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { number, object, ref, string } from "yup";

const registerSchema = object({
    email: string().email('Invalid email').required('Email is required'),
    password: string().min(5, 'Password must be at least 5 characters').required('Password is required'),
   
  });

type FormValues = { 
    email: string,
    password: string,
    
}

export const Login = () => {

  const {
    register, 
    handleSubmit, 
    formState: { errors }, 
  } = useForm<FormValues>({ resolver: yupResolver(registerSchema), mode: 'all', defaultValues: {email: "", password: ""} });

    const navigate = useNavigate();

    

  const goBack = () => {
    navigate(-1);
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


  const onSubmit = async (data: FormValues) => {
    await axios.post("http://localhost:4000/login", data)
      .then(() => {
        navigate("/");
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

return ( 
    <CustomCard>
        <CardContent>

          <form onSubmit={handleSubmit(onSubmit)}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}>
                <TextField
              sx={{ margin: "20px", width: "90%" }}
              label={"email"}
              type="text"
              {...register("email")}
              error={!!errors.email} 
              helperText={
                errors.email ? errors.email.message : ''
              }
            />

            <TextField
              sx={{ margin: "20px", width: "90%" }}
              label={"password"}
              type="password"
              {...register("password")}
              error={!!errors.email}
              helperText={
                errors.password ? errors.password.message : ""
              }
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
)
}