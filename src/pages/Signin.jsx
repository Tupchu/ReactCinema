import { useEffect } from "react";
import { useSignIn, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import SigninForm from "../components/features/auth/SigninForm";

const SignIn = () => {
  const navigate = useNavigate();
  const { isLoaded } = useSignIn();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/");
    }
  }, [isSignedIn]);

  if (!isLoaded) {
    return (
      <div className="center-content">
        <h1>Loading...</h1>
      </div>
    );
  }

  return !isSignedIn && <div className="center-content">{<SigninForm />}</div>;
};

export default SignIn;
