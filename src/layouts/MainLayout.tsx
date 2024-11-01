import { Outlet } from "react-router-dom";
import { Drawer } from "../components/Drawer/Drawer";

export const MainLayout = () => {
  return (
    <Drawer>
      <Outlet />
    </Drawer>
  );
};
