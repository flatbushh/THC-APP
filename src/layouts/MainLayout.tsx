import { Outlet } from "react-router-dom";
import { Drawer } from "../components/Drawer/Drawer";

export const MainLayout = () => {
  return (
    <Drawer>
      <Outlet />
      {/* tu w Outlet jest renderowane nested routes z App.tsx, czyli dashboard, users i productForm?? Dzięki Layoutowi drawer jest wyświetlany na stronach dashboard/users/productForm*/}
    </Drawer>
  );
  //return <Drawer>{children}</Drawer> podając {children} w argumrncie?? czy to jest to samo?
  //czy mogłbym zamist tworzyc layout owrapowac wszystko drawerem w App.tsx
};
