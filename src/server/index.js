import path from 'path';
import fs from 'fs';
import os from 'os';
import qs from 'qs';
import express from 'express';
import serialize from 'serialize-javascript'; // for providing data to client.
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import React from 'react';
import ReactDOMServer from 'react-dom/server'; // for server side rendering
import { StaticRouter } from 'react-router-dom'; // for supporting routing
import { ServerStyleSheets } from '@material-ui/core/styles'; // provide material style

import App from '../shared/App';
import reducers from '../reducers';

require('isomorphic-fetch');

const app = express();
const coffeeDrinks = require('./data.json');

// API.
app.get('/api/getCoffee', (req, res) => {
  res.send({ data: coffeeDrinks });
});

// Serve static files.
app.use(express.static('dist'));

// Server-side rendering. Returns renderred app.
app.get('/demo2', (req, res) => {
  const reactString = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );

  const indexFile = path.resolve('./dist/index.html');
  fs.readFile(indexFile, 'utf8', (err, page) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    const pageToRender = page.replace(
      '<div id="root"></div>',
      `<div id="root">${reactString}</div>`
    );
    return res.send(pageToRender);
  });
});

// Demo fetch data at server side.
app.get('/demo3', (req, res) => {
  // Fetch data on server.
  const promise = fetch('http://localhost:7788/api/getCoffee').then(data => data.json());

  promise.then((fetchedData) => {
    const context = fetchedData;

    const reactString = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    );

    const indexFile = path.resolve('./dist/index.html');
    fs.readFile(indexFile, 'utf8', (err, page) => {
      if (err) {
        console.error('Something went wrong:', err);
        return res.status(500).send('Oops, better luck next time!');
      }

      const pageToRender = page.replace(
        '<div id="root"></div>',
        `<div id="root">${reactString}</div>
         <script>window.__ROUTE_DATA__ = ${serialize(fetchedData.data)}</script>`
      );

      return res.send(pageToRender);
    });
  });
});

// Demo fetch data at server side.
app.get('/demo(3-css|4*)', (req, res) => {
  // Fetch data on server.
  const promise = fetch('http://localhost:7788/api/getCoffee').then(data => data.json());

  promise.then((fetchedData) => {
    const sheets = new ServerStyleSheets(); // for collecting css involved.
    const context = fetchedData;

    const reactString = ReactDOMServer.renderToString(sheets.collect(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    ));
    const css = sheets.toString();

    const indexFile = path.resolve('./dist/index.html');
    fs.readFile(indexFile, 'utf8', (err, page) => {
      if (err) {
        console.error('Something went wrong:', err);
        return res.status(500).send('Oops, better luck next time!');
      }

      const pageToRender = page.replace(
        '<div id="root"></div>',
        `<div id="root">${reactString}</div>
         <script>window.__ROUTE_DATA__ = ${serialize(fetchedData.data)}</script>`
      ).replace(
        '</head>',
        `<style id="jss-server-side">${css}</style></head>`
      );

      return res.send(pageToRender);
    });
  });
});

app.get('/demo5', (req, res) => {
  // Fetch data on server.
  fetch('http://localhost:7788/api/getCoffee').then(data => data.json()).then((fetchedData) => {
    const sheets = new ServerStyleSheets(); // for collecting css involved.

    // ============ BEGIN Redux Store ==============
    // Prepare initial states of Redux store.
    // Read the counter from the request, if provided.
    const params = qs.parse(req.query);
    const favorite = parseInt(params.favorite, 10) || -1;

    // Compile an initial state
    const preloadedState = { coffeeDrinks: fetchedData.data, favorite };

    // Create a new Redux store instance
    const store = createStore(reducers, preloadedState);
    // ============ END Redux Store ==============

    const reactString = ReactDOMServer.renderToString(sheets.collect(
      <Provider store={store}>
        <StaticRouter location={req.url}>
          <App />
        </StaticRouter>
      </Provider>
    ));

    const css = sheets.toString();
    const finalState = store.getState(); // Grab the initial state from our Redux store

    const indexFile = path.resolve('./dist/index.html');
    fs.readFile(indexFile, 'utf8', (err, page) => {
      if (err) {
        console.error('Something went wrong:', err);
        return res.status(500).send('Oops, better luck next time!');
      }

      const pageToRender = page.replace(
        '<div id="root"></div>',
        `<div id="root">${reactString}</div><script>
          window.__ROUTE_DATA__ = ${serialize(fetchedData.data)};
          window.__PRELOADED_STATE__ = ${JSON.stringify(finalState).replace(/</g, '\\u003c')};
        </script>`
      ).replace(
        '</head>',
        `<style id="jss-server-side">${css}</style></head>`
      );

      return res.send(pageToRender);
    });
  });
});

app.listen(process.env.PORT || 7788, () => console.log(`Listening on port ${process.env.PORT || 7788}!`));
