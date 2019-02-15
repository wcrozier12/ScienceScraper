import React from "react";
import moment from 'moment'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
const Comment = props => {
  const now = moment();
  const timeSincePosted = moment.duration(now.diff(props.postedAt));
  const durationInMinutes = timeSincePosted.asMinutes();
  const durationInHours = timeSincePosted.asHours();
  const durationInDays = timeSincePosted.asDays();
  const postedAt = () => {
    if (durationInMinutes > 60 && durationInHours < 24) {
      return `${Math.floor(durationInHours)} hour${Math.floor(durationInHours) > 1 ? 's' : ''} ago`
    }
    if (durationInMinutes > 60 && durationInHours > 24) {
      return `${Math.floor(durationInDays)} day${Math.floor(durationInDays) > 1 ? 's' : ''} ago`
    }
    return `${Math.floor(durationInMinutes)} minute${Math.floor(durationInMinutes) > 1 ? 's' : ''} ago`
  }
  return (
    <React.Fragment>
      <ListItem>
        <Grid container direction="column" spacing={8}>
          <Grid item><Typography variant="h6"> {props.content} </Typography></Grid>
          <Grid item><Typography variant="caption"> {postedAt()} </Typography></Grid>
        </Grid>
      </ListItem>
      <Divider />
    </React.Fragment>
  );
};

export default Comment;
