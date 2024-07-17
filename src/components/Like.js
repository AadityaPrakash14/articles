import React, { useState } from "react";

export const Like = () => {
  const [like, setlike] = useState(false);
  const flip = () => {
    setlike((prevLike) => !prevLike);
  };
  return (
    <div className="text-center mt-4">
      {like ? (
        <i
          class="fa-solid fa-heart likeIcon"
          onClick={flip}
          style={{ color: "#f40b2e" }}
        ></i>
      ) : (
        <i
          class="fa-regular fa-heart likeIcon"
          onClick={flip}
          style={{ color: "#050505" }}
        ></i>
      )}
    </div>
  );
};
