import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { Badge, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  email: string;
}

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/users"); //pobieram listę user'ów
        setUsers(response.data); // przypisuję dane userów do zmiennej users z useState (mappedUsers)
      } catch (err) {
        setError(true);
      }
    };

    fetchUsers();
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:4000/product/users`)
  //     .then((res) => {
  //       setUsers(res.data);
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "email", headerName: "Email", width: 300 },

    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: (
        //to render konkretny cell
        params //params object
      ) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/assign-role/${params.row.id}`)} //.row -represents current row in grid, :id jest zamienone na id aktualnego user'a
          >
            Assign Role
          </Button>

          <Button
            variant="outlined"
            style={{ marginLeft: "10px" }}
            onClick={() => navigate(`/user-preview/${params.row.id}`)} //:id is replaced by the id of the current user row.
          >
            Preview
          </Button>
        </div>
      ),
    },
  ];

  const rows = users.map((user) => ({
    id: user.id, //id z row w params.row.id
    email: user.email,
  }));

  return (
    <div style={{ height: 400, width: "100%" }}>
      {error && <p>something went wrong</p>}
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};
