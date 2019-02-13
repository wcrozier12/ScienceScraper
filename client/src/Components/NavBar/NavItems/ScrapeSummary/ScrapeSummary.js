import React from "react";
import Aux from "../../../../HOCs/Aux";
import "./ScrapeSummary.css";

const ScrapeSummary = props => {
  if (props.scrapedArticlesLength !== 0) {
    return (
      <Aux>
        <p className="ScrapeMessage">
          Added {props.scrapedArticlesLength} articles, enjoy!
        </p>
      </Aux>
    );
  } else {
    return (
      <Aux>
        <p className="ScrapeMessage">
          There are no new articles. Try back tomorrow.
        </p>
      </Aux>
    );
  }
};
export default ScrapeSummary;
