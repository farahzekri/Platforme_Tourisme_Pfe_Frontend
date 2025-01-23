/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
// components
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import image from '../../assets/img/hubs-logo.jpg'
import { useSendLogoutMutation } from "ApiSlice/authApiSlice";

export default function Navbar(props) {
  const navigate = useNavigate();
  const [sendLogout, { isLoading, isError, error }] = useSendLogoutMutation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const dispatch = useDispatch();
  const { collection, email, username } = useSelector((state) => state.auth);
  const handleLogout = async () => {
    try {
      await sendLogout().unwrap(); 
      navigate('/auth/login'); 
    } catch (err) {
      console.error('Erreur lors de la déconnexion:', err);
    }
  };
  return (
    <>
      <nav
        className={`fixed w-full top-0 z-50 transition-all    duration-300 ${isScrolled ? 'bg-white shadow' : 'bg-white/80 backdrop-blur-lg'
          }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          {/* Brand */}
         <img src={image} className="h-20 w-auto" /> 



          {/* Navbar Links */}
          <div className="hidden md:flex items-center space-x-8 font-bold text-black">
            <a
              href="/"
              className=" px-4 hover:text-primary  transition duration-300"
            >
              Home
            </a>
            <a
              href="/about"
              className="px-4 hover:text-primary transition duration-300"
            >
              About
            </a>
            <a
              href="/destination"
              className="px-4 hover:text-primary transition duration-300"
            >
              Destination
            </a>
            <a
              href="/hotel"
              className="px-4 hover:text-primary transition duration-300"
            >
              Hotel
            </a>
            <a
              href="/blog"
              className="px-4 hover:text-primary transition duration-300"
            >
              Blog
            </a>
            <a
              href="/contact"
              className="px-4 hover:text-primary transition duration-300"
            >
              Contact
            </a>

            {/* Buttons */}
            {!collection ? (
              // Si l'utilisateur n'est pas connecté, afficher Login et Register
              <>
                <Link to="/auth/login">
                  <button className="px-4 py-2 rounded-md bg-primary text-white font-semibold hover:bg-primary/90 transition duration-300">
                    Login
                  </button>
                </Link>
                <Link to="/auth/RegisterAgence">
                  <button className="px-4 py-2 rounded-md border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition duration-300">
                    Register
                  </button>
                </Link>
              </>
            ) : (
              // Si l'utilisateur est connecté
              <>
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    id="user-menu-button"
                    aria-expanded="false"
                    data-dropdown-toggle="user-dropdown"
                    data-dropdown-placement="bottom"
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="w-8 h-8 rounded-full text-gray-800">
                      <FaUserCircle className="w-full h-full" />
                    </div>
                  </button>
                  <div
                    className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="user-dropdown"
                  >
                    <div className="px-4 py-3">
                      <span className="block text-sm text-gray-900 dark:text-white">{username}</span>
                      <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{email}</span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                      <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                          Settings
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                          Earnings
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                          Sign out
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <button 
                className="px-4 py-2 rounded-md border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition duration-300"
                onClick={handleLogout}
                >
                    logout
                  </button>
                {collection === "b2b" && (
                  <Link to="/add-offer">
                    <button className="px-4 py-2 rounded-md bg-secondary text-white font-semibold hover:bg-secondary/90 transition duration-300">
                      Ajouter une offre
                    </button>
                  </Link>
                )}

              </>
            )}
          </div>
        </div>
      </nav >
    </>
  );
}
