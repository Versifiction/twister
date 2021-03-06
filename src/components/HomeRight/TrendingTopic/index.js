import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "./TrendingTopic.css";
import trendingTopic from "../../../utils/trendingtopic";

function TrendingTopic() {
  const [trends] = useState(trendingTopic);

  return (
    <div className="trending-topic">
      <div className="trending-topic-before padding">
        <span>Tendances : France</span>
      </div>
      {trends &&
        trends.slice(0, 5).map((data) => (
          <div key={data.id} className="trending-topic-content padding">
            <div className="trending-topic-line">
              <span>{data.id}</span>
              <span>-</span>
              <span>{data.category}</span>
            </div>
            <div className="trending-topic-libelle">
              <p>{data.libelle}</p>
            </div>
          </div>
        ))}
      <NavLink
        className="see-all trending-topic-after padding"
        to="/explore"
        href="/explore"
      >
        Voir plus
      </NavLink>
    </div>
  );
}

export default TrendingTopic;
