import React, { useEffect, useState } from "react";
import { useURLParameter } from "@/hooks/useURLParameter";
import * as signInStyle from "./signin.module.scss";
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/router";

type Props = {};

const SignIn: React.FC<Props> = () => {
  const { isMonologue, isSignIn } = useURLParameter();
  const router = useRouter();
  const { data: session } = useSession();
  const [showDialog, setShowDialog] = useState(false);
  const closeSignIn = () => {
    router.push('/');
  }

  useEffect(() => {
    setShowDialog(!!session || !(isMonologue && isSignIn));
  }, [session, isMonologue, isSignIn])

  if (showDialog) {
    return <div></div>
  }
  return <div className={signInStyle.signInOverlay}>
    <div className={signInStyle.signInContainer}>
      <div className={signInStyle.signInClose} onClick={closeSignIn}>
        <i className={`fa-solid fa-close`}></i>
      </div>
      <h2>Sign In</h2>
      <button className={signInStyle.googleSSOContainer} onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000/' })}>
        <div className={signInStyle.googleSSO}>
          <span><i className="fa-brands fa-google"></i></span>
        </div>
      </button>
    </div>
  </div>
}

export default SignIn;
