import React, { useState } from "react";
import "./ArticleScreen.css";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import CardContent from "@material-ui/core/CardContent";
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import NewComment from "../../Comments/NewComment";
import Comment from '../../Comments/Comment'
const styles = {
  paper: {
    position: "relative",
    top: "20%",
    width: "80%",
    margin: "0 auto"
  },
  media: {
    height: "100%",
    width: "100%"
  }
};
const ArticleModal = ({
  article: {
  title,
  photo,
  link,
  comments,
  _id,
  desc,
}, classes, isViewingArticle,
  setIsViewingArticle, postComment }) => {
  const [input, setInput] = useState("")
  console.log(input)
  return (
    <Modal
      open={isViewingArticle}
      onBackdropClick={() => setIsViewingArticle(false)}
    >
      <Paper className={classes.paper}>
        <Grid container direction="row">
          <Grid item xs={4}>
            <img src={photo} className={classes.media} alt={title} />
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h3">{desc}</Typography>
          </Grid>
        </Grid>
        {comments.map(comment => <Comment {...comment} />)}
        <TextField onChange={e => setInput(e.target.value)} />
        <Button onClick={(e) => postComment(input, _id)}>Post</Button>
      </Paper>
    </Modal>
  );
};
export default withStyles(styles)(ArticleModal);
