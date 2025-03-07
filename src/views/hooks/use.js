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
        toast.success("Agence enregistrée avec succès !");
        return data;
      } catch (error) {
        const err = error?.response?.data?.error;
        toast.error(err || "Échec de l'inscription !");
        throw error;
      }
    },
  });
};
export const useAddAgence = () => {
  const token = useSelector((state) => state.auth.token);

  return useMutation({
    mutationFn: async (userData) => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.post(`${url}/agence/add`, userData, config);

        toast.success("Agence ajoutée avec succès !");
        return data;
      } catch (error) {
        const err = error?.response?.data?.error;
        toast.error(err || "Échec de l'ajout !");
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
  const token = useSelector((state) => state.auth.token); // Récupérer le token

  return useMutation(
      async (nameAgence) => {
          const config = {
              headers: { Authorization: `Bearer ${token}` },
          };

          const response = await axios.delete(`${url}/delete/${nameAgence}`, config);
          return response.data;
      },
      {
          onSuccess: (data) => {
              toast.success(data.message || 'Agence supprimée avec succès');
          },
          onError: (error) => {
              toast.error(error?.response?.data?.message || "Erreur lors de la suppression de l'agence");
          },
      }
  );
};
export const useSendPasswordResetEmail = () => {
  return useMutation({
    mutationFn: async (email) => {
      try {
        const { data } = await axios.post(`${url}/send-password-reset-email`, { email });
        toast.success(data.message || "Email de réinitialisation envoyé !");
        return data;
      } catch (error) {
        const err = error?.response?.data?.error;
        toast.error(err || "Erreur lors de l'envoi de l'email !");
        throw error;
      }
    },
  });
};
export const useResetPassword = () => {
  return useMutation({
    mutationFn: async ({ email, newPassword }) => {
      try {
        // Envoi du email et du nouveau mot de passe dans la requête
        const { data } = await axios.post(`${url}/reset-password/${email}`, 
          { newPassword },
          { headers: { 'Content-Type': 'application/json' } }
        );
        toast.success(data.message || "Mot de passe réinitialisé avec succès !");
        return data;
      } catch (error) {
        const err = error?.response?.data?.error;
        toast.error(err || "Erreur lors de la réinitialisation du mot de passe !");
        throw error;
      }
    },
  });
};