/*
  Author: Escudero Caporal Alan Enrique
  Date: 08/Junio/2022
  Version: 0.0.2
*/
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract Demo {

  //Errors
  error NotOwnerOfSearch();

  //State Variables
  using Counters for Counters.Counter;
  Counters.Counter private _Ids;
  mapping (bytes32 => atestacion) internal Atestaciones;
  mapping (uint256 => atestacion) internal Busqueda;
  mapping (address => bool) private whitelist;

  //Structs

  struct atestacion {
    string[] playground;
    address owner;
  }

  //Events
  event AtestacionAdded(uint256 _id, string _curp, string _playground);

  modifier onlyGuest() {
    require(whitelist[msg.sender], "Not on Whitelist");
    _;
  }

  constructor() public {
    whitelist[msg.sender] = true;
  }
  
  function Atestacion(string memory _curp, string memory _playground) external {
    _Ids.increment();
    uint256 newItemId = _Ids.current();
    Atestaciones[keccak256(abi.encodePacked(_curp))].playground.push(_playground);
    Atestaciones[keccak256(abi.encodePacked(_curp))].owner = msg.sender;
    Busqueda[newItemId].playground.push(_playground);
    Busqueda[newItemId].owner = msg.sender;
    emit AtestacionAdded(newItemId, _curp, _playground);
  }

  function SearchByCurp(string memory _curp) external view returns (string[] memory) {
    if(Atestaciones[keccak256(abi.encodePacked(_curp))].owner == msg.sender) {
      revert NotOwnerOfSearch();
    }
    return (Atestaciones[keccak256(abi.encodePacked(_curp))].playground);
  }

  function SearchByID(uint256 _id) external view returns (string[] memory) {
    if(Busqueda[_id].owner == msg.sender) {
      revert NotOwnerOfSearch();
    }
    return (Busqueda[_id].playground);
  }

  function addToWhitelist(address _account) external onlyGuest {
    whitelist[_account] = true;
  }
  
}