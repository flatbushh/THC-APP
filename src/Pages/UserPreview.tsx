import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import { useAlertContext } from "../context/AlertContext";
import { User } from "../types/User";

export const UserPreview = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null); //bo pojedynczy user a nie lista userów, response zwraca poojedynczy obiekt ('${id} w url), a nie listę obiektów, null bo wartość początkowa null
  // czy mogę tu dać <User[]>([]) wtedy będę mial tablicę z jednym obiektem
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { showErrorAlert } = useAlertContext();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/user/${id}`); //pobieram dane user'a o podanym id
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        showErrorAlert("Failed to fetch users");
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (!user) {
    return <p>user not found</p>;
  }
  return (
    <Box
      sx={{
        display: "flex", // Set Box to a flex container
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
        height: "100vh", // Take full viewport height
        width: "100vw", // Take full viewport width
      }}
    >
      {loading && <Spinner />}

      <Card sx={{ maxWidth: 500, width: "100%", padding: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            User Details
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            <strong>Id</strong> : {user.id}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            <strong>Email</strong>: {user.email}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            <strong>Role</strong>: {user.role}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/users")}
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Back
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};
