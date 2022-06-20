const Web3 = require("web3");
const PROVIDER = "http://169.57.44.49:8545";
const ABICODE = require('../contracts/abi/POC.json');
const CONTRACT_ADDRESS = "0x0CA016acE7940441d58AECC0C408332279171081";

const web3 = new Web3(
    new Web3.providers.HttpProvider(PROVIDER)
);
const contract = new web3.eth.Contract(ABICODE,CONTRACT_ADDRESS);

class POC {

    busqueda = async(_address, _privateKey, _uuid, _curp, _cid) => {
        console.log("<busqueda>");
        let result = false;
        let encodedABI = contract.methods.NewSearch(_uuid, _curp, _cid).encodeABI();
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
        const blockNumber = response.blockNumber;
        let response2 = await contract.getPastEvents("SearchAdded", { fromBlock: blockNumber, toBlock: blockNumber });
        for(var i=0; i < response2.length; i++){
            if(response2[i].transactionHash === response.transactionHash){
                result = {
                    "uuid": response2[i].returnValues._uuid,
                    "curp": response2[i].returnValues._curp,
                    "cid": response2[i].returnValues._cid,
                }
            }
        }
        console.log("</busqueda>");
        return result;
    };

}

module.exports = POC;