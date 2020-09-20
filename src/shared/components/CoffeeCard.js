import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, CardContent, CardHeader, Avatar, CardActions, IconButton
} from '@material-ui/core';
import {
  deepOrange, deepPurple, red, green, blue
} from '@material-ui/core/colors';

import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    paddingBottom: 65,
    height: '100%',
    boxSizing: 'border-box',
  },
  actions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  avatarOrange: {
    color: '#fff',
    backgroundColor: deepOrange[300],
  },
  avatarPurple: {
    color: '#fff',
    backgroundColor: deepPurple[300],
  },
  avatarRed: {
    color: '#fff',
    backgroundColor: red[300],
  },
  avatarGreen: {
    color: '#fff',
    backgroundColor: green[300],
  },
  avatarBlue: {
    color: '#fff',
    backgroundColor: blue[300],
  }
});

export default function CoffeeCard({ drink, isFavorite = false, onClick }) {
  const classes = useStyles();
  const avatarClasses = [
    classes.avatarBlue, classes.avatarGreen, classes.avatarOrange,
    classes.avatarPurple, classes.avatarRed];

  const random = (seed) => {
    const x = Math.sin(0.1 + seed) * 10000;
    return x - Math.floor(x);
  };
  const randId = Math.floor(random(drink.id) * avatarClasses.length);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar className={avatarClasses[randId]}>{drink.avatar}</Avatar>
        }
        title={drink.name}
      />
      <CardContent>
        <Typography variant="caption" display="block" color="textSecondary">
          {drink.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.actions}>
        <IconButton aria-label="add to favorites" color={isFavorite ? 'secondary' : 'default'} onClick={onClick}>
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
