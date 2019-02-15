import React from "react";
import Typography from "@material-ui/core/Typography"
const Spinner = () => {
  return (
    <div style={{ margin: "0 auto", textAlign: "center", paddingTop: "6%" }}>
      <img
        style={{ height: "20%", width: "20%" }}
        src="https://www.svgrepo.com/show/18907/atom.svg"
        className="ld ld-flip"
      />
      <Typography variant="h2">Loading articles...</Typography>
    </div>
  );
};

export default Spinner;
