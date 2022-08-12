const truffleAssert = require('truffle-assertions');
const Demo = artifacts.require("Demo");

contract('Prueba unitaria para el contrato EBL', (accounts) => {
    let instanceDemo;
    before('Setup para todos los contratos', async function () {
        instanceDemo = await Demo.deployed();
    });
});