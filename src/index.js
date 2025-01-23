import React from "react";
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
import{store} from './app/store';
import '../src/index.css';

import TokenChecker from "views/TokenChecker";
const queryClient = new QueryClient();
ReactDOM.render(
  <QueryClientProvider client={queryClient}>
     <Provider store={store}>
  <BrowserRouter>
   <TokenChecker>
    <Routes>
     
       
      <Route path="/admin/*" element={
        
        <Admin />
       
        } />
        <Route path="/auth/*" element={
          
          <Auth />
          
          } />
        <Route path="/landing" element={
          
          <Landing />
          
          } />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={
          
          <Index />
          
          } />
      </Routes>
      </TokenChecker>
  </BrowserRouter>
  </Provider>
  </QueryClientProvider>,
  document.getElementById("root")
);
