import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useSelector } from "react-redux";


// const api = axios.create({
//   baseURL: "http://localhost:5000/admin",
//   withCredentials: true,
// });


// api.interceptors.response.use(
//   (response) => response, 
//   (error) => {
//       if (error.response?.status === 403) {

//           window.location.href = "/unauthorized"; // 🚀 Redirige
//       }
//       return Promise.reject(error);
//   }
// );

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
    queryKey: ["admins"],
    queryFn: async () => {
      if (!token) {
        throw new Error("Token non disponible. Veuillez vous reconnecter.");
      }

      try {
        const { data } = await axios.get(`${url}/getall`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!Array.isArray(data)) {
          throw new Error("Les données reçues ne sont pas un tableau.");
        }

        return data;
      } catch (error) {
        const errMessage =
          error.response?.data?.error || "Erreur lors de la récupération des admins.";
        toast.error(errMessage);
        throw new Error(errMessage);
      }
    },
    enabled: !!token, // Empêche la requête si le token est absent
    onError: () => {
      toast.error("Impossible de charger les administrateurs.");
    },
  });
};

  export const useDeleteAdmin = (username) => {
    const token = useSelector((state) => state.auth.token);

    return useMutation(
        async () => {
            if (!token) {
                throw new Error('Token non disponible');
            }

            const response = await axios.delete(`${url}/delete/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        },
        {
            onSuccess: (data) => {
                toast.success(data.message || 'Admin supprimé avec succès');
            },
            onError: (error) => {
                toast.error(error?.response?.data?.message || "Erreur lors de la suppression de l'admin");
            },
        }
    );
};

export const useGetAdminStats = () => {
 

  return useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      

      try {
        const { data } = await axios.get(`${url}/count`);
        return data;
      } catch (error) {
        const errMessage =
          error.response?.data?.message || "Erreur lors de la récupération des statistiques.";
      
        throw new Error(errMessage);
      }
    },

    onError: () => {
      toast.error("Impossible de charger les statistiques des administrateurs.");
    },
  });
};
export const useUpdateAdmin = () => {
  const token = useSelector((state) => state.auth.token);
  const currentUsername = useSelector((state) => state.auth.name); 

  return useMutation(
      async ({ newUsername, newEmail }) => {
          if (!token) {
              throw new Error('Token non disponible');
          }

          const response = await axios.put(
              `${url}/updateuser/${currentUsername}`,
              { newUsername, newEmail },
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
          );

          return response.data;
      },
      {
          onSuccess: (data) => {
              toast.success(data.message || 'Profil mis à jour avec succès');
          },
          onError: (error) => {
              toast.error(error?.response?.data?.message || "Erreur lors de la mise à jour du profil");
          },
      }
  );
};