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
}

//za pomoca createContext tworzymy context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider: wrapuje moja aplikację i dostarcza context
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null); // Holds the current user

  const { token } = useToken();

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        const userId = localStorage.getItem("userId");
        //If a token exists, it retrieves the userId from localStorage and sends a request to the server to get user information.

        if (userId) {
          try {
            const response = await axios.get(
              `http://localhost:4000/user/${userId}` // Endpoint to fetch user data,
            );
            setUser(response.data); // Set user in AuthContext //The fetched user data is stored in the context so it can be used across the app.
          } catch (err) {
            console.error("Error fetching user data", err);
          }
        }
      }
    };

    initializeAuth();
  }, [token]);

  //  Checks for a token in localStorage.
  // Retrieves the userId from localStorage.
  // Makes an API call to get user information.
  // Stores the user data in AuthContext for other parts of the app to us

  return (
    <AuthContext.Provider value={{ user, setUser }}>
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
