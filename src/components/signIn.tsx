import * as React from "react";
import { provider } from "../firebase";
import * as auth from "../auth";

const SignInForm: React.SFC<{}> = () => {
  const googleLogin = () => {
    auth.signInWithRedirect(provider);
  };
  return (
    <div>
      <h1>SignIn</h1>
      <button onClick={googleLogin}>Google Sign-In</button>
    </div>
  );
};
export default SignInForm;
