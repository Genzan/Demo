// Carga de Librerias Externas
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { CID } = require('ipfs-http-client');
// Carga de Librerias Internas
const POC = require('./tools/POC.js');

const SERVERPORT = "8010";

const POCObj = new POC();
const app = express();

var rawBodyHandler = function (req, res, buf, encoding) {
  if (buf && buf.length) {
      req.rawBody = buf.toString(encoding || 'utf8');
  }
}

app.use(cors({ allowedHeaders: 'Content-Type, Cache-Control' }));
app.options('*', cors());
app.use(bodyParser.json({ verify: rawBodyHandler }));

app.post('/dev/busqueda', async (req, res) => {
  const ipfs = new CID({ host: 'ipfs.infura.io', port: 5001,protocol: 'https' });
  const cid = await ipfs.add(req.body._buffer);
  let response = await POCObj.busqueda(
    req.body._address, req.body._privateKey, req.body._uuid, req.body._curp, cid);
  res.status(200).send(response);
});

// run the app server and tunneling service
app.listen(SERVERPORT, () => {
  console.log(`Demo listening at http://localhost:${SERVERPORT}`)
});