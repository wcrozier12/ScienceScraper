import React from "react";
import "./Scrapebutton.css";

const Scrapebutton = props => {
  return (
    <button className="ScrapeButton" onClick={props.handleScrapeClick}>
      Find Articles
    </button>
  );
};

export default Scrapebutton;
