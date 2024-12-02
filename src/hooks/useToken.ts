import { useEffect, useState } from "react";



export const useToken = () => {
   const token = localStorage.getItem('token');
   const setToken = (token: string) => localStorage.setItem('token', token);

   return {token, setToken};
}