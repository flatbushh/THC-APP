import axios from "axios";

export const useToken = () => {
  const token = localStorage.getItem("token");
  const setToken = (token: string) => localStorage.setItem("token", token);
  const removeToken = () => localStorage.removeItem("token");

  const validateToken = async (token: string) => {
    try {
      await axios.get("http://localhost:4000/validate-token", {
        headers: {
          Authorization: token,
        },
      });
      return true;
    } catch (err) {
      return false;
    }
  };

  return { token, setToken, validateToken, removeToken };
};

//czemu w localStorage,a nie w useState (useState jest powiązany z komponentem), to jest hook
