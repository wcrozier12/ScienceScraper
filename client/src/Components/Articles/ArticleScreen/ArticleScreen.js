import React from "react";
import "./ArticleScreen.css";
import Aux from "../../../HOCs/Aux";
import NewComment from "../../Comments/NewComment";
const ArticleScreen = props => (
  <Aux>
    <div
      className="row"
      style={{
        backgroundColor: "#555",
        borderRadius: "10px 10px 0px 0px",
        marginRight: "0px",
        marginLeft: "0px"
      }}
    >
      <div
        className="col-md-4"
        style={{
          paddingLeft: "0px",
          paddingRight: "0px"
        }}
      >
        <img className="ScreenImage" src={props.image} alt={props.title} />
      </div>
      <div className="col-md-8">
        <h2>
          <a className="Link" href={props.link} target="_blank">
            {props.title}
          </a>
        </h2>
      </div>
    </div>
    <div className="row">
      <p className="p"> {props.desc} </p>
    </div>
    <NewComment articleId={props.id} comments={props.comments} />
  </Aux>
);
export default ArticleScreen;
