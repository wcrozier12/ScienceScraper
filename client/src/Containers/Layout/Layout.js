import React, { Component } from "react";
import axios from "axios";
import "./Layout.css";
import Aux from "../../HOCs/Aux";
import Navigation from "../../Components/NavBar/Navigation";
import ArticlePanel from "../../Components/Articles/ArticlePanel/ArticlePanel";
import Modal from "../../Components/UI/Modal/Modal";
import ScrapeSummary from "../../Components/NavBar/NavItems/ScrapeSummary/ScrapeSummary";

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
    axios.get("/scrape").then(result => {
      console.log(result);
      // return axios.get("/api/articles").then(result => {
      //   const numberOfScraped = result.data.length - this.state.articles.length;
      //   const articles = result.data;
      //   return this.setState({
      //     scraping: true,
      //     scrapedArticlesLength: numberOfScraped,
      //     articles: articles
      //   });
      // });
    });
  };

  closeScrapeWindowHandler = () => {
    this.setState({ scraping: false });
  };

  render() {
    const articles = this.state.articles.map(article => {
      return (
        <ArticlePanel
          image={article.photo}
          title={article.title}
          key={article._id}
          link={article.link}
          desc={article.desc}
          id={article._id}
          comments={article.comments}
          commentOpen={this.commentClickHandler}
        />
      );
    });

    return (
      <Aux>
        <section>
          <Navigation onScrapeClick={this.scrapeClickHandler} />
        </section>
        <Modal
          show={this.state.scraping}
          modalClosed={this.closeScrapeWindowHandler}
        >
          <ScrapeSummary
            scrapedArticlesLength={this.state.scrapedArticlesLength}
            scrapedArticles={this.state.scrapedArticles}
          />
        </Modal>
        {this.state.articles.length !== 0 ? (
          <div className="articleContainer">{articles}</div>
        ) : (
          <div>
            <img
              style={{ height: "30%", width: "30%" }}
              src="https://www.svgrepo.com/show/18907/atom.svg"
              className="ld ld-flip"
            />
            <h1>Gathering articles.. </h1>
          </div>
        )}
      </Aux>
    );
  }
}

export default Layout;
