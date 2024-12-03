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
import { useToken } from "../hooks/useToken";
import { Spinner } from "../components/Spinner";

const productSchema = object({
  producentName: string().min(4).max(20).required("This field is required"),
  strainName: string().min(4).max(20).required("This field is required"),
  genetics: string().min(4).max(15).required(),
  terpen: string().required(),
  thcLevel: number().positive().integer().min(1).required(),
  cbdLevel: number().positive().integer().min(1).required(),
  description: string().required(),
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

  const [product, setProduct] = useState<FormValues | null>(null);
  const [terpenOptions, setTerpenOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [geneticsOptions, setGeneticsOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const form = useForm<FormValues>({
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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  useEffect(() => {
    // pobieram produktt po ID
    const fetchProductData = () => {
      axios
        .get(`http://localhost:4000/product/${id}`)
        .then((response) => {
          const product = response.data;
          setProduct(product);
          // ustawiam w formie pobrane dane z backendu jako defaultowe
          setValue("producentName", product.producentName); //Updatin the "description" field in the form with the description property from the fetched product data
          setValue("strainName", product.strainName);
          setValue("genetics", product.genetics);
          setValue("terpen", product.terpen);
          setValue("thcLevel", product.thcLevel);
          setValue("cbdLevel", product.cbdLevel);
          setValue("description", product.description);
        })
        .catch((error) => {
          console.error("Error fetching product", error);
        });
    };
    const mapTerpenEnumToOptions = () => {
      const array = Object.keys(TerpenEnum).map((terpen) => ({
        label: terpen.toUpperCase(),
        value: terpen.toLowerCase(),
      }));
      setTerpenOptions(array);
    };

    const mapGeneticsEnumToOptions = () => {
      const array = Object.keys(GeneticsEnum).map((genetic) => ({
        label: genetic.toUpperCase(),
        value: genetic.toLowerCase(),
      }));
      setGeneticsOptions(array);
    };

    fetchProductData();
    mapTerpenEnumToOptions();
    mapGeneticsEnumToOptions();
  }, [id]);

  const onSubmit = async (data: FormValues) => {
    //data --> dane wprowadzone w textfieldach

    const updatedProduct = {
      producentName: data.producentName.toLowerCase(),
      strainName: data.strainName,
      genetics: data.genetics,
      thcLevel: data.thcLevel,
      cbdLevel: data.cbdLevel,
      terpen: data.terpen,
      description: data.description,
    };

    try {
      // wysyłam Patch request aby zaktualizować produkt
      await axios.patch(
        `http://localhost:4000/edit-product/${id}`,
        updatedProduct
      );
      navigate(`/product-preview/${id}`);
    } catch (err) {
      console.log(err);
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
              <Button
                type="submit"
                variant="contained"
                color="success"
                onClick={() => navigate(`/`)}
              >
                Save Changes
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => navigate(`/`)}
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
