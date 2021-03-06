import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { HashLoader } from "react-spinners";
import { authUser } from "./redux/actions/auth";
import useAuthStore from "./hooks/auth/useAuthStore";

// pages & components
import AuthRoute from "./middlewares/AuthRoute"; // middleware component
import AdminRoute from "./middlewares/AdminRoute"; // middleware admin component
import Navbar from "./components/organisms/Navbar";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ActivateAccount from "./pages/Auth/ActivateAccount";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

export default function App() {
  const { isAuthenticated, authIsReady, role } = useAuthStore();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authUser());
  }, [dispatch]);

  return (
    <>
      {/* jika proses authentikasi belum selesai */}
      {!authIsReady && (
        <div className="loading">
          <HashLoader color="#371691" size={100} loading={!authIsReady} />
        </div>
      )}

      {/* jika proses authentication telah selesai */}
      {authIsReady && (
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            {/* public routes */}
            <Route
              path="/"
              element={
                <AuthRoute isAuthenticated={isAuthenticated}>
                  <Navbar />
                  <Landing />
                </AuthRoute>
              }
            />
            <Route
              path="/login"
              element={
                <AuthRoute isAuthenticated={isAuthenticated}>
                  <Login />
                </AuthRoute>
              }
            />
            <Route
              path="/register"
              element={
                <AuthRoute isAuthenticated={isAuthenticated}>
                  <Register />
                </AuthRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <AuthRoute isAuthenticated={isAuthenticated}>
                  <ForgotPassword />
                </AuthRoute>
              }
            />
            <Route
              path="/reset-password/:token"
              element={
                <AuthRoute isAuthenticated={isAuthenticated}>
                  <ResetPassword />
                </AuthRoute>
              }
            />

            {/* private routes */}
            <Route
              path="/home"
              element={
                <AuthRoute isAuthenticated={isAuthenticated} protect>
                  <Navbar />
                  <Home />
                </AuthRoute>
              }
            />
            <Route
              path="/posts"
              element={
                <AuthRoute isAuthenticated={isAuthenticated} protect>
                  <Navbar />
                  <Posts />
                </AuthRoute>
              }
            />
            <Route
              path="/activate/:token"
              element={
                <AuthRoute isAuthenticated={isAuthenticated} protect>
                  <Navbar />
                  <ActivateAccount />
                </AuthRoute>
              }
            />

            {/* admin routes */}
            <Route
              path="/admin"
              element={
                <AdminRoute isAuthenticated={isAuthenticated} role={role}>
                  <Navbar />
                  <Admin />
                </AdminRoute>
              }
            />

            {/* 404 routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}
