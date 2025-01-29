import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

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
  const token = useSelector((state) => state.auth.token);
  return useMutation({
    mutationFn: async ({ nameAgence, status }) => {
      if (!token) {
        throw new Error('Token non disponible');
      }
      const { data } = await axios.post(
        `${url}/updatestatu`,
        { nameAgence, status },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(['b2bUsers']); 
    },
    onError: (error) => {
      const errMessage =
        error.response?.data?.message || 'Erreur lors de la mise à jour du statut.';
      toast.error(errMessage);
    },
  });
};
export const useGetB2BByNameAgence = (nameAgence) => {
  return useQuery({
    queryKey: ['b2bUser', nameAgence], 
    queryFn: async () => {
      try {
        const { data } = await axios.get(`${url}/getusebyname/${nameAgence}`);
        console.log('API Response:', data); 
        return data;
      } catch (error) {
        const err = error?.response?.data?.message || "Erreur lors de la récupération de l'agence.";
        toast.error(err);
        throw new Error(err);
      }
    },
    enabled: !!nameAgence, 
    onError: () => {
      toast.error("Une erreur s'est produite lors du chargement de l'agence.");
    },
  });
};