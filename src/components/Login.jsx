import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

import slay from "../assets/slay.mp4";
import logo from "../assets/S1transparentS.png";

import { client } from "../client";

import jwt_decode from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    var decodeCred = jwt_decode(response.credential);
    localStorage.setItem("user", JSON.stringify(decodeCred));

    const googleId = decodeCred.sub;
    const name = decodeCred.name;
    const imageUrl = decodeCred.picture;

    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };

    console.log(doc);
    client.createIfNotExists(doc).then((value) => {
      console.log(value);
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={slay}
          type="video/mp4"
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="pb-5">
            <img src={logo} width="500px" alt="logo" />
          </div>

          <div className="shadow-2xl mr-5 pr-5">
            <GoogleLogin
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
