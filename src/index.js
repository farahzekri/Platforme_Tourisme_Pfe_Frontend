import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import { Provider } from 'react-redux';
import { store } from './app/store';
import '../src/index.css';

import TokenChecker from "views/TokenChecker";
import NotFound from "views/Errorpages/Notfound";
import Loader from "views/Errorpages/loader";
import Unauthorized from "views/Errorpages/unauthorization";
import ProtectedRoute from "views/auth/ProtectedRoute";

import HotelList from "views/Frontoffice/Hotel/ListeHotel";

import SearchResults from "views/Frontoffice/Hotel/SearchResulta";
import BackofficeB2B from "layouts/Backoffice";
import DetailHotel from "views/Frontoffice/Hotel/DetailHotel";
import Tarifetdisponiblite from "views/Frontoffice/Hotel/Tarifetdisponibilite";
import Review from "views/Frontoffice/Hotel/Review";
import Contact from "views/Frontoffice/Acceuil/contactme";
import ReservationFormPage from "views/Frontoffice/Reservation et payement/FormulaireReservation";
import SuccessPage from "views/Frontoffice/Reservation et payement/SuccessPage";
import FailurePage from "views/Frontoffice/Reservation et payement/FailurePage";
// import ProtectedRouterprivilege from "views/auth/ProtectedRouterdeprivilege";

const queryClient = new QueryClient();


const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <TokenChecker>
            <Routes>
              <Route path="/admin/*" element={<ProtectedRoute><Admin /> </ProtectedRoute>} />
              <Route path="/Daschbordb2b/*" element={<BackofficeB2B />} />
              <Route path="/auth/*" element={<Auth />} />
              <Route path="/landing" element={<Landing />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/Unauthorized" element={<Unauthorized />} />
              <Route path="/" element={<Index />} />
              {/* <Route path="/AjouterHotel" element={< HotelAjouter/>} /> */}
              <Route path="/ListeHotel" element={< HotelList />} />
              <Route path="/DetailHotel/:id" element={<DetailHotel />} />
              <Route path="/TarifDisponiblite/:id" element={<Tarifetdisponiblite />} />
              <Route path="/AvisClient/:id" element={<Review />} />
              <Route path="/search-results" element={< SearchResults />} />
              <Route path="/reservation/:id" element={< ReservationFormPage />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/failure" element={<FailurePage />} />
              <Route path="/contact" element={< Contact />} />
              <Route path="/*" element={<NotFound />} />


            </Routes>
          </TokenChecker>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));