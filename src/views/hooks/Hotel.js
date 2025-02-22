import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUserId } from '../../ApiSlice/authSlice'; // Import du sélecteur d'ID
const url = 'http://localhost:5000/hotel';
export const useCreateHotel = () => {
    const token = useSelector(selectCurrentToken);
    const userId = useSelector(selectCurrentUserId); 
    console.log("User ID from Redux:", userId);
    console.log("Token from Redux:", token);
    return useMutation(async (hotelData) => {
        if (!token) {
            throw new Error("Token non disponible. Veuillez vous reconnecter.");
        }
        if (!userId) {
            throw new Error("ID utilisateur non trouvé.");
        }

        const response = await axios.post(`${url}/createhotel`, 
            { ...hotelData, b2bId: userId }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;
    });
};

export const useGetHotels = () => {
    const token = useSelector(selectCurrentToken);
    const userId = useSelector(selectCurrentUserId);

    return useQuery({
        queryKey: ["hotels", userId],  
        queryFn: async () => {
            if (!token) {
                throw new Error("Token non disponible. Veuillez vous reconnecter.");
            }
            if (!userId) {
                throw new Error("ID utilisateur non trouvé.");
            }

            const response = await axios.get(`${url}/gethotelbyid`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        },
        enabled: !!token && !!userId,  
    });
};