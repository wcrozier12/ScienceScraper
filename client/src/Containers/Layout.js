import React, { Component } from "react";
import axios from "axios";
import Navigation from "../Components/NavBar/Navigation";
import Articles from "./Articles";

class Layout extends Component {
  state = {
    articles: [],
    scraping: false,
    scrapedArticlesLength: 0
  };
  getArticles = () => {
    axios.get("/api/articles").then(({ data }) => {
      this.setState({ articles: data });
    });
  };
  componentDidMount() {
    this.getArticles();
  }

  scrapeClickHandler = () => {
    this.setState({ scraping: true }, () => {
      axios.get("/api/articles/scrape").then(result => {
        return axios.get("/api/articles").then(result => {
          const numberOfScraped =
            result.data.length - this.state.articles.length;
          const articles = result.data;
          return this.setState({
            scraping: false,
            scrapedArticlesLength: numberOfScraped,
            articles: articles
          });
        });
      });
    });
  };

  closeScrapeWindowHandler = () => {
    this.setState({ scraping: false });
  };

  render() {
    return (
      <React.Fragment>
        <Navigation />
        <Articles />
      </React.Fragment>
    );
    // return (
    //   <Aux>
    //     <section>
    //       <Navigation onScrapeClick={this.scrapeClickHandler} />
    //     </section>
    //     <Modal
    //       show={this.state.scraping}
    //       modalClosed={this.closeScrapeWindowHandler}
    //     >
    //       <ScrapeSummary
    //         scrapedArticlesLength={this.state.scrapedArticlesLength}
    //         scrapedArticles={this.state.scrapedArticles}
    //       />
    //     </Modal>
    //     {this.state.articles.length !== 0 ? (
    //       <div className="articleContainer">{articles}</div>
    //     ) : (
    //       <div>
    //     )}
    //   </Aux>
    // );
  }
}

export default Layout;
