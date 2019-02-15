import React, { useReducer, useState, useEffect } from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import useFetcher from "../CustomHooks/useFetcher";
import Spinner from "../Components/UI/Spinner";
import ArticleCard from "../Components/Articles/ArticleCard";

const styles = {
  container: {
    padding: "3% 3%"
  }
};

const fetchArticles = () => axios.get("/api/articles");
const Articles = ({ classes }) => {
  const [data, setData] = useState({ articles: [] })
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { articles } = data;
  const fetchData = async () => {
    try {
      const { data } = await fetchArticles();
      setLoading(false);
      setData({ articles: data });
    } catch (e) {
      setError(e)
    }
  }
  const postComment = async (body, id) => {
    try {
      const { data } = await axios.post(`/api/comment/${id}`, { content: body })
      setData(({ articles }) => {
        const article = articles.find(article => article._id === id);
        const index = articles.indexOf(article)
        const updatedArticle = { ...article, comments: [data, ...article.comments] }
        const newState = Object.assign([], articles, { [index]: updatedArticle })
        return { articles: newState }
      })
    } catch (e) {
      setError(e)
    }
  }
  useEffect(() => {
    fetchData();
  }, [])


  if (loading) return <Spinner />;

  if (error) {
    <Typography variant="h4">
      There was an error getting your articles, our bad.
    </Typography>;
  }
  if (!articles || !articles.length)
    return (
      <Typography variant="h4">
        There aren't any articles :(. Try back later.
      </Typography>
    );

  return (
    <React.Fragment>
      <Grid
        container
        justify="space-around"
        direction="row"
        className={classes.container}
        spacing={8}
      >
        {articles.map(article => {
          return (
            <Grid item>
              <ArticleCard article={article} key={article.id} postComment={postComment} />
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(Articles);
