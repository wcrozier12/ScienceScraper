import React, { Component } from "react";
import axios from "axios";
import "./NewComment.css";
import Aux from "../../HOCs/Aux";
import Comment from "./Comment";

class NewComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      comments: this.props.comments
    };
  }
  postDataHandler = () => {
    const data = {
      content: this.state.content
    };
    axios.post(`/api/comment/${this.props.articleId}`, data).then(response => {
      const newComment = response.data;
      const comments = [...this.state.comments, newComment];
      this.setState({ content: "", comments: comments });
    });
  };
  render() {
    let comments = null;
    if (this.state.comments) {
      comments = this.state.comments.map((comment, i) => {
        return (
          <Comment
            content={comment.content}
            postedAt={comment.postedAt}
            key={comment._id}
          />
        );
      });
    }

    return (
      <Aux>
        {comments}
        <div className="row">
          <div className="col-md-12">
            <div>
              <textarea
                className="CommentBox"
                placeholder="Comment.."
                value={this.state.content}
                onChange={event =>
                  this.setState({ content: event.target.value })
                }
                rows="3"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3" style={{ textAlign: "left" }}>
            <button
              type="button"
              className="btn btn-sm CommentButton"
              onClick={this.postDataHandler}
            >
              Comment
            </button>
          </div>
        </div>
      </Aux>
    );
  }
}

export default NewComment;
