import React, { useEffect, useRef, useState } from "react";
import { validateFieldRegistre } from "./validation";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setCredentials } from "ApiSlice/authSlice";
import { useLoginMutation } from "ApiSlice/authApiSlice";
import Alert from "components/Alert/Alert";
import InputField from "components/InputField/inputField";
import { useRegisterWithGoogleMutation } from "ApiSlice/authApiSlice";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
export default function Login() {

  const errRef = useRef()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [errors, setErrors] = useState({});
  const [lockoutTime, setLockoutTime] = useState(0);
  const timerRef = useRef(null);
  const [login, { isLoading }] = useLoginMutation();
  const [registerWithGoogle, { isLoadingR }] = useRegisterWithGoogleMutation();
  useEffect(() => {
    if (lockoutTime > 0) {
      timerRef.current = setInterval(() => {
        setLockoutTime((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [lockoutTime]);
  useEffect(() => {
    setErrMsg('')
  }, [email, password])
  const handleUserInput = (e) => {
    const { value } = e.target;
    setEmail(value);
    const errorMessage = validateFieldRegistre('email', value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: errorMessage,
    }));
  };

  const handlepwdInput = (e) => {
    const { value } = e.target;
    setPassword(value);
    const errorMessage = validateFieldRegistre('password', value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: errorMessage,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      const { accessToken, collection, statue } = response;

      dispatch(setCredentials({ accessToken, collection, statue }));

      setEmail("");
      setPassword("");
      if (collection === "b2b" && statue === "en attente") {
        setAlertMessage("Votre compte est en attente d'approbation par le Super Admin.");
        setAlertType("error");

        setTimeout(() => {
          setAlertMessage("");
        }, 3000);
        return;
      }

      setAlertMessage("Connexion réussie !");
      setAlertType("success");

      setTimeout(() => {
        setAlertMessage("");
        if (collection === "admin") {
          navigate("/admin");
        } else if (collection === "b2b" && statue === "approuvée") {
          navigate("/");
        }
      }, 2000);
    } catch (err) {
      if (err.status === 429) {
        const retryAfter = err.data.retryAfter || 60;
        setLockoutTime(retryAfter);
        setErrMsg("Trop de tentatives. Réessayez après " + retryAfter + " secondes.");
      }
      setAlertMessage("Connexion échouée ! Vérifiez vos identifiants.");
      setAlertType("error");

      setTimeout(() => {
        setAlertMessage("");
      }, 3000);
    }
  };

  const handleGoogleSuccess = async (googleUser) => {
    const idToken = googleUser.credential;
  
    // Décode le jeton ou appelle l'API Google pour obtenir les informations de l'utilisateur
    const googleData = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${idToken}`)
      .then(response => response.json())
      .catch(err => console.error("Erreur lors de la récupération des données utilisateur Google :", err));
  
    if (googleData) {
      const { email, given_name: firstName, family_name: lastName } = googleData;
      console.log('Google Data:', { email, firstName, lastName });
  
      try {
        // Vérifier que vous envoyez les bonnes données dans votre requête
        const response = await registerWithGoogle({ email, firstName, lastName }).unwrap();
        console.log('Response from Google Auth:', response);
        dispatch(setCredentials({ user: response.user, accessToken: response.accessToken }));
        navigate('/');
      } catch (err) {
        console.error("Erreur lors de l'authentification Google :", err.response ? err.response.data : err);
      }
    } else {
      console.error("Erreur lors du décodage du jeton Google");
    }
  };
  const errClass = errMsg ? "errmsg" : "offscreen"

  if (isLoading && isLoadingR) return <p>Loading..</p>

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Connectez-vous avec
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("assets/img/github.svg").default}
                    />
                    Github
                  </button>
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleGoogleSuccess}
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("assets/img/google.svg").default}
                    />
                    Google
                  </button>
                  <GoogleLogin
               
                    buttonText="Login with Google"
                    onSuccess={handleGoogleSuccess}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                   
                    // isSignedIn={true} // This forces the prompt even if the user is already signed in
                    
                  />
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Ou connectez-vous avec vos identifiants</small>
                </div>
                <Alert message={alertMessage} type={alertType} />
                <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
                {lockoutTime > 0 ? (
                  <p className="text-red-700">Réessayez dans {lockoutTime} secondes</p>
                ) : (
                  <form>
                    <InputField
                      label="Email"
                      type="email"
                      icon="fas fa-envelope"
                      value={email}
                      onChange={handleUserInput}
                      placeholder="Email"
                      error={errors.email}
                    />
                    <InputField
                      label="Mot de passe"
                      type="password"
                      icon="fas fa-lock"
                      value={password}
                      onChange={handlepwdInput}
                      placeholder="Enter your password"
                      error={errors.password}
                    />
                    <div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          id="customCheckLogin"
                          type="checkbox"
                          className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                        />
                        <span className="ml-2 text-sm font-semibold text-blueGray-600">
                          Souviens-toi de moi
                        </span>
                      </label>
                    </div>

                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleSubmit}
                      >
                        Se connecter
                      </button>
                    </div>
                    <div className="flex flex-wrap mt-6 relative">
                      <div className="w-1/2">
                      <Link  to="/auth/forgot-password">
                        <a
                          href="#pablo"
                         
                          className="text-blueGray-800"
                        >
                          <small>Mot de passe oublié ?</small>
                        </a>
                        </Link>
                      </div>
                      <div className="w-1/2 text-right">

                        <Link to="/auth/RegisterAgence" className="text-blueGray-800">
                          <small>Créer un compte Pro</small>
                        </Link>

                      </div>
                    </div>

                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
