import {
  SelectChangeEvent,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAlertContext } from "../context/AlertContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { User } from "../types/User";
import { Role } from "../types/Role";

const assignRoleSchema = object({
  email: string().email().required(),
  role: string().oneOf(["CLIENT", "ADMIN"]).required(),
});

type FormValues = {
  email: string;
  role: Role;
};

export const AssignRole = () => {
  const [users, setUsers] = useState<User[]>([]); // State to store users
  const { showErrorAlert, showSuccessAlert } = useAlertContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(assignRoleSchema),
    mode: "all",
    defaultValues: {
      email: "",
      role: "CLIENT",
    },
  });

  // pobieranie users z backendu aby móc wykorzystać emails in dropdown list in MenuItem (nie napisalem funkcji wewnatrz useEffect, bo musze sie do nije pozniej odwolac w celu odswiezenia)
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/users");
      console.log(response.data);
      setUsers(response.data);
    } catch (err) {
      showErrorAlert("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const assignRole = async (data: FormValues) => {
    const { email, role } = data;

    const selectedUser = users.find((user) => user.email === email);
    if (!selectedUser) {
      showErrorAlert("User not found!");
      return;
    }
    if (selectedUser.role === role) {
      showErrorAlert(
        "The selected role has already been assigned to this user!"
      );
      return;
    }

    try {
      await axios.post(`http://localhost:4000/assign-role/${selectedUser.id}`, {
        role,
      });
      showSuccessAlert("Role assigned successfully!");
      await fetchUsers();
    } catch (err) {
      showErrorAlert((err as Error).message ?? "Unexpected error"); //errory nie są otypowane w JS, rzutowanie typu
    }
  };
  return (
    <Box sx={{ padding: 3, maxWidth: 500, margin: "auto" }}>
      <Card sx={{ boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Assign Role to User
          </Typography>

          {/* wybór maila w dropdown */}
          <form onSubmit={handleSubmit(assignRole)}>
            <InputLabel id="user-label"></InputLabel>
            <TextField
              sx={{ marginBottom: 3 }}
              select
              fullWidth
              label="Select User"
              value={""}
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.email}>
                  {user.email}
                </MenuItem>
              ))}
            </TextField>

            {/* Wybór roli w dropdown */}
            <InputLabel id="role-label"></InputLabel>
            <TextField
              sx={{ marginBottom: 3 }}
              select
              fullWidth
              label="Select Role"
              value={""}
              {...register("role")}
              error={!!errors.role}
              helperText={errors.role ? errors.role.message : ""}
            >
              <MenuItem value="CLIENT">Client</MenuItem>
              <MenuItem value="ADMIN">Admin</MenuItem>
            </TextField>
            {/* button do przypisania roli */}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginBottom: 3 }}
            >
              Assign Role
            </Button>
            {/* button do nawigacji */}
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={() => navigate("/users")}
            >
              Back to Users
            </Button>
          </form>
        </CardContent>

        <CardActions sx={{ flexDirection: "column", gap: 2 }}></CardActions>
      </Card>
    </Box>
  );
};
