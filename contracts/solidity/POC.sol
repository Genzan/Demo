/*
  Author: Escudero Caporal Alan Enrique
  Date: 20/Junio/2022
  Version: 0.0.1
*/
pragma solidity >=0.4.22 <0.9.0;

contract POC {

  //Structs used
  struct Search {
    string curp;
    string cid;
  }

  //State Variables
  address private contractOwner;
  mapping (string => Search) internal Busquedas;

  //Events
  event SearchAdded(string _uuid, string _curp, string _cid);

  constructor() public {
    contractOwner = msg.sender;
  }
  
  function NewSearch(string memory _uuid, string memory _curp, string memory _cid) external{
    Busquedas[_uuid] = Search(_curp, _cid);
    emit SearchAdded(_uuid, _curp, _cid);
  }
  
}