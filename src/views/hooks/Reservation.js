import { useMutation, useQuery, useQueryClient } from "react-query";
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

export const useGetReservationsByHotel = (hotelId) => {
  return useQuery({
    queryKey: ["reservations", "byHotel", hotelId],
    queryFn: async () => {
      const response = await axios.get(`${url}/getreservationbyhotel/${hotelId}`);
      return response.data;
    },
    enabled: !!hotelId, // le fetch ne s'exécute que si hotelId est défini
  });
};
export const useGetReservationsByB2B = (b2bId) => {
  return useQuery({
    queryKey: ["reservations", "byB2B", b2bId],
    queryFn: async () => {
      const response = await axios.get(`${url}/getReservationsByB2B/${b2bId}`);
      return response.data;
    },
    enabled: !!b2bId, 
  });
};