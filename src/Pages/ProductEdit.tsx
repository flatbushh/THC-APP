import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { object, string, number } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
  MenuItem,
  styled,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { TerpenEnum } from "../types/Terpen";
import { GeneticsEnum } from "../types/GeneticsEnum";
import { Spinner } from "../components/Spinner";
import {
  mapGeneticsEnumToOptions,
  mapTerpenEnumToOptions,
} from "../utils/mapEnumToOptions";
import { useAlertContext } from "../context/AlertContext";

const productSchema = object({
  producentName: string().min(4).max(20).required("This field is required"),
  strainName: string().min(4).max(20).required("This field is required"),
  genetics: string().min(4).max(15).required("This field is required"),
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

const CustomCard = styled(Card)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "16px",
  padding: 25,
  flexWrap: "wrap",
});

export const ProductEdit = () => {
  const { id } = useParams(); // pobieram ID z URL
  const navigate = useNavigate();
  const { showErrorAlert } = useAlertContext();

  const [product, setProduct] = useState<FormValues | null>(null);
  const terpenOptions = mapTerpenEnumToOptions();
  const geneticsOptions = mapGeneticsEnumToOptions();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(productSchema),
    mode: "all",
    defaultValues: {
      producentName: "",
      strainName: "",
      genetics: GeneticsEnum.INDICA,
      terpen: TerpenEnum.CARIOPHILEN,
      thcLevel: 0,
      cbdLevel: 0,
      description: "",
    },
  });
  useEffect(() => {
    // pobieram produktt po ID
    const fetchProductData = () => {
      axios
        .get(`http://localhost:4000/product/${id}`)
        .then((response) => {
          const product = response.data;
          setProduct(product);
          console.log("Fetched Product:", product);
          const keys = Object.keys(product) as (keyof FormValues)[]; //[] bo powinien być array of keys a nie pojedynczy klucz
          keys.forEach((key) => {
            setValue(key, product[key]);
          });
        })

        .catch((err) => {
          showErrorAlert(
            (err.response?.data?.message as string) ?? "Unexpected error"
          ); //Instead of throwing an error when a property is null or undefined, it returns undefined for the whole expression up to that point.
        });
    };
    fetchProductData();
  }, [id]);

  const onSubmit = async (data: FormValues) => {
    //data --> dane wprowadzone w textfieldach

    const updatedProduct = {
      ...data,
      producentName: data.producentName.toLowerCase(),
    };

    try {
      // wysyłam Patch request aby zaktualizować produkt
      await axios.patch(
        `http://localhost:4000/edit-product/${id}`,
        {
          updatedProduct,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        } //req data
      );

      if (data) {
        navigate(`/`);
      }
    } catch (err) {
      showErrorAlert((err as Error).message ?? "Unexpected error");
    }
  };

  if (!product) return <Spinner />;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <CustomCard>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h4" component="div" gutterBottom>
              Edit Product
            </Typography>

            <TextField
              sx={{ margin: "20px", width: "90%" }}
              label="Producent name"
              {...register("producentName")}
              error={!!errors.producentName}
              helperText={errors.producentName?.message}
            />

            <TextField
              sx={{ margin: "20px", width: "90%" }}
              label="Strain name"
              {...register("strainName")}
              error={!!errors.strainName}
              helperText={errors.strainName?.message}
            />

            <TextField
              sx={{ margin: "20px", width: "90%" }}
              select
              label="Genetics"
              value={product ? product.genetics : ""}
              {...register("genetics")}
              error={!!errors.genetics}
              helperText={errors.genetics?.message}
            >
              {geneticsOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              sx={{ margin: "20px", width: "90%" }}
              label="THC"
              {...register("thcLevel")}
              error={!!errors.thcLevel}
              helperText={errors.thcLevel?.message}
            />

            <TextField
              sx={{ margin: "20px", width: "90%" }}
              label="CBD"
              {...register("cbdLevel")}
              error={!!errors.cbdLevel}
              helperText={errors.cbdLevel?.message}
            />

            <TextField
              sx={{ margin: "20px", width: "90%" }}
              select
              fullWidth
              label="Terpen"
              value={product ? product.terpen : ""}
              {...register("terpen")}
              error={!!errors.terpen}
              helperText={errors.terpen?.message}
            >
              {terpenOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              sx={{ margin: "20px", width: "90%" }}
              fullWidth
              label="Description"
              {...register("description")}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <Divider sx={{ borderColor: "black", borderStyle: "solid" }} />
            <Box display="flex" gap={2}>
              <Button type="submit" variant="contained" color="success">
                Save Changes
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => navigate(`/product/${id}`)}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </CardContent>
      </CustomCard>
    </Box>
  );
};
