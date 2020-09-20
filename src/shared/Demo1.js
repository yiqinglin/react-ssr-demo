import React, { useState, useEffect } from 'react';

import CoffeeList from './components/CoffeeList';

export default function Demo1() {
  const [coffeeDrinks, setCoffeeDrinks] = useState([]);

  useEffect(() => {
    fetch('/api/getCoffee')
      .then(res => res.json())
      .then(res => setCoffeeDrinks(res.data));
  }, []);

  return (
    <>
      <h1>Grab a coffee!</h1>
      <p>List is fetched by browser.</p>
      <CoffeeList drinks={coffeeDrinks} />
    </>
  );
}
