import React, { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Login, Sidebar, UserProfile } from "../components";
import { client } from "../client";
import { userQuery } from "../utils/data";

import S1 from "../assets/Stransparent1.png";
import Pins from "./Pins";

import hero from "../assets/hero.jpg";

const divStyle = {
  backgroundImage: `url(${hero})`,
};

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);

  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login", { replace: true });
    } else {
      const query = userQuery(userInfo.sub);

      client.fetch(query).then((data) => {
        setUser(data[0]);
      });
    }
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={divStyle}
      className="flex md:flex-row flex-col h-screen transaction-height duration-75 ease-out"
    >
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>

      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md bg-blue-100">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />

          <Link to="/">
            <img src={S1} alt="logo" className="h-80" />
          </Link>

          <Link to={`user_profile/${user?._id}`}>
            <img src={user?.image} alt="logo" className="max-h-40" />
          </Link>
        </div>

        {toggleSidebar && (
          <div className="fixed w-full items-center justify-center bg-white h-screen overflow-y-auto sahdow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>

      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />}></Route>
          <Route path="/*" element={<Pins user={user && user} />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default Home;
