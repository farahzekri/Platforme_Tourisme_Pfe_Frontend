import { useMutation, useQueryClient } from 'react-query';
import axios from "axios";

const url = "http://localhost:5000/review"; // Remplace par ton URL backend

export const useAddReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ hotelId, reviewData }) => {
            try {
                const response = await axios.post(`${url}/ceateReview/${hotelId}`, reviewData);
                return response.data;
            } catch (error) {
                console.error('Erreur lors de la soumission de l\'avis:', error.response?.data || error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["reviews"]);
            queryClient.invalidateQueries(["hotels"]);
        },
    });
};
