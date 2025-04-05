import React from "react";
import { createPopper } from "@popperjs/core";
import { useSendLogoutMutation } from "ApiSlice/authApiSlice";
import { useNavigate } from "react-router-dom";
import imageuser from "assets/img/user-fron.jpg";
import { useSelector } from "react-redux";
import { selectIsAuthorized } from 'ApiSlice/authSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
const UserDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const name = useSelector((state) => state.auth.name);
  const { collection,id } = useSelector((state) => state.auth);
  const isAuthorized = useSelector(selectIsAuthorized);
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
    const [sendLogout] = useSendLogoutMutation();
    const navigate = useNavigate();
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
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt='..'
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={imageuser}
            />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        {isAuthorized && (
          <div className="text-sm py-2 px-4 font-bold text-blueGray-700">
            {name}
          </div>
        )}
       
         {collection === "admin" && (
           <>
          <div className="h-0 my-2 border border-solid border-blueGray-100" />
         <a
          href="#pablo"
          className="flex items-center gap-2 text-sm py-2 px-4 font-medium w-full text-blueGray-700 hover:bg-gray-100 transition-all duration-200"
          onClick={() => navigate('/admin/settings')}
        >
          <FontAwesomeIcon icon={faCog} className="text-blueGray-500" />
          Settings
        </a>
          </>
          )}
           {collection === "b2b" && (
           <>
          <div className="h-0 my-2 border border-solid border-blueGray-100" />
         <a
         
          className="flex items-center gap-2 text-sm py-2 px-4 font-medium w-full text-blueGray-700 hover:bg-gray-100 transition-all duration-200"
          onClick={() => navigate(`/Daschbordb2b/Parametre/${id}`)}
        >
          <FontAwesomeIcon icon={faCog} className="text-blueGray-500" />
          Parametre
        </a>
          </>
          )}
        <div className="h-0 my-2 border-t border-blueGray-100" />

     
        <a
          href="#pablo"
          className="flex items-center gap-2 text-sm py-2 px-4 font-medium w-full text-red-500 hover:bg-red-100 transition-all duration-200"
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="text-red-500" />
          Logout
        </a>
      </div>
    </>
  );
};

export default UserDropdown;
