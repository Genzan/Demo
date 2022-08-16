const truffleAssert = require('truffle-assertions');
const Demo = artifacts.require("Demo");

contract('Prueba unitaria para el contrato EBL', (accounts) => {
    let instanceDemo;
    before('Setup para todos los contratos', async function () {
        instanceDemo = await Demo.deployed();
    });
    it('Se crea una nueva atestacion', async () => {
        const tx = await instanceDemo.Atestacion("EUCA870810","PruebaDePlayground", { from: accounts[0] });
        truffleAssert.eventEmitted(tx, 'AtestacionAdded', (ev) => {
            return true;
        }, 'ERR','El Evento no fue lanzado');
    });
});