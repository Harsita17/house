import React from "react";
import "./index.css"
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./page/HomePage";
import Offers from "./page/Offers";
import Signin from "./page/Signin";
import Signup from "./page/Signup";
import Profile from "./page/Profile";
import Forgotpassword from "./page/Forgotpassword";
import PrivateRoute from "./components/Layout/PrivateRoute";
import Category from "./page/Category";
import CreateListing from "./page/CreateListing";
import Listing from "./page/Listing";
import Contact from "./page/Contact";
import EditListing from "./page/EditListing";
import AboutUs from "./page/AboutUs";


function App() {
  return (
    
    <BrowserRouter>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/offers" element={<Offers/>}/>
      <Route path="/AboutUs" element={<AboutUs/>}/>
      <Route path="/Signin" element={<Signin/>}/>
      <Route path="/CreateListing" element={<CreateListing/>}/>
      <Route path="/Category/:CategoryName" element={<Category/>}/>
      <Route path="/EditListing/:listingId" element={<EditListing/>}/>
      <Route path="/Forgotpassword" element={<Forgotpassword/>}/>
      <Route path="/Signup" element={<Signup/>}/>
      <Route path="/Contact/:landlordId" element={<Contact/>}/>
      <Route path="/Category/:CategoryName/:listingId" element={<Listing/>}/>
      <Route path="/Profile" element={<PrivateRoute/>}>
        <Route path="/Profile" element={<Profile/>} />
      </Route>
      
    </Routes>
    </BrowserRouter>
    
  );
};

export default App;
