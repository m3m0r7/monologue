import React from "react";
import { useURLParameter } from "@/hooks/useURLParameter";

type Props = {};

const SignIn: React.FC<Props> = () => {
  const { isMonologue, isSignIn } = useURLParameter();
  return <></>
}

export default SignIn;
