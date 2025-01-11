// export const ProductEdit = () => {
//   const { id } = useParams(); // pobieram ID z URL
//   const navigate = useNavigate();
//   const { showErrorAlert } = useAlertContext();

//   const [product, setProduct] = useState<FormValues | null>(null);
//   const terpenOptions = mapTerpenEnumToOptions();
//   const geneticsOptions = mapGeneticsEnumToOptions();

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//     getValues,
//   } = useForm<FormValues>({
//     resolver: yupResolver(productSchema),
//     mode: "all",
//     defaultValues: {
//       producentName: "",
//       strainName: "",
//       genetics: "",
//       terpen: "",
//       thcLevel: 0,
//       cbdLevel: 0,
//       description: "",
//     },
//   });
//   useEffect(() => {
//     // pobieram produktt po ID
//     const fetchProductData = () => {
//       axios
//         .get(`http://localhost:4000/product/${id}`)
//         .then((response) => {
//           const product = response.data;
//           setProduct(product);
//           console.log("Fetched Product:", product);
//           const keys = Object.keys(product) as (keyof FormValues)[]; //[] bo powinien być array of keys a nie pojedynczy klucz
//           keys.forEach((key) => {
//             setValue(key, product[key]);
//           });
//         })

//         .catch((err) => {
//           showErrorAlert(
//             (err.response?.data?.message as string) ?? "Unexpected error"
//           ); //Instead of throwing an error when a property is null or undefined, it returns undefined for the whole expression up to that point.
//         });
//     };
//     fetchProductData();
//   }, [id]);

//   const onSubmit = async (data: FormValues) => {
//     //data --> dane wprowadzone w textfieldach

//     const updatedProduct = {
//       //The spread operator (...data) copies all key-value pairs from the data object into the new updatedProduct object.
//       ...data,
//       producentName: data.producentName.toLowerCase(), // Overwriting producentName
//     };
//     console.log(data);
//     console.log(updatedProduct);
//     // wysyłam Patch request aby zaktualizować produkt
//     await axios
//       .patch(
//         `http://localhost:4000/edit-product/${id}`,
//         updatedProduct,
//         {
//           headers: {
//             Authorization: localStorage.getItem("token"),
//           },
//         } //req data
//       )
//       .then(() => navigate(`/`))
//       .catch((err) => {
//         showErrorAlert((err as Error).message ?? "Unexpected error");
//       });
//   };

//   if (!product) return <Spinner />;

//   return (
//     <Box
//       sx={{
//         margin: "30px",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh", // Full viewport height
//         width: "90vw",
//       }}
//     >
//       <CustomCard>
//         <CardContent>
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               flexDirection: "column",
//               width: "100%", // Make sure the form takes full width within the card
//             }}
//           >
//             <Typography variant="h4" component="div" gutterBottom>
//               Edit Product
//             </Typography>

//             <TextField
//               sx={{ margin: "20px", width: "100%" }}
//               label="Producent name"
//               {...register("producentName")}
//               error={!!errors.producentName}
//               helperText={errors.producentName?.message}
//             />

//             <TextField
//               sx={{ margin: "20px", width: "100%" }}
//               label="Strain name"
//               {...register("strainName")}
//               error={!!errors.strainName}
//               helperText={errors.strainName?.message}
//             />

//             <TextField
//               sx={{ margin: "20px", width: "100%" }}
//               select
//               label="Genetics"
//               {...register("genetics")}
//               defaultValue={getValues("genetics")}
//               error={!!errors.genetics}
//               helperText={errors.genetics?.message}
//             >
//               {geneticsOptions.map((option) => (
//                 <MenuItem key={option.value} value={option.value}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </TextField>

//             <TextField
//               sx={{ margin: "20px", width: "100%" }}
//               label="THC"
//               {...register("thcLevel")}
//               error={!!errors.thcLevel}
//               helperText={errors.thcLevel?.message}
//             />

//             <TextField
//               sx={{ margin: "20px", width: "100%" }}
//               label="CBD"
//               {...register("cbdLevel")}
//               error={!!errors.cbdLevel}
//               helperText={errors.cbdLevel?.message}
//             />

//             <TextField
//               sx={{ margin: "20px", width: "100%" }}
//               select
//               fullWidth
//               label="Terpen"
//               {...register("terpen")}
//               defaultValue={getValues("terpen")}
//               error={!!errors.terpen}
//               helperText={errors.terpen?.message}
//             >
//               {terpenOptions.map((option) => (
//                 <MenuItem key={option.value} value={option.value}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </TextField>

//             <TextField
//               sx={{ margin: "20px", width: "100%" }}
//               fullWidth
//               label="Description"
//               {...register("description")}
//               error={!!errors.description}
//               helperText={errors.description?.message}
//             />

//             <Divider sx={{ borderColor: "black", borderStyle: "solid" }} />
//             <Box display="flex" gap={2}>
//               <Button type="submit" variant="contained" color="success">
//                 Save Changes
//               </Button>
//               <Button
//                 variant="contained"
//                 color="error"
//                 onClick={() => navigate(`/product/${id}`)}
//               >
//                 Cancel
//               </Button>
//             </Box>
//           </form>
//         </CardContent>
//       </CustomCard>
//     </Box>
//   );
// };

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
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import {
  mapGeneticsEnumToOptions,
  mapTerpenEnumToOptions,
} from "../utils/mapEnumToOptions";
import { useAlertContext } from "../context/AlertContext";
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

export const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showErrorAlert } = useAlertContext();

  const [product, setProduct] = useState<FormValues | null>(null);
  const terpenOptions = mapTerpenEnumToOptions();
  const geneticsOptions = mapGeneticsEnumToOptions();

  const { handleSubmit, control, setValue } = useForm<FormValues>({
    resolver: yupResolver(productSchema),
    mode: "all",
    defaultValues: {
      producentName: "",
      strainName: "",
      genetics: "",
      terpen: "",
      thcLevel: 0,
      cbdLevel: 0,
      description: "",
    },
  });

  useEffect(() => {
    const fetchProductData = () => {
      axios
        .get(`http://localhost:4000/product/${id}`)
        .then((response) => {
          const product = response.data;
          setProduct(product);
          const keys = Object.keys(product) as (keyof FormValues)[];
          keys.forEach((key) => {
            setValue(key, product[key]);
          });
        })
        .catch((err) => {
          showErrorAlert(
            (err.response?.data?.message as string) ?? "Unexpected error"
          );
        });
    };
    fetchProductData();
  }, [id]);

  const onSubmit = async (data: FormValues) => {
    const updatedProduct = {
      ...data,
      producentName: data.producentName.toLowerCase(),
    };

    await axios
      .patch(`http://localhost:4000/edit-product/${id}`, updatedProduct, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(() => navigate(`/`))
      .catch((err) => {
        showErrorAlert((err as Error).message ?? "Unexpected error");
      });
  };

  if (!product) return <Spinner />;

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
            width: "100%",
            gap: "20px",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Edit Product
          </Typography>

          <FormTextfield
            label="Producent name" //MUI props (typ TextFieldProps)
            control={control} //object that contains all the methods and state needed to manage form inputs, validations (UseControllerProps), connects this field to the overall form
            name="producentName" //dzieki niemu useContoller wie o jaki input chodzi (UseControllerProps)
            fullWidth //fullwidth = {true} domyślnie (typ TextFieldProps)
          />

          <FormTextfield
            label="Strain name"
            control={control}
            name="strainName"
            fullWidth
          />

          <FormSelect
            label="Genetics"
            control={control}
            name="genetics"
            options={geneticsOptions}
          />

          <FormTextfield
            label="THC"
            control={control}
            name="thcLevel"
            fullWidth
          />

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
            fullWidth //rozumiem ze name i control sa potrzebne do useContollera, ale po co w tym miejscu label i fullWidth
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
    </Card>
  );
};
