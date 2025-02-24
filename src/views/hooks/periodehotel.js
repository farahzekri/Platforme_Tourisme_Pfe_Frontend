import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';


const url = 'http://localhost:5000/periode';


export const useCreatePeriode = () => { 
    const queryClient = useQueryClient();

    return useMutation(
        async ({ id, formData }) => {
            const response = await axios.post(`${url}/ceateperiodehotel/${id}`, formData);
            return response.data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("periodes"); // Rafraîchir les périodes après ajout
            }
        }
    );
};