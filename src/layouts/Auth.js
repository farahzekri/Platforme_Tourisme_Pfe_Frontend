import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";
import bg_5 from "../assets/img/bg_5.jpg";
import Registeragence from "views/auth/Registeragence";
export default function Auth() {
  return (
    <>
      {/* <Navbar transparent /> */}
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                `url(${bg_5})`
            }}
          ></div>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="RegisterAgence" element={<Registeragence />} />
          </Routes>

          {/* <FooterSmall absolute /> */}
        </section>
      </main>
    </>
  );
}
