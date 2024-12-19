import { FC, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { User } from "../types/User";

const ALLOWED_ROLE = "ADMIN";

export const ProtectedAdminRoutes: FC = () => {
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("userRole");
  if (!userId) {
    return <Navigate to="/login" />;
    //przekieruj na stronę logowania jeśli uytkownik nie istnieje (nie jest uwierzytelniony) undefined
  }

  if (role !== ALLOWED_ROLE) {
    // przekieruj do no-access jesli uytkownik nie ma przypiasnej odpwoiednije roli ( ta z propsa z App.tsx i ta z user'a po logowaniu)
    return <Navigate to="/no-access" />;
  }
  //zwróć outlet jeśli user istnieje i role są takie same

  return <Outlet />;
};
