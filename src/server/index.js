require('isomorphic-fetch');

const express = require('express');
const os = require('os');

const app = express();
const coffeeDrinks = require('./data.json');

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.get('/api/getCoffee', (req, res) => {
  res.send({ data: coffeeDrinks });
});

app.listen(process.env.PORT || 7788, () => console.log(`Listening on port ${process.env.PORT || 7788}!`));
