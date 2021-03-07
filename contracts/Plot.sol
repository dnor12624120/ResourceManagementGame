pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract Plot {
  struct Item {
    string name;
    uint value;
  }

  struct InventoryItem {
    Item item;
    uint count;
  }

  struct Action {
    string name;
    uint startTime;
    uint duration;
    Item rewardOnCompletion;
  }

  struct Inventory {
    mapping (string => InventoryItem) items;
    string[] keys;
    uint size;
  }

  event ActionStarted(uint8, uint8, uint, string);

  address owner;
  uint8 constant public size = 8;
  bytes1[size * size] public tiles;
  Action[size * size] public actionsInProgress;
  Inventory public inventory;


  constructor(address _owner) public {
    owner = _owner;
    inventory.items["Seeds"] = InventoryItem(Item("Seeds", 1), 3);
    inventory.items["Bait"] = InventoryItem(Item("Bait", 5), 1);
    bytes32 seed1 = keccak256(abi.encodePacked(block.timestamp));
    bytes32 seed2 = keccak256(abi.encodePacked(block.timestamp + 1));
    for(uint8 i = 0; i < size * size; i += 2) {
        tiles[i] = seed1[i / 2];
        tiles[i + 1] = seed2[i / 2];
    }
  }

  modifier isWithinBounds(uint8 _x, uint8 _y, string memory _item) {
    require(_x >= 0 && _x < size, "Invalid cell to plant.");
    require(_y >= 0 && _y < size, "Invalid cell to plant.");
    _;
  }

  modifier isNonConflictingAction(uint8 _x, uint8 _y, string memory _item) {
    require(keccak256(bytes(actionsInProgress[_x * size + _y].name)) == keccak256(bytes("")) ||
            actionsInProgress[_x * size + _y].startTime + actionsInProgress[_x * size + _y].duration <
            block.timestamp,
     "Another action is already in progress");
    _;
  }

  modifier hasBait() {
    require(inventory.items["bait"].count > 0);
    _;
  }

  modifier hasSeed() {
    require(inventory.items["seed"].count > 0);
    _;
  }

  function getTiles()
    public
    returns(bytes1[size * size] memory) {
      updateState();
      return tiles;
  }

  function updateState() internal {
      for(uint i = 0; i < size * size; i++) {
          if(actionsInProgress[i].startTime +
             actionsInProgress[i].duration <
             block.timestamp) {
              actionsInProgress[i] = Action("", 0, 0, Item("", 0));
          }
      }
  }

  function plant(uint8 _x, uint8 _y, string memory _item)
    public
    isWithinBounds(_x, _y, _item)
    isNonConflictingAction(_x, _y, _item)
    hasSeed() {
      actionsInProgress[_x * size + _y] = Action("Plant seeds", block.timestamp, 1 minutes, Item("Carrots", 10));
      inventory.items["seed"].count--;
      emit ActionStarted(_x, _y, block.timestamp, "Seeds planted");
  }

  function fish(uint8 _x, uint8 _y, string memory _item)
    public
    isWithinBounds(_x, _y, _item)
    isNonConflictingAction(_x, _y, _item)
    hasBait() {
      actionsInProgress[_x * size + _y] = Action("Fish", block.timestamp, 1 minutes, Item("Cod", 20));
      inventory.items["bait"].count--;
      emit ActionStarted(_x, _y, block.timestamp, "Seeds planted");
  }
}
