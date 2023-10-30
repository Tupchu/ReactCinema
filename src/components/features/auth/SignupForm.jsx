import { useRef, useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import "../auth/auth.css";

const SignupForm = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    repeatPassword: "",
  });
  const navigate = useNavigate();

  // signup process
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    setErrors({ username: "", password: "", repeatPassword: "" });

    if (validateInputs()) {
      try {
        const result = await signUp.create({
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        });

        if (result.status === "complete") {
          await setActive({ session: result.createdSessionId });
          navigate("/");
        } else {
          // handle
        }
      } catch (err) {
        err.errors.forEach((error) => {
          console.log(error);
          if (error.meta.paramName === "username") {
            setErrors((prevErrors) => {
              return {
                ...prevErrors,
                username: error.longMessage,
              };
            });
          }

          if (error.meta.paramName === "password") {
            setErrors((prevErrors) => {
              return {
                ...prevErrors,
                password:
                  error.code === "form_password_pwned"
                    ? "This password is not secure"
                    : error.longMessage,
              };
            });
            passwordRef.current.value = "";
            repeatPasswordRef.current.value = "";
          }
        });
      }
    }
  };

  const validateInputs = () => {
    if (usernameRef.current.value === "") {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          username: "Must enter username",
        };
      });
    }

    if (passwordRef.current.value === "") {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          password: "Must enter password",
        };
      });
    }

    if (usernameRef.current.value === "" || passwordRef.current.value === "") {
      return false;
    }

    if (passwordRef.current.value !== repeatPasswordRef.current.value) {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          repeatPassword: "Passwords must match",
        };
      });
      repeatPasswordRef.current.value = "";
      return false;
    }

    return true;
  };

  return (
    <form className="auth-form">
      <Link to="/">
        <img src={logo} alt="Logo" className="form-logo" />
      </Link>

      <h2 className="heading-lg">Sign Up</h2>

      <div className="form-items">
        <div className="form-item">
          <input
            ref={usernameRef}
            id="username"
            className={errors.username ? "error" : ""}
            name="username"
            type="text"
            placeholder="Username"
            aria-label="Username"
            autoFocus
          />
          <p className="error-text">{errors.username}</p>
        </div>
        <div className="form-item">
          <input
            ref={passwordRef}
            id="password"
            className={errors.password ? "error" : ""}
            name="password"
            type="password"
            placeholder="Password"
            aria-label="Passowrd"
          />
          <p className="error-text">{errors.password}</p>
        </div>
        <div className="form-item">
          <input
            ref={repeatPasswordRef}
            id="repeatPassword"
            className={errors.repeatPassword ? "error" : ""}
            name="repeatPassword"
            type="password"
            placeholder="Repeat Password"
            aria-label="Repeat Password"
          />
          <p className="error-text">{errors.repeatPassword}</p>
        </div>
      </div>

      <button onClick={handleSubmit} className="btn">
        Signup
      </button>

      <p className="has-account">
        Already have an account? {<Link to={"/signin"}>Login</Link>}
      </p>
    </form>
  );
};

export default SignupForm;
