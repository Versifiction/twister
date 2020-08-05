import React from "react";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";
import { RectShape, TextBlock } from "react-placeholder/lib/placeholders";

import "../../../App";

function Feed() {
  return (
    <>
      <div
        className="Feed-Content"
        style={{
          padding: "10px",
        }}
      >
        <ReactPlaceholder
          type="text"
          rows={3}
          showLoadingAnimation={true}
          color="grey"
        />
      </div>
      <div
        className="Feed-Content"
        style={{
          padding: "10px",
        }}
      >
        <ReactPlaceholder
          type="text"
          rows={3}
          showLoadingAnimation={true}
          color="grey"
        />
      </div>
      <div
        className="Feed-Content"
        style={{
          padding: "10px",
        }}
      >
        <ReactPlaceholder
          type="text"
          rows={3}
          showLoadingAnimation={true}
          color="grey"
        />
      </div>
    </>
  );
}

export default Feed;
