// Carga de Librerias Externas
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Carga de Librerias Internas
const Demo = require('./tools/Demo.js');

const SERVERPORT = "8010";

const demoObj = new Demo();
const app = express();

var rawBodyHandler = function (req, res, buf, encoding) {
  if (buf && buf.length) {
      req.rawBody = buf.toString(encoding || 'utf8');
  }
}

app.use(cors({ allowedHeaders: 'Content-Type, Cache-Control' }));
app.options('*', cors());
app.use(bodyParser.json({ verify: rawBodyHandler }));

app.post('/dev/atestacion', async (req, res) => {
  let response = await demoObj.atestacion(req.body._address, req.body._privateKey, req.body._curp, req.body._playground);
  res.status(200).send(response);
});

app.get('/dev/searchByCurp', async (req, res) => {
  let response = await demoObj.getUserData(req.body._curp);
  res.status(200).send(response);
});

app.get('/dev/searchByID', async (req, res) => {
  let response = await demoObj.isUserActive(req.body._id);
  res.status(200).send(response);
});

// run the app server and tunneling service
app.listen(SERVERPORT, () => {
  console.log(`Demo listening at http://localhost:${SERVERPORT}`)
});