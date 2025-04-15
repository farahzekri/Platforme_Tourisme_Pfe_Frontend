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
export const useCreatePayment = () => {
  return useMutation(
    async ({ amount, reservationId }) => {
      const response = await axios.post(`${url}/create`, {
        amount,
        reservationId,
      });
      return response.data; 
    }
  );
};