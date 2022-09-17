import React from "react";
import { useURLParameter } from "@/hooks/useURLParameter";
import * as signInStyle from "./signin.module.scss";

type Props = {};

const SignIn: React.FC<Props> = () => {
  const { isMonologue, isSignIn } = useURLParameter();
  return <div className={signInStyle.signInOverlay}>
    <div className={signInStyle.signInContainer}>
      <div className={signInStyle.signInClose}>
        <i className={`fa-solid fa-close`}></i>
      </div>
      <h2>Sign In</h2>
      <button className={signInStyle.googleSSOContainer}>
        <div className={signInStyle.googleSSO}><span><i className="fa-brands fa-google"></i></span></div>
      </button>
    </div>
  </div>
}

export default SignIn;
