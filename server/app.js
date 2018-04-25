const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require('./config');

const proveedoresRoutes = require("./routes/proveedores");
const clientesRoutes    = require("./routes/clientes");
const softwareRoutes    = require("./routes/software");
const licenciasRoutes   = require("./routes/licencias");

mongoose.Promise = global.Promise; 
mongoose.connect(config.database)
  .then(() => {
      console.log('Servidor corriendo en puerto ' + config.port + ' ...');
    })
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/proveedores", proveedoresRoutes);
app.use("/clientes", clientesRoutes);
app.use("/software", softwareRoutes);
app.use("/licencias", licenciasRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
