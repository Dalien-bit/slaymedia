import React from "react";
import Pin from "./Pin";

const PinsLayout = ({ pins }) => {
  if (!pins) {
    return <p>Helloo </p>;
  }
  return (
    <div>
      <div className="grid lg:grid-cols-2">
        {pins.slice(0, pins.length).map((pin) => (
          <Pin pin={pin} key={pin._id} />
        ))}
      </div>
    </div>
  );
};

export default PinsLayout;
