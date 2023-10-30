import { useEffect } from "react";
import { useSignUp, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/features/auth/SignupForm";

const SignUp = () => {
  const navigate = useNavigate();
  const { isLoaded } = useSignUp();
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

  return (
    !isSignedIn && (
      <div className="center-content">
        <SignupForm />
      </div>
    )
  );
};

export default SignUp;
