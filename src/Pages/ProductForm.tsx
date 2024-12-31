import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { object, string, number, date, InferType, mixed } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
  styled,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TerpenEnum } from "../types/Terpen";
import { GeneticsEnum } from "../types/GeneticsEnum";
import { useToken } from "../hooks/useToken";
import { FormTextfield } from "../components/FormComponents/FormTextField";
import { FormSelect } from "../components/FormComponents/FormSelect";

const productSchema = object({
  producentName: string().min(4).max(20).required("This field is required"),
  strainName: string().min(4).max(20).required("This field is required"),
  genetics: string().required("This field is required"),
  terpen: string().required("This field is required"),
  thcLevel: number()
    .positive()
    .integer()
    .min(1)
    .required("This field is required"),
  cbdLevel: number()
    .positive()
    .integer()
    .min(1)
    .required("This field is required"),
  description: string().required("This field is required"),
});

type FormValues = {
  producentName: string;
  strainName: string;
  genetics: string;
  terpen: string;
  thcLevel: number;
  cbdLevel: number;
  description: string;
};

const defaultValues: FormValues = {
  producentName: "",
  strainName: "",
  genetics: "",
  terpen: "",
  thcLevel: 0,
  cbdLevel: 0,
  description: "",
};

export const ProductForm = () => {
  const navigate = useNavigate();
  const { token } = useToken();
  /* przypisujemy hooka useNavigate to zmiennej - jest to funkcja sluzy ona do przekierowania do okreslonej strony
   jako argument przyjmuje jej adres, czyli path okreslony w App.tsx w konkretnym Routcie */

  const [terpenOptions, setTerpenOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [geneticsOptions, setGeneticsOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const { handleSubmit, control } = useForm<FormValues>({
    resolver: yupResolver(productSchema),
    mode: "all",
    defaultValues,
  });

  const mapTerpenEnumToOptions = () => {
    const array = Object.keys(TerpenEnum).map((terpen) => ({
      label: terpen.toLocaleUpperCase(),
      value: terpen.toLocaleLowerCase(),
    }));

    setTerpenOptions(array);
  };

  const mapGeneticsEnumToOptions = () => {
    const array = Object.keys(GeneticsEnum).map((genetic) => ({
      label: genetic.toLocaleUpperCase(),
      value: genetic.toLocaleLowerCase(),
    }));

    setGeneticsOptions(array);
  };

  useEffect(() => {
    mapTerpenEnumToOptions();
    mapGeneticsEnumToOptions();
  }, []);

  /*
  1. Hook useForm moze przyjmowac przeroznce opcje, najwazniejsze z nich:
    - resolver -> czyli funkcja/mechanizm, ktory przyjmuje jakas schema (productSchema). Pozwala to na
    walidacje konkretnych pol w sposob taki jak my to sobie okreslimy. https://www.npmjs.com/package/yup -> dokumnetacja yupa
    tam znajdziesz wszelkie opcje, jak mozemy walidowac inputy
    - mode -> kiedy walidacja ma sie odpalac (opcje zobaczysz po najechaniu), all jest najwygodniejsze
    - defaultValues -> defaultowe wartosci dla formularza
    2. useForm zwraca obinmularza na podstawie kontrolowanych do niego danych
    - formState -> stan fomularza (taki troche formulrzowy useState), jest obiektem, zawiera w sobie miedzyinnymi co istotne errors
  */

  const onSubmit = async (data: FormValues) => {
    await axios
      .post("http://localhost:4000/create-product", data, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(() => {
        console.log("in");
        navigate("/");
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Card sx={{ width: "400px", borderRadius: "16px" }}>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%", // Make sure the form takes full width within the card
            gap: "20px",
          }}
        >
          <Typography
            sx={{ fontFamily: "BlinkMacSystemFont" }}
            variant="h4"
            gutterBottom
          >
            Add new product
          </Typography>

          <FormTextfield
            label={"Producent name"}
            control={control}
            name={"producentName"}
            fullWidth
          />

          <FormTextfield
            label={"Strain name"}
            control={control}
            name={"strainName"}
            fullWidth
          />

          <FormSelect
            label={"Genetics"}
            control={control}
            name={"genetics"}
            options={geneticsOptions}
            id="genetics"
          />

          {/* <TextField
              sx={{ margin: "20px", width: "100%" }}
              select
              label={"Genetics"}
              {...register("genetics")}
              defaultValue={getValues('genetics')}
              error={!!errors.genetics}
              helperText={errors.genetics ? errors.genetics.message : ""}
            >
              {geneticsOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField> */}

          <FormTextfield
            label="THC"
            control={control}
            name={"thcLevel"}
            fullWidth
          />

          {/* <TextField
              sx={{ margin: "20px", width: "100%" }}
              label={"THC"}
              {...register("thcLevel")}
              error={!!errors.thcLevel}
              helperText={errors.thcLevel ? errors.thcLevel.message : ""}
            /> */}

          <FormTextfield
            label="CBD"
            control={control}
            name="cbdLevel"
            fullWidth
          />
          <FormSelect
            label="Terpen"
            control={control}
            name="terpen"
            options={terpenOptions}
          />

          <FormTextfield
            label="Description"
            control={control}
            name="description"
            fullWidth
          />

          <Divider sx={{ borderColor: "black", borderStyle: "solid" }} />
          <Box display="flex" gap={2}>
            <Button type="submit" variant="contained" color="success">
              Add product
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};
