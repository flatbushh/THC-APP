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
    passwordMatch: string().oneOf([ref('password')], 'Passwords must match').required('Please confirm your password'),  
  });

type FormValues = { //defining types of form fields
    email: string,
    password: string,
    passwordMatch: string
}

export const Register = () => {

  const {
    register, //allow to register individual inputs into the hook form
    handleSubmit, //to retrieve the value after clicking submit
    formState: { errors }, //displaying an error if any input is invalid 
  } = useForm<FormValues>({ resolver: yupResolver(registerSchema), mode: 'all', defaultValues: {email: "", password: "", passwordMatch: ""} });

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
    await axios.post("http://localhost:4000/register", data)
      .then(() => {
        navigate("/");
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
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
              error={!!errors.email} //!! is used to convert value into a boolean, It ensures that any truthy value becomes true, and any falsy value becomes false.
              //errors.email will either be undefined (when there is no error) or contain an error object (when validation fails).
              //By using !!, you convert undefined to false and a defined error object to true
              // !!erros.email to to samo co Boolean(errors.email)
              helperText={
                errors.email ? errors.email.message : ''
              }
            />

            <TextField
              sx={{ margin: "20px", width: "90%" }}
              label={"password"}
              type="password"
              {...register("password" /*{validate: (value)=>value.includes("@")}*/)}
              error={!!errors.email}
              helperText={
                errors.password ? errors.password.message : ""
              }
            />

            <TextField
              sx={{ margin: "20px", width: "90%" }}
              label={"passwordMatch"}
              type="password"
              {...register("passwordMatch")}
              error={!!errors.email}
              helperText={
                errors.passwordMatch ? errors.passwordMatch.message : ""
              }
            />
            <Button type="submit" variant="contained" color="success">
                Register
              </Button>
            </form>

           
      
              <Button onClick={goBack} variant="outlined">
                Back
              </Button>
            
            
        </CardContent>
    </CustomCard>
)
}