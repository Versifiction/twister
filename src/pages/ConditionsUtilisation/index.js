import React, { useEffect } from "react";

import "./ConditionsUtilisation.css";

function ConditionsUtilisation() {
  useEffect(() => {
    document.title = "Twister | Conditions d'utilisation";
  }, []);

  return (
    <div className="ConditionsUtilisation">
      <p>Conditions d'utilisation</p>
    </div>
  );
}

export default ConditionsUtilisation;
