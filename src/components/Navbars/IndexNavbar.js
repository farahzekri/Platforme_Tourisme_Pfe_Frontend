/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaFileContract, FaHotel, FaList, FaUserCircle } from "react-icons/fa";
// components
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import image from '../../assets/img/hubs-logo.jpg'
import { useSendLogoutMutation } from "ApiSlice/authApiSlice";
import UserDropdown from "components/Dropdowns/UserDropdown";
import HotelDropdown from "components/Dropdowns/HotelDropdown";

export default function Navbar(props) {
  const navigate = useNavigate();
  const [sendLogout, { isLoading, isError, error }] = useSendLogoutMutation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHotelOpen, setIsHotelOpen] = useState(false);
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
  const { collection, typeAgence } = useSelector((state) => state.auth);
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
              Accueil
            </a>

            <a
              href="/destination"
              className="px-4 hover:text-primary transition duration-300"
            >
              Destination
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


                {collection === "b2b" && (
                  <>
                  <Link to="/add-offer">
                    <button className="px-4 hover:text-primary transition duration-300">
                      Les offre
                    </button>
                  </Link>
                   <Link to="/Daschbordb2b">
                   <button className="px-4 hover:text-primary ">
                     Daschbord
                   </button>
                 </Link>
                 </>
                )}
                 <HotelDropdown/>
               
                <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
                  <UserDropdown />
                </ul>
              </>
            )}
          </div>
        </div>
      </nav >
    </>
  );
}
