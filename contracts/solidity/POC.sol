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
    uint32 finalScore;
    bool closed;
    Response[] Responses;
  }

  struct Response {
    address node;
    bool found;
    uint32 score;
  }

  //State Variables
  address private contractOwner;
  uint16 private requiredResponses;
  mapping (string => Search) internal Searches;
  //mapping (string => Response[]) internal Responses;

  //Events
  event SearchAdded(string _uuid, string _curp, string _cid);
  event ResultAdded(string _uuid, address _node);
  event SearchClosed(string _uuid, string _curp);

  constructor(uint16 _requiredResponses) {
    contractOwner = msg.sender;
    requiredResponses = _requiredResponses;
  }
  
  function newSearch(string memory _uuid, string memory _curp, string memory _cid) external {
    //Searches[_uuid] = Search(_curp, _cid, 0, false);
    Searches[_uuid].curp = _curp;
    Searches[_uuid].cid = _cid;
    emit SearchAdded(_uuid, _curp, _cid);
  }

  function newResult(string memory _uuid, address _node, bool _found, uint32 _score) external {
    require(!isOpen(_uuid), "ERR: Search is closed");
    Searches[_uuid].Responses.push(Response(_node, _found, _score));
    checkforClose(_uuid);
    emit ResultAdded(_uuid, _node);
  }

  function checkforClose(string memory _uuid) internal {
    if(Searches[_uuid].Responses.length >= requiredResponses) {
      Searches[_uuid].closed = true;
      // Se calcula el promedio aqui? o que se hace?
      emit SearchClosed(_uuid, Searches[_uuid].curp);
    }
  }

  function isOpen(string memory _uuid) public view returns(bool) {
    return Searches[_uuid].closed;
  }
  
}