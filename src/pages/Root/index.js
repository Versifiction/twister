import React from "react";
import { Redirect } from "react-router-dom";

function Root() {
  return (
    <div className="Home">
      <Redirect to="/home" />
    </div>
  );
}

export default Root;
