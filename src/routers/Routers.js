import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import OnlyIfLoggedIn from "../components/Verification/OnlyIfLoggedIn";
import OnlyIfNotLoggedIn from "../components/Verification/OnlyIfNotLoggedIn";
import PaymentSuccess from "../pages/PaymentSuccess";
import Orders from "../pages/Orders";

const Routers = () => {
  return (
    <Routes>
      <Route element={<OnlyIfNotLoggedIn />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route element={<OnlyIfLoggedIn />}>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cars" element={<CarListing />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
