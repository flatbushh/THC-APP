import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";

interface User {
  id: string;
  email: string;
}

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/users");
        setUsers(response.data); // przypisuję dane userów do zmiennej users z useState
        console.log(response.data); //sprawdzam czy właściwe dane są pobrane
      } catch (err) {
        setError(true)
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
  ];

  const rows = users.map((user) => ({
    id: user.id,
    email: user.email,
  }));

  return (
    <div style={{ height: 400, width: "100%" }}>
      {error && <p>something went wrong</p>}
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};
