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

interface User {
  id: string;
  email: string;
  role: string;
}

const assignRoleSchema = object({
  email: string().email().required(),
  role: string().oneOf(["CLIENT", "ADMIN"]).required(),
});

type FormValues = {
  email: string;
  role: "CLIENT" | "ADMIN";
};

export const AssignRole = () => {
  const [users, setUsers] = useState<User[]>([]); // State to store users
  // const [selectedEmail, setSelectedEmail] = useState<string>(""); //przechowywanie wybranego usera
  // const [selectedRole, setSelectedRole] = useState<string>(""); //przechowywanie wybranej roli
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

  // const handleUserSelection = (event: SelectChangeEvent<string>) => {
  //   setSelectedEmail(event.target.value);
  // };

  // const handleRoleSelection = (event: SelectChangeEvent<string>) => {
  //   setSelectedRole(event.target.value);
  // };

  // przypisanie roli
  // const assignRole = async () => {
  //   if (!selectedEmail) {
  //     showErrorAlert("Please select a user!");
  //     return;
  //   }
  //   if (!selectedRole) {
  //     showErrorAlert("Please select a role!");
  //     return;
  //   }

  //   // szukam user'a po wybranym emailu, sprawdza, który email jest taki sam z wybranym (state variable), zwraca obiekt ze znalezionym userem
  //   //const selectedUser = {id: user.id, email: user.email, role: user.role}
  //   const selectedUser = users.find((user) => user.email === selectedEmail);
  //   //ten if dlatego, ze user moe być undefined
  //   if (!selectedUser) {
  //     showErrorAlert("User not found!");
  //     return;
  //   }
  //   // sprawdzam czy nowo przypisana rola jest taka sama jak ta co aktualnie przypisuję
  //   console.log(selectedUser);
  //   console.log(selectedRole);
  //   if (selectedUser.role === selectedRole) {
  //     showErrorAlert(
  //       "The selected role has already been assigned to this user!"
  //     );
  //     return;
  //   }

  //   try {
  //     // wysyłam na backend przypisaną rolę z ID wybranego user'a, w URL
  //     await axios.post(`http://localhost:4000/assign-role/${selectedUser.id}`, {
  //       //jak robię samo id z useParams to mając w URL id danego usera tylko jego rolę mogę zmienic
  //       role: selectedRole,
  //     });
  //     showSuccessAlert("Role assigned successfully!");

  //     await fetchUsers(); // po zmianie roli pobieram jeszcze raz dane usera ???

  //     // //  szukam updatedUser po emailu po ponownym pobraniu userów
  //     // const updatedUser = users.find((user) => user.email === selectedEmail);

  //     // if (updatedUser) {
  //     //   setSelectedRole(updatedUser.role); // zaznaczyc nowa wybrana jako aktualna
  //     // }
  //   } catch (err) {
  //     //przypisałem typ, poniewa w przeciwnym razie nie mam dostepu do err.response.data
  //     //otypowałem jako any, poniewaz w przeciwnym razie nie mogłem dostać sie do err.response.data,
  //     //jak korzystalem z useForm np w komponencie Login nie było tego problemu,
  //     showErrorAlert((err as Error).message ?? "Unexpected error");
  //   }
  // };
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
