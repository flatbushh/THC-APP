import {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  useEffect,
} from "react";
import { useToken } from "../hooks/useToken";
import axios from "axios";

// Define the shape of the user object
interface User {
  id: string;
  email: string;
  role: string;
}

// Define the shape of the context
interface AuthContextType {
  user: User | null; // The authenticated user or null
  setUser: (user: User | null) => void; // Function to update the user
  logout: () => void;
}

//za pomoca createContext tworzymy context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider: wrapuje moja aplikację i dostarcza context
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null); // Holds the current user

  const { token, validateToken, removeToken } = useToken();

  const logout = () => {
    setUser(null);
    removeToken();
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
  };

  useEffect(() => {
    const initializeAuth = async () => {
      if (!token) return; // exit jesli token nie istnieje

      const isTokenValid = await validateToken(token);
      if (!isTokenValid) {
        console.log("Token is not valid");
        return; // Exit jesli token nie jest valid
      }

      const userId = localStorage.getItem("userId");
      if (!userId) return; // Exit jesli nie ma userID w localstorage
      try {
        const response = await axios.get(
          `http://localhost:4000/user/${userId}`
        );
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user data", err);
      }
    };

    initializeAuth();
  }, [token]);

  //   useEffect(() => {
  //     //context czyści się po odświeeniu strony, dlatego korzystam z useEffect
  //     //przerob to zeby bazowalo na zaprzeczeniach, a nie na pozytywach
  //     const initializeAuth = async () => {
  //       if (token) {
  //         const isTokenValid = await validateToken(token);
  //         console.log(isTokenValid);
  //         if (!isTokenValid) {
  //           console.log("not valid");
  //         }
  //         const userId = localStorage.getItem("userId"); //zaktualizowane z  Login
  //         // front -> backend =>
  //         // endpoint => middleware => controller (nasza funkcja)
  //         if (userId) {
  //           try {
  //             const response = await axios.get(
  //               `http://localhost:4000/user/${userId}` // Endpoint pobierający dane uzytkownika o okręslonym ID
  //             );
  //             setUser(response.data); // Set user in AuthContext,  The fetched user data is stored in the context so it can be used across the app.
  //           } catch (err) {
  //             console.error("Error fetching user data", err);
  //           }
  //         }
  //       }
  //     };

  //     initializeAuth();
  //   }, [token]);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook do uzycia AuthContext
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    //context === undefined
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
