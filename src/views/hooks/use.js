import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
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


export const useGetAllB2BUsers = () => {
  return useQuery({
    queryKey: ['b2bUsers'], 
    queryFn: async () => {
      try {
        const { data } = await axios.get(`${url}/getuserspending`);
        return data;
      } catch (error) {
        const err = error?.response?.data?.error || 'Erreur lors de la récupération des utilisateurs.';
        toast.error(err);
        throw new Error(err);
      }
    },
    onError: () => {
      toast.error("Une erreur s'est produite lors du chargement des utilisateurs.");
    },
  });
};

export const useUpdateB2BStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }) => {
      const { data } = await axios.post(
        `${url}/updatestatu`,
        { id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Token de sécurisation
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message); // Notification de succès
      queryClient.invalidateQueries(['b2bUsers']); // Met à jour les données
    },
    onError: (error) => {
      const errMessage =
        error.response?.data?.message || 'Erreur lors de la mise à jour du statut.';
      toast.error(errMessage);
    },
  });
};
