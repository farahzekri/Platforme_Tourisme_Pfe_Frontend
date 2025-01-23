import  { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRefreshMutation } from 'ApiSlice/authApiSlice';
import { setCredentials } from 'ApiSlice/authSlice'; 
import { useNavigate } from 'react-router-dom';
const TokenChecker = ({ children }) => {
    const dispatch = useDispatch();
    const [refresh] = useRefreshMutation();
    const navigate=useNavigate();
    useEffect(() => {
        const checkRefreshToken = async () => {
          try {
            const data = await refresh().unwrap();
            console.log('Token rafraîchi avec succès:', data);
            const { accessToken, collection, email, name, statue } = data;
            dispatch(setCredentials({ accessToken, collection, email, name, statue }));
          } catch (err) {
            console.log('Erreur lors du rafraîchissement du token:', err);
            navigate('/auth/login'); 
          }
        };
    
        checkRefreshToken();
      }, [dispatch, refresh, navigate]);

    return children;
};

export default TokenChecker;
