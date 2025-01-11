import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div style={{ marginTop: 40 }}>
      <Button variant="contained" color="error" onClick={() => navigate("/")}>
        Back to home page
      </Button>
    </div>
  );
};
