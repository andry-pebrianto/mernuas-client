import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import useLogin from "../../hooks/auth/useLogin";
import useAuthStore from "../../hooks/auth/useAuthStore";

// components & other assets
import FloatingInput from "../../components/atoms/FloatingInput";
import AuthBanner from "../../components/molecules/AuthBanner";
import loginBg from "./login.webp";
import Logo from "../../components/atoms/Logo";
import PasswordInput from "../../components/atoms/PasswordInput";
import Google from "../../components/molecules/Google";
import Facebook from "../../components/molecules/Facebook";
import Github from "../../components/molecules/Github";

export default function Login() {
  const { isAuthenticated } = useAuthStore();
  const { login, errors, isPending, finished } = useLogin();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    document.title = "Mernuas - Login";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;
    // logged in user
    login({ email, password });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // jika berhasil terauthentikasi, arahkan ke home
  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <AuthBanner
          title="Saya ingin membuat akun baru."
          textLink="Create Account"
          href="/register"
          bannerBg={loginBg}
        />
        <div className="col my-4">
          <div className="d-flex align-items-center">
            <Link to="/" className="me-auto text-decoration-none fs-5">
              <Logo color="#4285F4" />
              <span className="ms-2">Mernuas</span>
            </Link>
            <Link
              to="/register"
              className="btn btn-outline-primary super-mini-hide"
            >
              Create Account
            </Link>
          </div>
          <div className="card mt-5 mx-auto" style={{ maxWidth: "450px" }}>
            <div className="card-body">
              <h1 className="fs-3">
                Login <span className="mini-hide">to your account</span>
              </h1>
              <hr />
              <form className="mt-4" onSubmit={handleSubmit}>
                {errors && (
                  <div className="alert alert-danger">{errors.other}</div>
                )}
                <FloatingInput
                  label="Email"
                  type="text"
                  name="email"
                  error={errors && errors.email}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <PasswordInput
                  label="Password"
                  name="password"
                  error={errors && errors.password}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <div className="d-flex align-items-center">
                  <div>
                    {!isPending && (
                      <>
                        {/* jika proses yang melibatkan login belum selesai */}
                        {!finished && (
                          <button className="btn btn-primary">Submit</button>
                        )}

                        {/* jika proses yang melibatkan login telah selesai dan akan redirect */}
                        {finished && (
                          <button
                            className="btn btn-primary"
                            style={{ cursor: "not-allowed" }}
                            disabled
                          >
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>{" "}
                            Redirecting...
                          </button>
                        )}
                      </>
                    )}
                    {isPending && (
                      <button
                        className="btn btn-primary"
                        type="button"
                        disabled
                      >
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>{" "}
                        Loading...
                      </button>
                    )}
                  </div>
                  <div className="ms-auto">
                    <Link
                      to="/forgot-password"
                      className="text-decoration-none super-mini-hide"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="mx-auto mt-3" style={{ maxWidth: "450px" }}>
            <Google />
          </div>
          <div className="mx-auto mt-3" style={{ maxWidth: "450px" }}>
            <Facebook />
          </div>
          <div className="mx-auto mt-3" style={{ maxWidth: "450px" }}>
            <Github />
          </div>
        </div>
      </div>
    </div>
  );
}
