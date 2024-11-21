import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (_req, res) => {
  res.send('hello')
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
