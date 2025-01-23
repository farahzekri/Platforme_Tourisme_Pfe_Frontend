import React, { useEffect, useRef, useState } from "react";
import { validateFieldRegistre } from "./validation";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setCredentials } from "ApiSlice/authSlice";
import { useLoginMutation } from "ApiSlice/authApiSlice";
export default function Login() {
  const userRef = useRef()
  const errRef = useRef()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({});
  const [login, { isLoading }] = useLoginMutation()
  useEffect(() => {
    userRef.current.focus()
  }, [])
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
      console.log('Response from login:', response);
      const { accessToken, collection, statue } = response;
      console.log("Collection:", collection);


      dispatch(setCredentials({ accessToken, collection, statue }));

      setEmail('');
      setPassword('');


      if (collection === 'admin') {
        navigate('/admin');
      } else if (collection === 'b2b') {
        navigate('/');
      }
    } catch (err) {
      setErrMsg('Login failed!');
    }
  };
  const errClass = errMsg ? "errmsg" : "offscreen"

  if (isLoading) return <p>Loading..</p>

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign in with
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
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("assets/img/google.svg").default}
                    />
                    Google
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign in with credentials</small>
                </div>
                <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-700 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-2 py-1">
                      <i className="fas fa-envelope"></i>
                    </span>
                    <input
                      type="email"
                      ref={userRef}
                      value={email}
                      onChange={handleUserInput}
                      className={`px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10 ${errors.email ? 'border-red-500 bg-red-50' : ''
                        }`}
                      placeholder="Email"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-300">
                        <span className="font-medium ">Erreur:</span> {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-700 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-2 py-1">
                      <i className="fas fa-lock"></i>
                    </span>
                    <input
                      type="password"
                      onChange={handlepwdInput}
                      value={password}
                      className={`px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10 ${errors.password ? 'border-red-500 bg-red-50' : ''
                        }`}
                      placeholder="Password"
                    />
                    {errors.password && (
                      <p className="mt-2 text-sm text-red-300">
                        <span className="font-medium ">Erreur:</span> {errors.password}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleSubmit}
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="flex flex-wrap mt-6 relative">
                    <div className="w-1/2">
                      <a
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        className="text-blueGray-800"
                      >
                        <small>Forgot password?</small>
                      </a>
                    </div>
                    <div className="w-1/2 text-right">
                      <div>
                        <Link to="/auth/register" className="text-blueGray-800">
                          <small>Create new account</small>
                        </Link>
                      </div>
                      <Link to="/auth/RegisterAgence" className="text-blueGray-800">
                        <small>Create new account Pro</small>
                      </Link>

                    </div>
                  </div>

                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
