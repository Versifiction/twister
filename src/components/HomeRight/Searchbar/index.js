import React from "react";

import "./Searchbar.css";

function Searchbar() {
  return (
    <nav class="searchbar">
      <div class="nav-wrapper">
        <form>
          <div class="input-field">
            <input
              id="search"
              type="search"
              placeholder="Recherche sur Twersi"
              required
            />
            <label class="label-icon" for="search">
              <i class="material-icons">search</i>
            </label>
            <i class="material-icons">close</i>
          </div>
        </form>
      </div>
    </nav>
  );
}

export default Searchbar;
