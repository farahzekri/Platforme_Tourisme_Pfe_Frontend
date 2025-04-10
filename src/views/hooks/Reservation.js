import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const url = "http://localhost:5000/reservation"; 

export const useCreateReservation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ hotelId, formData }) => {
      const response = await axios.post(`${url}/creatreservation/${hotelId}`, formData);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("reservations"); 
      },
    }
  );
};
