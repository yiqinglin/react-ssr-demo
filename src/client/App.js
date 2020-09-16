import React, { useState, useEffect, useMemo } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Container, Box, Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import CoffeeCard from "./CoffeeCard";
import "./app.css";

function App() {
  const [coffeeDrinks, setCoffeeDrinks] = useState([]);
  const [prefersDarkMode, setPrefersDarkMode] = useState(false);

  useEffect(() => {
    fetch("/api/getCoffee")
      .then((res) => res.json())
      .then((res) => setCoffeeDrinks(res.data));
  }, []);

  // const theme = React.useMemo(
  //   () => createMuiTheme({
  //     palette: {
  //       type: prefersDarkMode ? "dark" : "light",
  //     },
  //   }),
  //   [prefersDarkMode]
  // );
  const theme = createMuiTheme({
    palette: {
      type: "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="content">
        <div className="card-container">
          {coffeeDrinks.length > 0 &&
            coffeeDrinks.map((drink) => (
              <CoffeeCard id={drink.id} drink={drink} />
            ))}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
