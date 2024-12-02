import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ALLOWED_ROLE = 'ADMIN';

export const ProtectedAdminRoutes:FC = () => {
  //konsumpcja propsa przekazanego z App.tsx
  const { user } = useAuthContext(); // Access user info from AuthContext
  
  if (!user) {
    return <Navigate to="/login" />;
    //przekieruj na stronę logowania jeśli uytkownik nie istnieje (nie jest uwierzytelniony) undefined
  } 
  
  if (user.role !== ALLOWED_ROLE) {
    // przekieruj do no-access jesli uytkownik nie ma przypiasnej odpwoiednije roli ( ta z propsa z App.tsx i ta z user'a po logowaniu)
    return <Navigate to="/no-access" />;
  }
  //zwróć outlet jeśli user istnieje i role są takie same

  return <Outlet />
};

// export const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({
//   allowedRole,
// }) => {
//   const { user } = useAuthContext();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) {
//
//       navigate("/login");
//     } else if (user.role !== allowedRole) {
//
//       navigate("/no-access");
//     }
//   }, [user, allowedRole, navigate]);

//   // If the user is authenticated and has the correct role, render child routes
//   if (user && user.role === allowedRole) {
//     return <Outlet />;
//   }

//   // Optionally, render nothing or a loader while navigating
//   return null;
// };
