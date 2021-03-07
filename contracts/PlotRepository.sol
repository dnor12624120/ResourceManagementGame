pragma solidity >=0.4.22 <0.9.0;

import "./Plot.sol";

contract PlotRepository {
  struct _Plot {
    Plot plot;
    bool isSet;
  }

  mapping (address => _Plot) public plots;

  modifier isCalledByEOA(address _addr) {
    require(!isContract(_addr));
    _;
  }

  modifier isUniquelyClaimed(address _addr) {
    require(!plots[_addr].isSet);
    _;
  }

  function isContract(address _addr)
    private
    view
    returns (bool) {
      uint32 size;
      assembly {
        size := extcodesize(_addr)
      }
      return size > 0;
  }

  function claimPlot(address _addr)
    public
    isCalledByEOA(_addr)
    isUniquelyClaimed(_addr) {
      plots[_addr].plot = new Plot();
      plots[_addr].isSet = true;
  }
}
