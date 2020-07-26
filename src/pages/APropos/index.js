import React, { useEffect } from "react";

import "./APropos.css";

function APropos() {
  useEffect(() => {
    document.title = "Twister | A propos";
  }, []);

  return (
    <div className="APropos">
      <p>A propos</p>
    </div>
  );
}

export default APropos;
