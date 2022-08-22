const Web3 = require("web3");
const PROVIDER = "http://169.57.44.49:8545";
const ABICODE = require('../contracts/abi/Demo.json');
const CONTRACT_ADDRESS = "0xf4fb48566c4d60fBE5F653e0E83E32E7199E2c00";

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
        let response = await web3.eth.sendSignedTransaction(signedTx.rawTransaction).catch((err) => {
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
        console.log("</atestacion>");
        return response;
    };

    atestacionResult = async(_response) => {
        console.log("<atestacionResult>");
        let result = false;
        const blockNumber = _response.blockNumber;
        let events = await contract.getPastEvents("AtestacionAdded", { fromBlock: blockNumber, toBlock: blockNumber });
        for(var i=0; i < events.length; i++){
            if(events[i].transactionHash === _response.transactionHash){
                result = {
                    "id": events[i].returnValues._id,
                    "hash": _response.transactionHash
                }
            }
        }
        console.log("</atestacionResult>");
        return result;
    };

    searchByCurp = async(_address, _curp) => {
        console.log("<searchByCurp>");
        let response = await contract.methods.SearchByCurp(_curp).call({from:_address});
        console.log("</searchByCurp>");
        return response;
    };

    searchByID = async(_address, _id) => {
        console.log("<searchByID>");
        let response = await contract.methods.SearchByID(_id).call({from:_address});
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

    removeFromWhitelist = async(_address, _privateKey, _account) => {
        console.log("<removeFromWhitelist>");
        let encodedABI = contract.methods.removeFromWhitelist(_account).encodeABI();
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
        console.log("</removeFromWhitelist>");
        return response;
    };

}

module.exports = Demo;