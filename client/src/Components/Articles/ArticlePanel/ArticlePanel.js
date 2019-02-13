import React, { Component } from "react";
import "./ArticlePanel.css";
import Articleheader from "./Articleheader";
import ArticleScreen from "../ArticleScreen/ArticleScreen";
import Aux from "../../../HOCs/Aux";
import Modal from "../../UI/Modal/Modal";

class ArticlePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewingArticle: false
    };
  }

  handleArticleWindowOpen = () => {
    this.setState({ viewingArticle: true });
  };
  handleArticleWindowClose = () => {
    this.setState({ viewingArticle: false });
  };

  render() {
    return (
      <Aux>
        <div
          onClick={this.handleArticleWindowOpen}
          className="Panel"
          footer={
            <Articleheader title={this.props.title} link={this.props.link} />
          }
        >
          <a target="_blank">
            <img
              className="ArticleImage"
              alt="Article"
              src={this.props.image}
            />
          </a>
          <p className="p"> {this.props.title} </p>
        </div>
        <Modal
          show={this.state.viewingArticle}
          modalClosed={this.handleArticleWindowClose}
        >
          <ArticleScreen
            id={this.props.id}
            title={this.props.title}
            desc={this.props.desc}
            image={this.props.image}
            link={this.props.link}
            comments={this.props.comments}
          />
        </Modal>
      </Aux>
    );
  }
}

export default ArticlePanel;
