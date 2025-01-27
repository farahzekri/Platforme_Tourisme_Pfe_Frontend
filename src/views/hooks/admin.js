import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useSelector } from "react-redux";

const url = 'http://localhost:5000/admin';


export const useCreateAdmin = () => {
    const queryClient = useQueryClient();
    const token = useSelector((state) => state.auth.token);
    return useMutation(
        async (newAdmin) => {
          if (!token) {
            throw new Error('Token non disponible');
          }
            const { data } = await axios.post(`${url}/create`, newAdmin, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data;
        },
        {
            onSuccess: (data) => {
                toast.success('Admin créé avec succès.');
                queryClient.invalidateQueries(['admins']);
            },
            onError: (error) => {
                const errMessage = error?.response?.data?.message || 'Erreur lors de la création de l’admin.';
                toast.error(errMessage);
            },
        }
    );
};

  export const useGetAllAdmins = () => {
    
    const token = useSelector((state) => state.auth.token);
    
    return useQuery({
      queryKey: ['admins'],
      queryFn: async () => {
        try {
          // Vérifie que le token existe
          if (!token) {
            throw new Error('Token non disponible');
          }
  
          const { data } = await axios.get(`${url}/getall`, {
            headers: {
              Authorization: `Bearer ${token}`, // Utilise le token depuis Redux
            },
          });
          return data;
        } catch (error) {
          const err = error?.response?.data?.error || 'Erreur lors de la récupération des admins.';
          toast.error(err);
          throw new Error(err);
        }
      },
      onError: () => {
        toast.error("Une erreur s'est produite lors du chargement des admins.");
      },
    });
  };





