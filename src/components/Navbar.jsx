import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdSearch } from "react-icons/io";

const Navbar = ({ serachTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  if (!user) {
    return null;
  }
  return (
    <div className="ml-2 flex gap-2 md:gap-5 w-full mt-5 pb-7">
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-blue-100 border-none outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={21} className="ml-2 " />
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder=""
          className="bg-blue-100 w-full h-40 text-center hover:bg-blue-200"
          value={serachTerm}
          onFocus={() => navigate("/search")}
        />
      </div>
      <div className="flex gap-3 ">
        <Link to={`user-profile/${user?._id}`} className="hidden md:block ">
          <img src={user.image} alt="" className="h-40 " />
        </Link>
        <Link
          to="create-pin"
          className="border-2 px-1 py-1 border-blue-200 flex justify-center items-center"
        >
          <IoMdAdd fontSize={30} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
