const truffleAssert = require('truffle-assertions');
const Demo = artifacts.require("Demo");

contract('Prueba unitaria para el contrato Demo', (accounts) => {
    let instanceDemo;
    before('Setup para todos los contratos', async function () {
        instanceDemo = await Demo.deployed();
    });
    it('Se crea una nueva atestacion con el usuario 0', async () => {
        const tx = await instanceDemo.Atestacion("EUCA870810","PruebaDePlayground", { from: accounts[0] });
        truffleAssert.eventEmitted(tx, 'AtestacionAdded', (ev) => {
            return true;
        }, 'ERR','El Evento no fue lanzado');
    });
    it('El usuario 1 intenta revisar la atestacion recien creada con el metodo de SearchByCurp y revierte', async () => {
        await truffleAssert.reverts(instanceDemo.SearchByCurp("EUCA870810", { from: accounts[1] }),"revert");
    });
    it('El usuario 1 intenta revisar la atestacion recien creada con el metodo de SearchByID y revierte', async () => {
        await truffleAssert.reverts(instanceDemo.SearchByID("1", { from: accounts[1] }),"revert");
    });
    it('El usuario 0 obtiene los datos de la atestacion usando el metodo SearchByCurp', async () => {
        const res = await instanceDemo.SearchByCurp("EUCA870810", { from: accounts[0] });
        assert.equal(res.toString(), "PruebaDePlayground", "Mensaje incorrecto");
    });
    it('El usuario 0 obtiene los datos de la atestacion usando el metodo SearchByCurp', async () => {
        const res = await instanceDemo.SearchByID("1", { from: accounts[0] });
        assert.equal(res.toString(), "PruebaDePlayground", "Mensaje incorrecto");
    });
    it('El usuario 1 intenta crear una nueva atestacion y revierte por falta de permisos', async () => {
        await truffleAssert.reverts(instanceDemo.Atestacion("RCAZ150393", "PruebaFallida", { from: accounts[1] }),"revert");
    });
    it('El usuario 0 intenta crear una nueva atestacion y revierte por falta de parametros o parametros vacios', async () => {
        await truffleAssert.reverts(instanceDemo.Atestacion("RCAZ150393", { from: accounts[0] }),"revert");
    });
    it('El usuario 1 intenta darse permisos para hacer atestaciones con el metodo addToWhitelist y revierte por falta de parametros o parametros vacios', async () => {
        await truffleAssert.reverts(instanceDemo.addToWhitelist(accounts[1], { from: accounts[1] }),"revert");
    });
    it('El usuario 0 da permisos para realizar atestaciones al usuario 1 y este genera una nueva atestacion', async () => {
        await instanceDemo.addToWhitelist(accounts[1], { from: accounts[0] });
        const tx = await instanceDemo.Atestacion("RCAZ150393","PruebaConNuevoUsuario", { from: accounts[1] });
        truffleAssert.eventEmitted(tx, 'AtestacionAdded', (ev) => {
            return true;
        }, 'ERR','El Evento no fue lanzado');
    });
    it('Validar el Playground de la atestacion con ID 2', async () => {
        const res = await instanceDemo.SearchByID("2", { from: accounts[1] });
        assert.equal(res.toString(), "PruebaConNuevoUsuario", "Mensaje incorrecto");
    });
});