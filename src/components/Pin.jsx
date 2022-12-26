import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineLike,
  AiTwotoneLike,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { BiArchive } from "react-icons/bi";

import { client } from "../client";

const Pin = ({ pin }) => {
  const [like, setLike] = useState(false);

  const navigate = useNavigate();

  const user =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  const liked = () => {
    setLike(true);
    client.patch(pin._id).inc({ likes: 1 }).commit();
  };
  const unliked = () => {
    client.patch(pin._id).dec({ likes: 1 }).commit();
    setLike(false);
  };

  let alreadySaved = pin?.save?.filter(
    (item) => item?.postedBy?._id === user?.sub
  );

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  if (pin == null) {
    return;
  }
  return (
    <div className="flex flex-col mb-5 items-center justify-center ">
      <div className="px-5 py-5 flex flex-col gap-2 max-w-500 border-2 border-blue-200 rounded bg-blue-50 ">
        <h2 className="text-2xl font-bold flex flex-col tracking-wide">
          {pin.title}
        </h2>
        <div className="max-w-500">
          <h2 className="text-lg">{pin.about}</h2>
        </div>
        {pin.image && (
          <img src={pin.image.asset.url} alt="" className="flex flex-col" />
        )}

        <div
          onClick={() => navigate(`/pin-detail/${pin?._id}`)}
          className="text-sm text-grey-500 w-80 hover:cursor-pointer hover:text-lg "
        >
          Read more...
        </div>

        <div className="flex flex-row items-center justify-between">
          {like ? (
            <AiTwotoneLike
              fontSize={25}
              onClick={() => {
                console.log(pin.likes);
                unliked();
              }}
            />
          ) : (
            <AiOutlineLike
              fontSize={25}
              onClick={() => {
                liked();
              }}
            />
          )}
          {/* <p>{pin.likes} likes</p> */}
          <AiOutlineShareAlt fontSize={25} />
          <BiArchive fontSize={25} />
        </div>
      </div>
    </div>
  );
};

export default Pin;
