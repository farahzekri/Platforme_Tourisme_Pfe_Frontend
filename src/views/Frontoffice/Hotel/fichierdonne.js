import { FaWineGlassAlt,FaCoffee, FaSwimmingPool, FaHotel, FaBaby, FaUtensils, FaMountain, FaSun, FaHome, FaBed, FaUsers, FaSpa, FaKey, FaLeaf, FaGlassWhiskey, FaPizzaSlice } from 'react-icons/fa';

export const supplementsOptions = [
    { value: "Diner noel", label: "Supplément Dîner Noël", icon: <FaWineGlassAlt style={{ color: "#ff6347" }} /> },
    { value: "Diner saint sylvestre", label: "Supplément Dîner Saint-Sylvestre", icon: <FaWineGlassAlt style={{ color: "#ff6347" }} /> },
    { value: "Diner saint valentin", label: "Supplément Dîner Saint-Valentin", icon: <FaWineGlassAlt style={{ color: "#ff6347" }} /> },
    { value: "Vue Mer", label: "Supplément Vue Mer", icon: <FaSun style={{ color: "#ffa500" }} /> },
    { value: "suite", label: "Supplément Suite", icon: <FaHotel style={{ color: "#4b0082" }} /> },
    { value: "Vue Picine", label: "Supplément Vue Piscine", icon: <FaSwimmingPool style={{ color: "#1e90ff" }} /> },
    { value: "Vue Jardin", label: "Supplément Vue Jardin", icon: <FaLeaf style={{ color: "#228b22" }} /> },
    { value: "Vue Montagne", label: "Supplément Vue Montagne", icon: <FaMountain style={{ color: "#8b4513" }} /> },
    { value: "chambre Prestige", label: "Supplément Chambre Prestige", icon: <FaBed style={{ color: "#d2691e" }} /> },
    { value: "lit bebe", label: "Supplément Lit Bébé", icon: <FaBaby style={{ color: "#ffb6c1" }} /> },
    { value: "buffet", label: "Supplément Buffet", icon: <FaUtensils style={{ color: "#32cd32" }} /> },
    { value: "chambre_superieure", label: "Supplément Chambre Supérieure", icon: <FaHotel style={{ color: "#4b0082" }} /> },
    { value: "bungalow", label: "Supplément Bungalow", icon: <FaHome style={{ color: "#ff4500" }} /> },
    { value: "lit supplementaire lpd", label: "Supplément Lit Supplémentaire en LPD", icon: <FaBed style={{ color: "#d2691e" }} /> },
    { value: "menzel", label: "Supplément Menzel", icon: <FaHome style={{ color: "#ff4500" }} /> },
    { value: "Suite familiale", label: "Suite Familiale", icon: <FaUsers style={{ color: "#4682b4" }} /> },
    { value: "cure vitalite", label: "Cure de Vitalité (3 soins)", icon: <FaSpa style={{ color: "#6a5acd" }} /> },
    { value: "chambre communicantes single", label: "Supplément Chambre Communicantes Single", icon: <FaKey style={{ color: "#808080" }} /> },
    { value: "suite terrasse panoramique_single", label: "Supplément Suite Terrasse Panoramique Single", icon: <FaSun style={{ color: "#ffa500" }} /> },
    { value: "chambre deluxe Vue Mer", label: "Supplément Chambre Deluxe Vue Mer", icon: <FaSun style={{ color: "#ffa500" }} /> }
];




export const arrangementOptions = [
    { value: "logement simple", label: "Logement Simple", icon: <FaHome style={{ color: "#228b22" }} /> },
    { value: "petit déjeuner", label: "Petit Déjeuner", icon: <FaCoffee style={{ color: "#ff6347" }} /> },
    { value: "demi-pension", label: "Demi-Pension", icon: <FaUtensils style={{ color: "#ffa500" }} /> },
    { value: "pension complète", label: "Pension Complète", icon: <FaPizzaSlice  style={{ color: "#d2691e" }} /> },
    { value: "all inclusive", label: "All Inclusive", icon: <FaGlassWhiskey style={{ color: "#32cd32" }} /> }
];