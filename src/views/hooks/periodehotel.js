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
export const useGetHotelsWithPrice = () => {
    return useQuery({
        queryKey: ["hotelsWithPrice"],
        queryFn: async () => {
            const response = await axios.get(`${url}/gethotels`);
            return response.data;
        },
    });
};
export const useGetHotelsbyidWithPrice = (hotelId) => {
    console.log("Fetching Hotel ID:", hotelId);
    
    return useQuery({
        queryKey: ["hotelDetails", hotelId ?? "no-id"],
        queryFn: async () => {
            if (!hotelId) return null;
            const response = await axios.get(`${url}/getdetailHotel/${hotelId}`);
            console.log("API Response:", response.data); 
            return response.data; // Ajuste ici si la structure est différente
        },
        enabled: !!hotelId, 
    });
};
export const useUpdatePeriode = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, formData }) => {
            const response = await axios.put(`${url}/upadeperiode/${id}`, formData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["periode"]); 
        }
    });
};
export const useGetPeriodeById = (id) => {
    return useQuery(["periode", id], async () => {
        const response = await axios.get(`${url}/getperiodebyidperiode/${id}`);
        return response.data;
    }, {
        enabled: !!id, 
    });
};

export const useDeletePeriode= () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (PeriodeId) => {
            const response = await axios.delete(`${url}/deleteperiode/${PeriodeId}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["Periode"]); 
        }
    });
};