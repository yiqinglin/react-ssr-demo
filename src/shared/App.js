import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { Route, Switch, NavLink } from 'react-router-dom';

import Demo1 from './Demo1';
// Demo 2 uses same component as Demo1, but rendered from server side.
import Demo3 from './Demo3';
import Demo4 from './Demo4';
import Demo4PH from './Demo4PH';
import Demo5 from './Demo5';
import './app.css';

function App() {
  const theme = createMuiTheme({
    palette: {
      type: 'light',
    },
    typography: {
      fontSize: 13,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <p>
          [Server] HTTP Links:
          {' '}
          <a href="/">Demo 1</a>
          ,
          {' '}
          <a href="/demo2">Demo 2</a>
          ,
          {' '}
          <a href="/demo3">Demo 3</a>
          ,
          {' '}
          <a href="/demo3-css">Demo 3 CSS</a>
          ,
          {' '}
          <a href="/demo4">Demo 4</a>
          ,
          {' '}
          <a href="/demo4-placeholder">Demo 4 Placeholder</a>
          ,
          {' '}
          <a href="/demo5">Demo 5</a>
          ,
          {' '}
          <a href="/demo5?favorite=2">Demo 5 with favorite coffee</a>
        </p>
        {/* <p>[Client] React NavLinks: <NavLink to="/">/</NavLink>, <NavLink to="/demo2">/demo2</NavLink>, <NavLink to="/demo3">/demo3</NavLink>, <NavLink to="/demo3-css">/demo3-css</NavLink></p> */}
        <Switch>
          <Route exact path="/" component={Demo1} />
          <Route path="/demo2" component={Demo1} />
          <Route path="/demo3" component={Demo3} />
          <Route path="/demo3-css" component={Demo3} />
          <Route path="/demo4" component={Demo4} />
          <Route path="/demo4-placeholder" component={Demo4PH} />
          <Route path="/demo5" component={Demo5} />
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

export default App;
