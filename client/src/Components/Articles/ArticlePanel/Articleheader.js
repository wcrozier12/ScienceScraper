import React from 'react';

const Articleheader = (props) => {
  return (
    <div>
      <h3><a href={props.link} target="_blank"> {props.title} </a></h3>
    </div>
  )
}

export default Articleheader;