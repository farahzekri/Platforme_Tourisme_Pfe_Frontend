import axios from "axios";
import { useMutation } from "react-query";
import toast from "react-hot-toast";

const url = "http://localhost:5000/agence"; 

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: async (userData) => {
      try {
        const { data } = await axios.post(`${url}/register`, userData);
        toast.success("User registered successfully!");
        return data;
      } catch (error) {
        const err = error?.response?.data?.error;
        toast.error(err || "Registration failed!");
        throw error;
      }
    },
  });
};
