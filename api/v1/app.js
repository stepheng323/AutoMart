/* eslint-disable no-unused-vars */
const express = require('express');

const router = require('./routes/signup');

const app = express();
app.use(router);

const port = process.env.PORT || 3000;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server running on port ${port}...`));

module.exports = app;
