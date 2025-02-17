import  { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRefreshMutation } from 'ApiSlice/authApiSlice';
import { setCredentials } from 'ApiSlice/authSlice'; 
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
const TokenChecker = ({ children }) => {
  const dispatch = useDispatch();
  const [refresh] = useRefreshMutation();
  const navigate = useNavigate();

  useEffect(() => {
      let isMounted = true;
      let refreshTimeout;

      const checkAndRefreshToken = async () => {
          try {
              const data = await refresh().unwrap();
              console.log('Token rafraîchi avec succès:', data);

              const { accessToken, collection, email, name, statue,role,privilege } = data;
              dispatch(setCredentials({ accessToken, collection, email, name, statue,role,privilege }));

              // Décode le token pour obtenir son expiration
              const decoded = jwtDecode(accessToken);
              const expirationTime = decoded.exp * 1000;
              const currentTime = Date.now();
              const timeUntilExpiration = expirationTime - currentTime;

              console.log(`Le token expire dans ${timeUntilExpiration / 1000} secondes`);


              if (timeUntilExpiration > 5000) {
                  refreshTimeout = setTimeout(checkAndRefreshToken, timeUntilExpiration - 5000);
              }
          } catch (err) {
              console.log('Erreur lors du rafraîchissement du token:', err);
               
          }
      };

      checkAndRefreshToken();

      return () => {
          isMounted = false;
          clearTimeout(refreshTimeout);
      };
  }, [dispatch, refresh, navigate]);

  return children;
};

export default TokenChecker;
