import { useRef, useState } from "react";
import { useSignIn } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import "../auth/auth.css";

const SigninForm = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  // start the sign In process.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    setErrors({ username: "", password: "" });

    if (validateInputs()) {
      try {
        const result = await signIn.create({
          identifier: usernameRef.current.value,
          password: passwordRef.current.value,
        });

        if (result.status === "complete") {
          await setActive({ session: result.createdSessionId });
          navigate("/");
        } else {
        }
      } catch (err) {
        console.log(err);
        err.errors.forEach((error) => {
          if (error.meta.paramName === "identifier") {
            setErrors((prevErrors) => {
              return {
                ...prevErrors,
                username: error.longMessage.replace("Identifier", "Username"),
              };
            });
          }

          if (error.meta.paramName === "password") {
            setErrors((prevErrors) => {
              return {
                ...prevErrors,
                password:
                  error.code === "form_password_incorrect"
                    ? "Password is incorrect"
                    : error.longMessage,
              };
            });
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
    return true;
  };

  return (
    <form className="auth-form">
      <Link to="/">
        <img src={logo} alt="Logo" className="form-logo" />
      </Link>

      <h2 className="heading-lg">Login</h2>

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
      </div>

      <button onClick={handleSubmit} className="btn">
        Login
      </button>

      <p className="has-account">
        Don't have an account? {<Link to={"/signup"}>Sign Up</Link>}
      </p>
    </form>
  );
};

export default SigninForm;
