import React, { useState } from "react";

import "./TrendingTopic.css";
import trendingTopic from "../../../utils/trendingtopic";

function TrendingTopic() {
  const [allTrending, setAllTrending] = useState(false);

  function seeAll() {
    setAllTrending(true);
  }

  return (
    <div className="TrendingTopic">
      <div class="trending-topic-before padding">
        <span>Tendances : France</span>
      </div>
      {trendingTopic &&
        trendingTopic.map((data) => (
          <div key={data.id} className="trending-topic-content padding">
            <div class="trending-topic-line">
              <span>{data.id}</span>
              <span>-</span>
              <span>{data.category}</span>
            </div>
            <div class="trending-topic-libelle">
              <p>{data.libelle}</p>
            </div>
          </div>
        ))}
      <div class="trending-topic-after padding">
        <span onClick={seeAll} class="see-all">
          {allTrending ? "Voir plus" : "Voir moins"}
        </span>
      </div>
    </div>
  );
}

export default TrendingTopic;
