import { useRef, useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import "../auth/auth.css";
import { useForm } from "react-hook-form";

const SignupForm = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    getValues,
  } = useForm();

  // signup process
  const onSubmit = async (data) => {
    if (!isLoaded) {
      return;
    }

    try {
      const result = await signUp.create({
        username: data.username,
        password: data.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/");
      } else {
        // handle
      }
    } catch (err) {
      err.errors.forEach((error) => {
        if (error.meta.paramName === "username") {
          setError("username", { message: error.longMessage });
        }

        if (error.meta.paramName === "password") {
          setError("password", {
            message:
              error.code === "form_password_pwned"
                ? "This password is not secure"
                : error.longMessage,
          });
          reset({ password: "", repeatPassword: "" }, { keepErrors: true });
        }
      });
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <Link to="/">
        <img src={logo} alt="Logo" className="form-logo" />
      </Link>

      <h2 className="heading-lg">Sign Up</h2>

      <div className="form-items">
        <div className="form-item">
          <input
            {...register("username", { required: "Username is required" })}
            className={errors.username ? "error" : ""}
            type="text"
            placeholder="Username"
            aria-label="Username"
            autoFocus
          />
          {errors.username && (
            <p className="error-text">{errors.username.message}</p>
          )}
        </div>
        <div className="form-item">
          <input
            {...register("password", { required: "Password is required" })}
            className={errors.password ? "error" : ""}
            type="password"
            placeholder="Password"
            aria-label="Passowrd"
          />
          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}
        </div>
        <div className="form-item">
          <input
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === getValues("password") || "Passwords must match",
            })}
            className={errors.confirmPassword ? "error" : ""}
            type="password"
            placeholder="Confirm Password"
            aria-label="Confirm Password"
          />
          {errors.confirmPassword && (
            <p className="error-text">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      <button className="btn">Signup</button>

      <p className="has-account">
        Already have an account? {<Link to={"/signin"}>Login</Link>}
      </p>
    </form>
  );
};

export default SignupForm;
