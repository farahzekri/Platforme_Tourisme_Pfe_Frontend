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


export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
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
            <Route path="listadmin" element={<ListAdmin/>}/>
            
          </Routes>
          
          {/* <FooterAdmin /> */}
        </div>
      </div>
    </>
  );
}
