require('express-async-errors');
const express = require('express');
const app = express();

require('./up/routes.js')(app);
require('./up/logging.js')();
require('./up/db.js')();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Escuchando en puerto ${port} ...`)); 