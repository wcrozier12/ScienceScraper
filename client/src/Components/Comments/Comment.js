import React from "react";

const comment = props => {
  const style = {
    textAlign: "left",
    margin: "10px",
    borderTop: "1px solid #555",
    borderBottom: "1px solid #555"
  };
  return (
    <div style={style}>
      <p> {props.content} </p>
      <p> {props.postedAt} </p>
    </div>
  );
};

export default comment;
