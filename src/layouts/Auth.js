import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";
import bg_5 from "../assets/img/bg_5.jpg";
import Registeragence from "views/auth/Registeragence";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ForgotPassword from "views/auth/Forgetpassword";
import ResetPassword from "views/auth/Ressetpassword";
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
         
            <Route path="login" element={ <GoogleOAuthProvider clientId="871218415760-2c819ok13v9vf8m37k284m2kig5eo6qc.apps.googleusercontent.com"><Login />  </GoogleOAuthProvider>} />
            <Route path="register" element={<Register />} />
            <Route path="RegisterAgence" element={<Registeragence />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:email" element={<ResetPassword />} />
          </Routes>

          {/* <FooterSmall absolute /> */}
        </section>
      </main>
    </>
  );
}
