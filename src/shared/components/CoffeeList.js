import React from 'react';
import { Grid } from '@material-ui/core';

import CoffeeCard from './CoffeeCard';

export default function CoffeeList({ drinks, favorite = null, selectFavorite = () => {} }) {
  // if (!drinks || drinks.length === 0) return null;

  return (
    <Grid
      container
      spacing={3}
      direction="row"
      justify="flex-start"
      alignItems="stretch"
    >
      {drinks && drinks.length > 0 && drinks.map(
        drink => (
          <Grid item xs={3} key={drink.id}>
            <CoffeeCard
              id={drink.id}
              drink={drink}
              isFavorite={favorite === drink.id}
              onClick={() => selectFavorite(drink.id)}
            />
          </Grid>
        )
      )}
    </Grid>
  );
}
