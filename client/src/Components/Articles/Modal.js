import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import CardContent from "@material-ui/core/CardContent";
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List'
import CircularProgress from '@material-ui/core/CircularProgress';
import Comment from '../Comments/Comment'
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
  },
  desc: {
    padding: "3%",
    textAlign: "center"
  },
  commentsContainer: {
    textAlign: "right",
    padding: "2% 0"
  },
  button: {
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
  const [loading, setLoading] = useState(false);
  const onPostComment = async (input, _id) => {
    setLoading(true)
    await postComment(input, _id);
    setInput("")
    setLoading(false)
  }
  return (
    <Modal
      open={isViewingArticle}
      onBackdropClick={() => setIsViewingArticle(false)}
    >
      <Paper className={classes.paper}>
        <Grid container direction="row" style={{ backgroundColor: "lightgrey" }}>
          <Grid item xs={4}>
            <img src={photo} className={classes.media} alt={title} />
          </Grid>
          <Grid item xs={8}>
            <Typography className={classes.desc} variant="h3"><a target="_blank" href={link}>{desc}</a></Typography>
          </Grid>
        </Grid>
        <Grid className={classes.commentsContainer} container justify="center" direction="column" alignContent="center">
          <Grid item xs={8}>
            <TextField placeholder="What are your thoughts?" variant="filled" value={input || ""} fullWidth rows={5} multiline onChange={e => setInput(e.target.value)} />
          </Grid>
          <Grid className={classes.button} item xs={8}>
            <Button color="primary" size="large" variant="outlined" disabled={!input} onClick={(e) => onPostComment(input, _id)}>{loading ? <CircularProgress /> : <Typography variant="button">Post</Typography>}</Button>
          </Grid>
        </Grid>
        <List>
          {comments.length > 0 ? comments.map(comment => <Comment {...comment} />) : <Typography align="center" gutterBottom variant="h4">Nothing here yet, be the first to comment!</Typography>}
        </List>
      </Paper>
    </Modal>
  );
};
export default withStyles(styles)(ArticleModal);
