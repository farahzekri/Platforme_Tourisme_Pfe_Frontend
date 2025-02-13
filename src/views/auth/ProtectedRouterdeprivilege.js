import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRouterprivilege = ({ allowedRoles, allowedPrivileges }) => {
    const { role, privilege } = useSelector((state) => state.auth);

    // Vérifie si l'utilisateur a le bon rôle ou privilège
    const hasAccess =
      allowedRoles.includes(role) || (allowedPrivileges && allowedPrivileges.includes(privilege));
  
    return hasAccess ? <Outlet /> : <Navigate to="/Unauthorized" replace />;
  
};

export default ProtectedRouterprivilege;