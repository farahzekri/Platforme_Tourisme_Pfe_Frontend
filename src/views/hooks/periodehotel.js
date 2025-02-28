import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';


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

export const useSearchHotels = () => {
    const queryClient = useQueryClient();

    return useMutation(
        async (searchParams) => {
            console.log("🔎 Données envoyées :", searchParams);
            try {
                const response = await axios.post(`${url}/serach`, searchParams);
                console.log("📩 Réponse complète :", response);
                console.log("📩 Données renvoyées par l'API :", response.data);
                return response.data;
            } catch (error) {
                console.error("❌ Erreur lors de la requête :", error.response ? error.response.data : error.message);
                throw error;
            }
        }
    );
};

export const useGetPeriodeByidHotel=(id)=>{
    return useQuery({ 
        queryKey: ["Periode", id],
        queryFn: async () => {
            const response = await axios.get(`${url}/getperiodebyidhotel/${id}`);
            return response.data;
        },
        enabled: !!id,
    });
}