import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { client } from "../client";
import Spinner from "./Spinner";

const categories = [
  { name: "Trending" },
  { name: "News" },
  { name: "Sports" },
  { name: "Random" },
  { name: "Other" },
];

const CreatePin = ({ user }) => {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    const { type, name } = e.target.files[0];
    console.log(type + " " + name);

    if (type === "image/png" || type === "image/jpg" || type === "image/jpeg") {
      setWrongImageType(false);
      setLoading(true);

      client.assets
        .upload("image", selectedFile, {
          contentType: type,
          filename: name,
        })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Image upload error", error);
        });
    } else {
      setWrongImageType(true);
    }
  };

  const savePost = () => {
    if (imageAsset?._id && title && about && category && story) {
      const doc = {
        _type: "pin",
        title,
        about,
        story,
        destination: destination,
        category,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: "postedBy",
          _ref: user._id,
        },
        likes: 0,
      };

      client.create(doc).then(() => {
        navigate("/");
      });
    } else {
      setFields(true);
      setTimeout(() => {
        setFields(false);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">
          Please fill in all the fields
        </p>
      )}
      <div className="flex lg:flex-row flex-col justify-center items-center lg:p-5 p-3 lg:w-4/5 w-full">
        <div className="bg-gray-100 border-2 border-solid border-blue-300 p-3 flex flex-0.7 w-full">
          <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner message="" />}
            {wrongImageType && <p>Wront Image Type</p>}
            {!imageAsset ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to Upload</p>
                  </div>
                  <p className="mt-32 text-gray-400">
                    Use high quality image less than 10 MB
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onInput={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={imageAsset?.url}
                  alt="uploaded-pic"
                  className="h-full w-full"
                />
                <button
                  type="button"
                  className="h-40 w-40 absolute bottom-3 right-3 rounded-full bg-white cursor-pointer hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete className="h-full w-full" />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add your title"
            className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 pl-3 pr-3"
          />
          {user && (
            <div className="flex gap-2 my-2 items-center justify-end rounded-lg">
              <p className="font-bold"> By </p>
              <p className="font-bold"> {user.userName}</p>
            </div>
          )}
          <textarea
            name="About"
            rows="4"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="outline-none text-lg font-semibold border-b-2 border-gray-200 pl-3 pr-3"
            placeholder="Add about...   (250 Characters)"
          />
          <div className="flex flex-col">
            <div>
              <p className="mb-2 text-semibold">Choose Category</p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option value="other" className="bg-white">
                  Select Category
                </option>
                {categories.map((category) => (
                  <option
                    className="text-base border-0 outline-none capitalize bg-white text-black"
                    value={category.name}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Add destination (url/link to external websites)"
            className="outline-none font-bold border-b-2 border-gray-200 p-2"
          />
        </div>
      </div>
      <textarea
        name="Story"
        rows="10"
        value={story}
        onChange={(e) => setStory(e.target.value)}
        className="outline-none text-lg font-semibold border-2 border-dashed border-blue-500 lg:p-5 p-3 lg:w-4/5 w-full mr-3"
        placeholder="Write your story..."
      />
      <div className="flex flex-col justify-end items-end w-full mr-5 p-5">
        <button
          type="button"
          onClick={savePost}
          className="bg-black text-white py-1 px-3 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreatePin;
