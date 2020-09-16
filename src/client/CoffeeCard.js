import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: 250,
    height: 160,
    margin: 10,
  },
});

export default function CoffeeCard({ drink }) {
  const classes = useStyles();

  return (
    <Card key={drink.id} className={classes.root} flexGrow="1">
      <CardContent>
        <Typography variant="subtitle1" component="h4">
          {drink.name}
        </Typography>
        <Typography variant="caption" display="block" color="textSecondary">
          {drink.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
