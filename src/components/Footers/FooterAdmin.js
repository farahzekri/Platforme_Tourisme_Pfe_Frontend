import React from "react";
import { CiFacebook, CiInstagram, CiLinkedin, CiTwitter } from "react-icons/ci";
export default function FooterAdmin() {
  return (
    <>
      <footer className="block py-4 mt-20 ">
        <div className="container mx-auto px-4">
          <hr className="mb-4 border-b-1 border-blueGray-200" />
          <div className="flex flex-col items-center text-center">
            <div className="social pb-6">
              <a href="#" className="text-gray-600 hover:opacity-80 transition-opacity duration-300 mx-2 p-2 inline-block rounded-full border border-gray-300 text-2xl">
                <CiInstagram />
              </a>
              <a href="#" className="text-gray-600 hover:opacity-80 transition-opacity duration-300 mx-2 p-2 inline-block rounded-full border border-gray-300 text-2xl">
               <CiFacebook />
              </a>
              <a href="#" className="text-gray-600 hover:opacity-80 transition-opacity duration-300 mx-2 p-2 inline-block rounded-full border border-gray-300 text-2xl">
              <CiTwitter />
              </a>
              <a href="#" className="text-gray-600 hover:opacity-80 transition-opacity duration-300 mx-2 p-2 inline-block rounded-full border border-gray-300 text-2xl">
              <CiLinkedin />
              </a>
            </div>
            <ul className="list-none text-lg space-x-4 mb-0">
              <li className="inline-block">
                <a href="#" className="text-gray-600 hover:opacity-80 transition-opacity duration-300">Home</a>
              </li>
              <li className="inline-block">
                <a href="#" className="text-gray-600 hover:opacity-80 transition-opacity duration-300">Services</a>
              </li>
              <li className="inline-block">
                <a href="#" className="text-gray-600 hover:opacity-80 transition-opacity duration-300">About</a>
              </li>
              <li className="inline-block">
                <a href="#" className="text-gray-600 hover:opacity-80 transition-opacity duration-300">Terms</a>
              </li>
              <li className="inline-block">
                <a href="#" className="text-gray-600 hover:opacity-80 transition-opacity duration-300">Privacy Policy</a>
              </li>
            </ul>
            <p className="copyright text-gray-400 text-sm mt-4">Hubs Travail © 2018</p>
          </div>
        </div>
      </footer>
    </>
  );
}
