import React from "react";
import {  Route, Routes } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
// import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import Preselction from "views/admin/Preselection";
import ListAdmin from "views/admin/gestion_admin/list_admin";
import DetailAgence from "views/admin/detailagence";
import Inscription from "views/admin/inscription";
import Historique from "views/admin/Historique";



export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-200">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <Routes>
            <Route path="dashboard" element={
             
              <Dashboard />
             
              } />
            <Route path="maps" element={<Maps />} />
            <Route path="settings" element={<Settings />} />
            <Route path="tables" element={<Tables />} />
            <Route path="preselction" element={<Preselction/>}/>
            <Route path="details/:nameAgence" element={<DetailAgence/>}/>
            <Route path="inscription" element={<Inscription/>}/>
            <Route path="listadmin" element={<ListAdmin/>}/>
            <Route path="Historique" element={<Historique/>}/>
          </Routes>
          
          {/* <FooterAdmin /> */}
        </div>
      </div>
    </>
  );
}
