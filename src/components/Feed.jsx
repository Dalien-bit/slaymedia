import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { feedQuery, searchQuery } from "../utils/data";

import { client } from "../client";
import Spinner from "./Spinner";
import PinsLayout from "./PinsLayout";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(50);

  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId, startIndex, endIndex);

      client.fetch(query).then((data) => {
        if (data) {
          setPins(data);
        }
        setLoading(false);
      });
    } else {
      const query = feedQuery(startIndex, endIndex);
      client.fetch(query).then((data) => {
        if (data) {
          setPins(data);
        }
        setLoading(false);
      });
    }
  }, [categoryId, startIndex, endIndex]);

  const loadMore = () => {
    setStartIndex(startIndex + 50);
    setEndIndex(endIndex + 50);
  };

  const loadLess = () => {
    setStartIndex(startIndex - 50);
    setEndIndex(endIndex - 50);
  };

  if (loading) {
    return <Spinner message="We are generating new articles for you" />;
  }
  return (
    <div className="">
      <PinsLayout pins={pins} />
      {pins && pins[0] && (
        <p className="flex flex-col items-center" onClick={loadMore}>
          Load More...
        </p>
      )}

      {startIndex !== 0 && (
        <p className="flex flex-col items-center" onClick={loadLess}>
          Go back...
        </p>
      )}
    </div>
  );
};

export default Feed;
