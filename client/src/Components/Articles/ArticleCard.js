import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Modal from "@material-ui/core/Modal";
import ArticleModal from "./Modal";

const styles = {
  card: {
    width: 440
  },
  media: {
    height: 200
  }
};

const ArticleCard = props => {
  const { article: { title, photo, desc, link, comments, _id }, postComment, classes } = props;
  const [isViewingArticle, setIsViewingArticle] = useState(false);
  return (
    <React.Fragment>
      <ArticleModal
        article={props.article}
        isViewingArticle={isViewingArticle}
        postComment={postComment}
        setIsViewingArticle={setIsViewingArticle}
      />
      <Card className={classes.card}>
        <CardActionArea
          className={classes.action}
          onClick={e => setIsViewingArticle(true)}
        >
          <CardMedia className={classes.media} image={photo} title={title} />
          <CardContent>
            <Typography variant="h4">{title}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </React.Fragment>
  );
};

export default withStyles(styles)(ArticleCard);
