const Web3 = require("web3");
const PROVIDER = "http://169.57.44.49:8545";
const ABICODE = require('../contracts/abi/Demo.json');
const CONTRACT_ADDRESS = "0xA76F556113Aa4128922aB78089189AcC6cA945b1";

const web3 = new Web3(
    new Web3.providers.HttpProvider(PROVIDER)
);
const contract = new web3.eth.Contract(ABICODE,CONTRACT_ADDRESS);

class Demo {

    atestacionFull = async(_address, _privateKey, _curp, _playground) => {
        console.log("<atestacionFull>");
        let result = false;
        let encodedABI = contract.methods.Atestacion(_curp, _playground).encodeABI();
        let signedTx = await web3.eth.accounts.signTransaction(
            {
              data: encodedABI,
              from: _address,
              gas: 2000000,
              to: CONTRACT_ADDRESS,
            },
            _privateKey,
            false,
        );
        let response = web3.eth.sendSignedTransaction(signedTx.rawTransaction).catch((err) => {
            console.error("ERR",err);
        });
        console.log("response",response);
        const blockNumber = response.blockNumber;
        let response2 = await contract.getPastEvents("AtestacionAdded", { fromBlock: blockNumber, toBlock: blockNumber });
        for(var i=0; i < response2.length; i++){
            if(response2[i].transactionHash === response.transactionHash){
                result = {
                    "id": response2[i].returnValues._id,
                    "hash": response.transactionHash
                }
            }
        }
        console.log("</atestacionFull>");
        return result;
    };

    atestacion = async(_address, _privateKey, _curp, _playground) => {
        console.log("<atestacion>");
        let result = false;
        let encodedABI = contract.methods.Atestacion(_curp, _playground).encodeABI();
        let signedTx = await web3.eth.accounts.signTransaction(
            {
              data: encodedABI,
              from: _address,
              gas: 2000000,
              to: CONTRACT_ADDRESS,
            },
            _privateKey,
            false,
        );
        let response = await web3.eth.sendSignedTransaction(signedTx.rawTransaction).catch((err) => {
            console.error("ERR",err);
        });
        console.log("</atestacion>");
        return response;
    };

    atestacionResult = async(_address, _privateKey, _response) => {
        console.log("<atestacionResult>");
        const blockNumber = _response.blockNumber;
        let response = await contract.getPastEvents("AtestacionAdded", { fromBlock: blockNumber, toBlock: blockNumber });
        for(var i=0; i < response.length; i++){
            if(response2[i].transactionHash === response.transactionHash){
                result = {
                    "id": response[i].returnValues._id,
                    "hash": _response.transactionHash
                }
            }
        }
        console.log("</atestacionResult>");
        return result;
    };

    searchByCurp = async(_curp) => {
        console.log("<searchByCurp>");
        let response = await contract.methods.SearchByCurp(_curp).call();
        console.log("</searchByCurp>");
        return response;
    };

    searchByID = async(_id) => {
        console.log("<searchByID>");
        let response = await contract.methods.SearchByID(_id).call();
        console.log("</searchByID>");
        return response;
    };

    addToWhitelist = async(_address, _privateKey, _account) => {
        console.log("<addToWhitelist>");
        let encodedABI = contract.methods.addToWhitelist(_account).encodeABI();
        let signedTx = await web3.eth.accounts.signTransaction(
            {
              data: encodedABI,
              from: _address,
              gas: 2000000,
              to: CONTRACT_ADDRESS,
            },
            _privateKey,
            false,
        );
        let response = web3.eth.sendSignedTransaction(signedTx.rawTransaction).catch((err) => {
            console.error("ERR",err);
        });
        console.log("</addToWhitelist>");
        return response;
    };

}

module.exports = Demo;