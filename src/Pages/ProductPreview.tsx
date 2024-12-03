import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  styled,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Product } from "./ProductsList";
import { Spinner } from "../components/Spinner";
import Button from "@mui/material/Button";

const StyledBox = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
  backgroundColor: "#348feb",
});

export const ProductPreview = () => {
  const { id } = useParams(); //od razu destrukturyzujemy id
  // const params = useParams()
  // const id = params.id
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product>();
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:4000/product/${id}`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  if (loading) {
    return <Spinner />;
  }
  if (!product) {
    return <p> product not found </p>;
  }
  return (
    <StyledBox>
      <Card>
        <CardContent
          sx={{
            width: "50vw",
            height: "90vh",
          }}
        >
          <Box>
            <Typography gutterBottom variant="h5" component="div">
              {product.strainName}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {product.producentName}
            </Typography>
          </Box>
          <Box mt={2}>
            <Typography variant="h6" component="div" color="#348feb">
              {product.genetics}
            </Typography>
            <Typography variant="h6" component="div" color="#348feb">
              {product.terpen}
            </Typography>
          </Box>

          <CardMedia
            component="img"
            height="500"
            image="https://odmianymarihuany.pl/wp-content/uploads/2023/04/aurora-delahaze-22-1.jpg"
            alt="Strain photo"
          />

          <Box>
            <Typography variant="body1" color="text.secondary">
              {product.description}
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/edit-product/${id}`)}
          >
            Edit
          </Button>
          <Button onClick={goBack} variant="outlined">
            Back
          </Button>
        </CardContent>
      </Card>
    </StyledBox>
  );
};
