import React from "react";
import { RotatingSquare } from "react-loader-spinner";

const Spinner = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <RotatingSquare color="blue"></RotatingSquare>
      <p className="text-xl text-center px-2">{`${message}...`}</p>
    </div>
  );
};

export default Spinner;
