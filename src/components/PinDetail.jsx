import React, { useState, useEffect } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { client, urlFor } from "../client";
import { pinDetailQuery } from "../utils/data";
import Spinner from "./Spinner";

const PinDetail = ({ user }) => {
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState(null);
  const [addingComment, setAddingComment] = useState(false);
  const { pinId } = useParams();

  const addComment = () => {
    if (comment) {
      setAddingComment(true);
      // console.log(pinId);
      // return;
      try {
        client
          .patch(pinId)
          // .setIfMissing({ comments: [] })
          .insert("after", "comments", [
            {
              comment: "cgde",
              _key: uuidv4(),
              postedBy: {
                type: "postedBy",
                _ref: user._id,
              },
            },
          ])
          .commit()
          .then(() => {
            // fetchDetails();
            setComment("");
            setAddingComment(false);
          });
      } catch (error) {
        throw error;
      }
    }
  };

  const fetchDetails = () => {
    const query = pinDetailQuery(pinId);
    client.fetch(query).then((value) => {
      setPinDetail(value[0]);
      console.log(value[0].image);
    });
  };

  useEffect(() => {
    fetchDetails();
  }, [pinId]);

  if (!pinDetail) return <Spinner message="We are fetching the full story" />;
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-6 lg:w-4/5 w-full">
        <div className="text-3xl  font-bold border-b-2 border-gray-500 pb-2 px-6 mx-5 text-center">
          {pinDetail.title}
        </div>
        <div className="text-start font-semibold text-xl sm:mx-5">
          {pinDetail.about}
        </div>
        <div className="text-justify border-t-2 pt-3 border-gray-300 sm:mx-5">
          <p>{pinDetail.story}</p>
        </div>
        {pinDetail.image && <img src={urlFor(pinDetail.image)} alt="img" />}

        <h2 className="mt-5 text-2xl">Comments</h2>
        <div className="max-h-370 overflow-y-auto">
          {pinDetail?.comments?.map((comment) => {
            return (
              <div
                className="flex gap-2 mt-5 items-center"
                key={comment?.comment}
              >
                {/* {comment?.postedBy} */}
                {/* <img
                  alt="user-profile"
                  className="h-10 w-10 rounded-full cursor-pointer"
                /> */}
                <div className="flex flex-col ">
                  <p className="font-bold">{comment.postedBy.userName}</p>
                  <p>{comment.comment}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap mt-6 gap-3">
          <input
            type="text"
            placeholder="Add a comment"
            className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <button
            type="button"
            className="bg-blue-500 text-white rounded-full px-6 py-2  font-semibold text-base outline-none"
            onClick={() => {
              addComment();
            }}
          >
            {addingComment ? "Posting Comment..." : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PinDetail;
