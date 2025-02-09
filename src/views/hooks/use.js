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
export const useGetAllB2BUsersAccpeted = () => {
  return useQuery({
    queryKey: ['b2bUsers'], 
    queryFn: async () => {
      try {
        const { data } = await axios.get(`${url}/getusersAccepted`);
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
    mutationFn: async ({ nameAgence, status, email,startDate,endDate,duration, amount}) => { // Ajout de email
      if (!token) {
        throw new Error('Token non disponible');
      }
      const { data } = await axios.post(
        `${url}/updatestatu`,
        { nameAgence, status, email ,startDate,endDate,duration,amount}, // On envoie aussi l'email
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('b2bStatus'); // Met à jour le cache après modif
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
export const useGetAgencyStats = () => {
 

  return useQuery({
    queryKey: ["agencyStats"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`${url}/getAgencyStats`);

        return data;
      } catch (error) {
        const errMessage =
          error.response?.data?.message || "Erreur lors de la récupération des statistiques.";
        toast.error(errMessage);
        throw new Error(errMessage);
      }
    },
   
    onError: () => {
      toast.error("Impossible de charger les statistiques des agences.");
    },
  });
};

export const useUpdateB2B = () => {
  const queryClient = useQueryClient();
  const token = useSelector((state) => state.auth.token);

  return useMutation({
    mutationFn: async ({ nameAgence, ...updatedData }) => {
      if (!token) {
        throw new Error("Token non disponible");
      }
      const { data } = await axios.put(
        `${url}/modifcation/${nameAgence}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data; // Retourner les données mises à jour
    },
    onSuccess: (data) => {
      // 🔄 Mettre à jour directement les données en cache
      queryClient.setQueryData(["b2bStatus", data.agence.nameAgence], data.agence);

      // 💾 Invalider pour rafraîchir si nécessaire
      queryClient.invalidateQueries("b2bStatus");
    },
  });
};

export const useDeletB2b = () => {
  return useMutation(
      async (nameAgence) => { // 💡 Assurez-vous d'utiliser nameAgence ici
          const response = await axios.delete(`${url}/delete/${nameAgence}`);
          return response.data;
      },
      {
          onSuccess: (data) => {
              toast.success(data.message || 'B2B supprimé avec succès');
          },
          onError: (error) => {
              toast.error(error?.response?.data?.message || "Erreur lors de la suppression de B2B");
          },
      }
  );
};