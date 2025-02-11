import { useQuery } from 'react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';

export const useGetHistory = () => {
    const token = useSelector((state) => state.auth.token);
    
    return useQuery('history', async () => {
      if (!token) {
        throw new Error("Token non disponible. Veuillez vous reconnecter.");
      }
  
      try {
        const response = await axios.get('http://localhost:5000/History/gethistrique', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); // Correction de la syntaxe ici
        return response.data;
      } catch (error) {
        throw new Error('Erreur lors de la récupération de l\'historique');
      }
    });
  };