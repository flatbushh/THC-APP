import {
  Box,
  Button,
  Typography,
  styled,
  TextField,
  ImageListItem,
  Stack,
  Rating,
  ThemeProvider,
  createTheme,
  Tabs,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SpaIcon from "@mui/icons-material/Spa";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAlertContext } from "../../context/AlertContext";
import { ReactTab } from "../../components/ReactTab"; // Assuming this is the path to your ReactTab component
import { DetailsSection } from "./components/DetailsSection/DetailsSection";
import { TabsSection } from "./components/TabsSection/Tabs";

export const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>();
  const [quantity, setQuantity] = useState<number>(1);
  const { showErrorAlert } = useAlertContext();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Number(e.target.value)); // Prevent quantity from going below 1
    setQuantity(value);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/product/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        showErrorAlert(
          (err.response?.data?.message as string) ?? "Unexpected error"
        );
      });
  }, [id, showErrorAlert]);

  return (
    <>
      <Box display="flex" height={"60%"} width={"100%"}>
        <Box sx={{ width: "50%", height: "100%" }}>
          {/* <img
            src="https://st3.depositphotos.com/5647624/16026/i/450/depositphotos_160268804-stock-photo-legal-marijuana-in-metal-box.jpg"
            alt="Product photo"
            style={{
              objectFit: "cover",
              borderRadius: "10px",
            }}
          /> */}
        </Box>
        <DetailsSection/>
      </Box>
      <Box bgcolor={"blue"} height={"40%"} width={"100%"}>
          <TabsSection/>
      </Box>
    </>
    // <MainContainer>
    //   {/* Left Box - Image and ReactTab */}
    //   <Box
    //     sx={{
    //       flex: 1,
    //       display: "flex",
    //       flexDirection: "column",
    //       justifyContent: "flex-start",
    //       alignItems: "center",
    //       gap: 3,
    //       border: "1px solid black", // Border to visualize the left box
    //     }}
    //   >
    //     {/* Product Image */}
    //

    //     {/* ReactTab inside Left Box */}
    //     <Box
    //       sx={{
    //         width: "100%",
    //         maxWidth: 600,
    //         margin: 0,
    //       }}
    //     >
    //       <ReactTab />
    //     </Box>
    //   </Box>

    //   {/* Right Box - Typography and other content */}
    //   <Box
    //     sx={{
    //       flex: 1,
    //       display: "flex",
    //       flexDirection: "column",
    //       justifyContent: "flex-start",
    //       textAlign: "left",
    //       border: "1px solid black", // Border to visualize the right box
    //     }}
    //   >
    //     {/* Product Name */}
    //     <Typography variant="body2" sx={{ fontWeight: 700, color: "#333" }}>
    //       {product?.producerName || "Producer Name"}
    //     </Typography>

    //     {/* Strain Name */}
    //     <Typography variant="h3" sx={{ fontWeight: 600, color: "#444" }}>
    //       {product?.strainName || "Strain Name"}
    //     </Typography>

    //     {/* Rating and Reviews */}
    //     <Stack spacing={1} alignContent={"center"} justifyContent={"center"}>
    //       <Box
    //         sx={{
    //           display: "flex",
    //           alignItems: "center",
    //           gap: 1,
    //         }}
    //       >
    //         <Rating
    //           name="half-rating"
    //           value={rating}
    //           defaultValue={2.5}
    //           onChange={(newValue) => setRating(Number(newValue))}
    //           precision={0.5}
    //         />
    //         <Typography
    //           variant="body2"
    //           sx={{ color: "#888", fontSize: "1rem" }}
    //         >
    //           {numReviews} reviews
    //         </Typography>
    //       </Box>
    //     </Stack>

    //     {/* THC and CBD Levels */}
    //     <Box
    //       sx={{
    //         display: "flex",
    //         justifyContent: "center",
    //         alignItems: "center",
    //         gap: 5,
    //         width: "100%",
    //       }}
    //     >
    //       <Typography variant="h5" sx={{ fontWeight: 600, color: "#222" }}>
    //         THC level
    //       </Typography>
    //       <Typography variant="h5" sx={{ fontWeight: 600, color: "#222" }}>
    //         CBD level
    //       </Typography>
    //     </Box>

    //     {/* Dominant terpen */}
    //     <Typography variant="h5" sx={{ fontWeight: 500, color: "#555" }}>
    //       Dominant terpen
    //       <SpaIcon sx={{ color: "orange", marginLeft: 1 }} />
    //     </Typography>

    //     {/* Quantity Scroller */}
    //     <TextField
    //       label="Quantity"
    //       type="number"
    //       value={quantity}
    //       onChange={handleQuantityChange}
    //       sx={{
    //         width: "120px",
    //         marginTop: 2,
    //       }}
    //     />

    //     {/* Add to Cart Button */}
    //     <Button
    //       variant="contained"
    //       sx={{
    //         backgroundColor: "#F5DEB3",
    //         color: "black",
    //         display: "flex",
    //         alignItems: "center",
    //         gap: 1,
    //         marginTop: 10,
    //       }}
    //     >
    //       Add to cart
    //       <AddShoppingCartIcon />
    //     </Button>
    //   </Box>
    // </MainContainer>
  );
};
