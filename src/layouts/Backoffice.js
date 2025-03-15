
import Navbarb2b from "../views/Backofficeb2b/composant/navbar";
import HotelAjouter from "../views/Backofficeb2b/Hotel/AjouterHotel";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../views/Backofficeb2b/composant/Siderbar";
import { HotelListDachbord } from "views/Backofficeb2b/Hotel/Listhotel";
import { PeriodeHotel } from "views/Backofficeb2b/Hotel/Periode";
import AjouterPeriode from "views/Backofficeb2b/Hotel/AjouterPeriode";
import FooterAdmin from "components/Footers/FooterAdmin";
import HotelRoomAvailability from "views/Backofficeb2b/Hotel/HotelDisponibleroom";
import HotelDetails from "views/Backofficeb2b/Hotel/Detailhotel";



export default function BackofficeB2B(){
    return (
        <>
          <Sidebar/>
        
          <div className="relative md:ml-64 bg-blueGray-200">
          <Navbarb2b/>
          <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Routes>
          <Route path="/AjouterHotel" element={< HotelAjouter/>} />
          <Route path="/ListeHotel" element={< HotelListDachbord/>} />
          <Route path="/ListePeriodeParhotel/:hotelId" element={< PeriodeHotel/>} />
          <Route path="/AjouterPeriode/:hotelId" element={< AjouterPeriode/>} />
          <Route path="/UpdateRoomAvailobel/:hotelId" element={< HotelRoomAvailability/>} />
          <Route path="/DetailHotel/:id" element={<HotelDetails/>} />
          </Routes>
            </div>
            <FooterAdmin/>
            </div>
        </>
    )
}