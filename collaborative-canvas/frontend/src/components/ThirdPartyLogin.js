import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const ThirdPartyLogin = () => {
  return (
    <div>
      <a href="/auth/google">
        <FcGoogle /> Login with Google
      </a>
      <a href="/auth/facebook">
        <FaFacebook /> Login with Facebook
      </a>
    </div>
  );
};

export default ThirdPartyLogin;