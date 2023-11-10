import { useSignIn } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import logo from "../../../assets/logo.svg";
import "../auth/auth.css";

const SigninForm = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    if (!isLoaded) {
      return;
    }
    try {
      const result = await signIn.create({
        identifier: data.userName,
        password: data.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/");
      } else {
      }
    } catch (err) {
      err.errors.forEach((error) => {
        if (error.meta.paramName === "identifier") {
          setError("userName", {
            message: error.longMessage.replace("Identifier", "Username"),
          });
        }

        if (error.meta.paramName === "password") {
          setError("password", {
            message:
              error.code === "form_password_incorrect"
                ? "Password is incorrect"
                : error.longMessage,
          });
        }
      });
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <Link to="/">
        <img src={logo} alt="Logo" className="form-logo" />
      </Link>

      <h2 className="heading-lg">Login</h2>

      <div className="form-items">
        <div className="form-item">
          <input
            {...register("userName", { required: "Username is required" })}
            type="text"
            className={errors.userName ? "error" : ""}
            placeholder="Username"
            aria-label="Username"
            autoFocus
          />
          {errors.userName && (
            <p className="error-text">{errors.userName.message}</p>
          )}
        </div>
        <div className="form-item">
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            className={errors.password ? "error" : ""}
            placeholder="Password"
            aria-label="Passowrd"
          />
          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}
        </div>
      </div>

      <button className="btn">Login</button>

      <p className="has-account">
        Don't have an account? {<Link to={"/signup"}>Sign Up</Link>}
      </p>
    </form>
  );
};

export default SigninForm;
