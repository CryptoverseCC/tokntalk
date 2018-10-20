const netWorkIdForNetworkName = {
  ethereum: 1,
  ropsten: 3,
  rinkeby: 4,
  kovan: 42,
};

export const networkNameForNetworkId = {
  [netWorkIdForNetworkName.ethereum]: 'ethereum',
  [netWorkIdForNetworkName.ropsten]: 'ropsten',
  [netWorkIdForNetworkName.rinkeby]: 'rinkeby',
  [netWorkIdForNetworkName.kovan]: 'kovan',
};

export const networkExplorerForNetworkId = {
  [netWorkIdForNetworkName.ethereum]: 'etherscan.io',
  [netWorkIdForNetworkName.ropsten]: 'ropsten.etherscan.io',
  [netWorkIdForNetworkName.rinkeby]: 'rinkeby.etherscan.io',
  [netWorkIdForNetworkName.kovan]: 'kovan.etherscan.io',
};

export const claimContractAddressesForNetworkId = {
  [netWorkIdForNetworkName.ethereum]: '0xFd74f0ce337fC692B8c124c094c1386A14ec7901',
  [netWorkIdForNetworkName.ropsten]: '0x6f32a6F579CFEed1FFfDc562231C957ECC894001',
  [netWorkIdForNetworkName.rinkeby]: '0xC5De286677AC4f371dc791022218b1c13B72DbBd',
  [netWorkIdForNetworkName.kovan]: '0x139d658eD55b78e783DbE9bD4eb8F2b977b24153',
};

export const claimWithValueTransferContractAddressesForNetworkId = {
  [netWorkIdForNetworkName.ethereum]: '0xfad31a5672fBd8243E9691E8a5F958699CD0AaA9',
  [netWorkIdForNetworkName.ropsten]: '0x298611B2798d280910274C222A9dbDfBA914B058',
  [netWorkIdForNetworkName.rinkeby]: '0x1f8A01833A0B083CCcd87fffEe50EF1D35621fD2',
  [netWorkIdForNetworkName.kovan]: '0x0c20Daa719Cd4fD73eAf23d2Cb687cD07d500E17',
};

export const claimWithTokenValueTransferContractAddressesForNetworkId = {
  [netWorkIdForNetworkName.ethereum]: '0xecbed48098c4f25a16195c45ddf5fd736e28b14b',
  [netWorkIdForNetworkName.ropsten]: '0x1a97aba0fb047cd8cd8f4c14d890be6e7004fae9',
  [netWorkIdForNetworkName.rinkeby]: '0xa105908d1bd7e76ec4dfddd08d9e0c89f6b39474',
  [netWorkIdForNetworkName.kovan]: '0xcf53d90e7f71c7db557bc42c5a85d36dd53956c0',
};

export const claimWithConfigurableValueMultiTransferContractAddressesForNetworkId = {
  [netWorkIdForNetworkName.ethereum]: '0xfad31a5672fBd8243E9691E8a5F958699CD0AaA9',
  [netWorkIdForNetworkName.ropsten]: '0x298611B2798d280910274C222A9dbDfBA914B058',
  [netWorkIdForNetworkName.rinkeby]: '0x1f8A01833A0B083CCcd87fffEe50EF1D35621fD2',
  [netWorkIdForNetworkName.kovan]: '0x0c20Daa719Cd4fD73eAf23d2Cb687cD07d500E17',
};

export const claimWithConfigurableTokenValueMultiTransferContractAddressesForNetworkId = {
  [netWorkIdForNetworkName.ethereum]: '0xeCBED48098C4F25a16195c45DdF5fD736E28B14b',
  [netWorkIdForNetworkName.ropsten]: '0x1A97Aba0fb047cd8cd8F4c14D890bE6E7004fae9',
  [netWorkIdForNetworkName.rinkeby]: '0xA105908d1Bd7e76Ec4Dfddd08d9E0c89F6B39474',
  [netWorkIdForNetworkName.kovan]: '0xcF53D90E7f71C7Db557Bc42C5a85D36dD53956C0',
};

export const claimContractAbi = [
  {
    constant: false,
    inputs: [{ name: 'data', type: 'string' }],
    name: 'post',
    outputs: [],
    payable: false,
    type: 'function',
  },
];

export const claimWithValueTransferContractAbi = [
  {
    constant: false,
    inputs: [
      {
        name: 'data',
        type: 'string',
      },
      {
        name: 'recipients',
        type: 'address[]',
      },
      {
        name: 'values',
        type: 'uint256[]',
      },
    ],
    name: 'post',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
];

export const claimWithTokenValueTransferContractAbi = [
  {
    constant: false,
    inputs: [
      {
        name: 'data',
        type: 'string',
      },
      {
        name: 'recipients',
        type: 'address[]',
      },
      {
        name: 'token',
        type: 'address',
      },
      {
        name: 'values',
        type: 'uint256[]',
      },
    ],
    name: 'post',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const erc20ContractAbi = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'spender',
        type: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'from',
        type: 'address',
      },
      {
        name: 'to',
        type: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'to',
        type: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'address',
      },
      {
        name: '',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        name: '_name',
        type: 'string',
      },
      {
        name: '_symbol',
        type: 'string',
      },
      {
        name: '_decimals',
        type: 'uint256',
      },
      {
        name: '_totalSupply',
        type: 'uint256',
      },
      {
        name: 'feeAddress',
        type: 'address',
      },
      {
        name: 'feeDivider',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
];

export const erc721ContractAbi = [
  // Add safeTransferFrom
  {
    constant: false,
    name: 'transferFrom',
    inputs: [
      { name: '_from', type: 'address' },
      { name: '_to', type: 'address' },
      { name: '_tokenId', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
    payable: true,
    type: 'function',
  },
];

export const mintTokensContractAbi = [
  {
    constant: false,
    inputs: [
      {
        name: 'max',
        type: 'uint256',
      },
      {
        name: 'v',
        type: 'uint8',
      },
      {
        name: 'r',
        type: 'bytes32',
      },
      {
        name: 's',
        type: 'bytes32',
      },
    ],
    name: 'mintUsingSignature',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'addr',
        type: 'address',
      },
    ],
    name: 'mintedBy',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

export const ERC20Code = `
pragma solidity ^0.4.24;

contract ERC20 {

    event Transfer(address indexed from, address indexed to, uint amount);
    event Approval(address indexed owner, address indexed spender, uint amount);

    uint private constant MAX_UINT = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF;

    string public name;
    string public symbol;
    uint public decimals;
    uint public totalSupply;

    mapping (address => uint) public balanceOf;
    mapping (address => mapping (address => uint)) public allowance;

    constructor(string _name, string _symbol, uint _decimals, uint _totalSupply, address feeAddress, uint feeDivider) public {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply = _totalSupply * 10**_decimals;
        uint platformFee = (totalSupply/feeDivider);
        balanceOf[msg.sender] = totalSupply-platformFee;
        emit Transfer(0, msg.sender, balanceOf[msg.sender]);
        balanceOf[feeAddress] = balanceOf[feeAddress] + platformFee;
        emit Transfer(0, feeAddress, platformFee);
    }

    function transfer(address to, uint amount) external returns (bool) {
        assert(to != address(this));
        assert(to != 0);
        uint balanceOfMsgSender = balanceOf[msg.sender];
        assert(balanceOfMsgSender >= amount);
        balanceOf[msg.sender] = balanceOfMsgSender - amount;
        balanceOf[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function transferFrom(address from, address to, uint amount) external returns (bool) {
        assert(to != address(this));
        assert(to != 0);
        uint allowanceMsgSender = allowance[from][msg.sender];
        assert(allowanceMsgSender >= amount);
        if (allowanceMsgSender != MAX_UINT) {
            allowance[from][msg.sender] = allowanceMsgSender - amount;
        }
        uint balanceOfFrom = balanceOf[from];
        assert(balanceOfFrom >= amount);
        balanceOf[from] = balanceOfFrom - amount;
        balanceOf[to] += amount;
        emit Transfer(from, to, amount);
        return true;
    }

    function approve(address spender, uint amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }
}
`;
export const ERC20Bytecode = {
  linkReferences: {},
  object:
    '608060405234801561001057600080fd5b506040516107bd3803806107bd8339810160409081528151602080840151928401516060850151608086015160a08701519487018051909796909601959294919390926000916100649183918a0190610128565b508551610078906001906020890190610128565b506002859055600a85900a84026003819055829081151561009557fe5b600354336000818152600460209081526040808320969095049384900395869055845195865293519295509093909260008051602061079d83398151915292918290030190a3600160a060020a03831660008181526004602090815260408083208054860190558051858152905160008051602061079d833981519152929181900390910190a3505050505050506101c3565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061016957805160ff1916838001178555610196565b82800160010185558215610196579182015b8281111561019657825182559160200191906001019061017b565b506101a29291506101a6565b5090565b6101c091905b808211156101a257600081556001016101ac565b90565b6105cb806101d26000396000f3006080604052600436106100985763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166306fdde03811461009d578063095ea7b31461012757806318160ddd1461015f57806323b872dd14610186578063313ce567146101b057806370a08231146101c557806395d89b41146101e6578063a9059cbb146101fb578063dd62ed3e1461021f575b600080fd5b3480156100a957600080fd5b506100b2610246565b6040805160208082528351818301528351919283929083019185019080838360005b838110156100ec5781810151838201526020016100d4565b50505050905090810190601f1680156101195780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561013357600080fd5b5061014b600160a060020a03600435166024356102d4565b604080519115158252519081900360200190f35b34801561016b57600080fd5b5061017461033a565b60408051918252519081900360200190f35b34801561019257600080fd5b5061014b600160a060020a0360043581169060243516604435610340565b3480156101bc57600080fd5b50610174610460565b3480156101d157600080fd5b50610174600160a060020a0360043516610466565b3480156101f257600080fd5b506100b2610478565b34801561020757600080fd5b5061014b600160a060020a03600435166024356104d2565b34801561022b57600080fd5b50610174600160a060020a0360043581169060243516610582565b6000805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156102cc5780601f106102a1576101008083540402835291602001916102cc565b820191906000526020600020905b8154815290600101906020018083116102af57829003601f168201915b505050505081565b336000818152600560209081526040808320600160a060020a038716808552908352818420869055815186815291519394909390927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925928290030190a350600192915050565b60035481565b60008080600160a060020a03851630141561035757fe5b600160a060020a038516151561036957fe5b600160a060020a038616600090815260056020908152604080832033845290915290205491508382101561039957fe5b60001982146103cb57600160a060020a0386166000908152600560209081526040808320338452909152902084830390555b50600160a060020a038516600090815260046020526040902054838110156103ef57fe5b600160a060020a0380871660008181526004602090815260408083208987039055938916808352918490208054890190558351888152935191937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929081900390910190a350600195945050505050565b60025481565b60046020526000908152604090205481565b60018054604080516020600284861615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156102cc5780601f106102a1576101008083540402835291602001916102cc565b600080600160a060020a0384163014156104e857fe5b600160a060020a03841615156104fa57fe5b50336000908152600460205260409020548281101561051557fe5b3360008181526004602090815260408083208786039055600160a060020a03881680845292819020805488019055805187815290519293927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929181900390910190a35060019392505050565b6005602090815260009283526040808420909152908252902054815600a165627a7a72305820ab6e57e88c40f4f05206cbd2d89b2e8398883fe32b803e46c40c2606769476ef0029ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
  opcodes:
    'PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x40 MLOAD PUSH2 0x7BD CODESIZE SUB DUP1 PUSH2 0x7BD DUP4 CODECOPY DUP2 ADD PUSH1 0x40 SWAP1 DUP2 MSTORE DUP2 MLOAD PUSH1 0x20 DUP1 DUP5 ADD MLOAD SWAP3 DUP5 ADD MLOAD PUSH1 0x60 DUP6 ADD MLOAD PUSH1 0x80 DUP7 ADD MLOAD PUSH1 0xA0 DUP8 ADD MLOAD SWAP5 DUP8 ADD DUP1 MLOAD SWAP1 SWAP8 SWAP7 SWAP1 SWAP7 ADD SWAP6 SWAP3 SWAP5 SWAP2 SWAP4 SWAP1 SWAP3 PUSH1 0x0 SWAP2 PUSH2 0x64 SWAP2 DUP4 SWAP2 DUP11 ADD SWAP1 PUSH2 0x128 JUMP JUMPDEST POP DUP6 MLOAD PUSH2 0x78 SWAP1 PUSH1 0x1 SWAP1 PUSH1 0x20 DUP10 ADD SWAP1 PUSH2 0x128 JUMP JUMPDEST POP PUSH1 0x2 DUP6 SWAP1 SSTORE PUSH1 0xA DUP6 SWAP1 EXP DUP5 MUL PUSH1 0x3 DUP2 SWAP1 SSTORE DUP3 SWAP1 DUP2 ISZERO ISZERO PUSH2 0x95 JUMPI INVALID JUMPDEST PUSH1 0x3 SLOAD CALLER PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x4 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 DUP1 DUP4 KECCAK256 SWAP7 SWAP1 SWAP6 DIV SWAP4 DUP5 SWAP1 SUB SWAP6 DUP7 SWAP1 SSTORE DUP5 MLOAD SWAP6 DUP7 MSTORE SWAP4 MLOAD SWAP3 SWAP6 POP SWAP1 SWAP4 SWAP1 SWAP3 PUSH1 0x0 DUP1 MLOAD PUSH1 0x20 PUSH2 0x79D DUP4 CODECOPY DUP2 MLOAD SWAP2 MSTORE SWAP3 SWAP2 DUP3 SWAP1 SUB ADD SWAP1 LOG3 PUSH1 0x1 PUSH1 0xA0 PUSH1 0x2 EXP SUB DUP4 AND PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x4 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 DUP1 DUP4 KECCAK256 DUP1 SLOAD DUP7 ADD SWAP1 SSTORE DUP1 MLOAD DUP6 DUP2 MSTORE SWAP1 MLOAD PUSH1 0x0 DUP1 MLOAD PUSH1 0x20 PUSH2 0x79D DUP4 CODECOPY DUP2 MLOAD SWAP2 MSTORE SWAP3 SWAP2 DUP2 SWAP1 SUB SWAP1 SWAP2 ADD SWAP1 LOG3 POP POP POP POP POP POP POP PUSH2 0x1C3 JUMP JUMPDEST DUP3 DUP1 SLOAD PUSH1 0x1 DUP2 PUSH1 0x1 AND ISZERO PUSH2 0x100 MUL SUB AND PUSH1 0x2 SWAP1 DIV SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 PUSH1 0x1F ADD PUSH1 0x20 SWAP1 DIV DUP2 ADD SWAP3 DUP3 PUSH1 0x1F LT PUSH2 0x169 JUMPI DUP1 MLOAD PUSH1 0xFF NOT AND DUP4 DUP1 ADD OR DUP6 SSTORE PUSH2 0x196 JUMP JUMPDEST DUP3 DUP1 ADD PUSH1 0x1 ADD DUP6 SSTORE DUP3 ISZERO PUSH2 0x196 JUMPI SWAP2 DUP3 ADD JUMPDEST DUP3 DUP2 GT ISZERO PUSH2 0x196 JUMPI DUP3 MLOAD DUP3 SSTORE SWAP2 PUSH1 0x20 ADD SWAP2 SWAP1 PUSH1 0x1 ADD SWAP1 PUSH2 0x17B JUMP JUMPDEST POP PUSH2 0x1A2 SWAP3 SWAP2 POP PUSH2 0x1A6 JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST PUSH2 0x1C0 SWAP2 SWAP1 JUMPDEST DUP1 DUP3 GT ISZERO PUSH2 0x1A2 JUMPI PUSH1 0x0 DUP2 SSTORE PUSH1 0x1 ADD PUSH2 0x1AC JUMP JUMPDEST SWAP1 JUMP JUMPDEST PUSH2 0x5CB DUP1 PUSH2 0x1D2 PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN STOP PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT PUSH2 0x98 JUMPI PUSH4 0xFFFFFFFF PUSH29 0x100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 CALLDATALOAD DIV AND PUSH4 0x6FDDE03 DUP2 EQ PUSH2 0x9D JUMPI DUP1 PUSH4 0x95EA7B3 EQ PUSH2 0x127 JUMPI DUP1 PUSH4 0x18160DDD EQ PUSH2 0x15F JUMPI DUP1 PUSH4 0x23B872DD EQ PUSH2 0x186 JUMPI DUP1 PUSH4 0x313CE567 EQ PUSH2 0x1B0 JUMPI DUP1 PUSH4 0x70A08231 EQ PUSH2 0x1C5 JUMPI DUP1 PUSH4 0x95D89B41 EQ PUSH2 0x1E6 JUMPI DUP1 PUSH4 0xA9059CBB EQ PUSH2 0x1FB JUMPI DUP1 PUSH4 0xDD62ED3E EQ PUSH2 0x21F JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0xA9 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0xB2 PUSH2 0x246 JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD PUSH1 0x20 DUP1 DUP3 MSTORE DUP4 MLOAD DUP2 DUP4 ADD MSTORE DUP4 MLOAD SWAP2 SWAP3 DUP4 SWAP3 SWAP1 DUP4 ADD SWAP2 DUP6 ADD SWAP1 DUP1 DUP4 DUP4 PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0xEC JUMPI DUP2 DUP2 ADD MLOAD DUP4 DUP3 ADD MSTORE PUSH1 0x20 ADD PUSH2 0xD4 JUMP JUMPDEST POP POP POP POP SWAP1 POP SWAP1 DUP2 ADD SWAP1 PUSH1 0x1F AND DUP1 ISZERO PUSH2 0x119 JUMPI DUP1 DUP3 SUB DUP1 MLOAD PUSH1 0x1 DUP4 PUSH1 0x20 SUB PUSH2 0x100 EXP SUB NOT AND DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP JUMPDEST POP SWAP3 POP POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x133 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x14B PUSH1 0x1 PUSH1 0xA0 PUSH1 0x2 EXP SUB PUSH1 0x4 CALLDATALOAD AND PUSH1 0x24 CALLDATALOAD PUSH2 0x2D4 JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD SWAP2 ISZERO ISZERO DUP3 MSTORE MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x20 ADD SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x16B JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x174 PUSH2 0x33A JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD SWAP2 DUP3 MSTORE MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x20 ADD SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x192 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x14B PUSH1 0x1 PUSH1 0xA0 PUSH1 0x2 EXP SUB PUSH1 0x4 CALLDATALOAD DUP2 AND SWAP1 PUSH1 0x24 CALLDATALOAD AND PUSH1 0x44 CALLDATALOAD PUSH2 0x340 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1BC JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x174 PUSH2 0x460 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1D1 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x174 PUSH1 0x1 PUSH1 0xA0 PUSH1 0x2 EXP SUB PUSH1 0x4 CALLDATALOAD AND PUSH2 0x466 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1F2 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0xB2 PUSH2 0x478 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x207 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x14B PUSH1 0x1 PUSH1 0xA0 PUSH1 0x2 EXP SUB PUSH1 0x4 CALLDATALOAD AND PUSH1 0x24 CALLDATALOAD PUSH2 0x4D2 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x22B JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x174 PUSH1 0x1 PUSH1 0xA0 PUSH1 0x2 EXP SUB PUSH1 0x4 CALLDATALOAD DUP2 AND SWAP1 PUSH1 0x24 CALLDATALOAD AND PUSH2 0x582 JUMP JUMPDEST PUSH1 0x0 DUP1 SLOAD PUSH1 0x40 DUP1 MLOAD PUSH1 0x20 PUSH1 0x2 PUSH1 0x1 DUP6 AND ISZERO PUSH2 0x100 MUL PUSH1 0x0 NOT ADD SWAP1 SWAP5 AND SWAP4 SWAP1 SWAP4 DIV PUSH1 0x1F DUP2 ADD DUP5 SWAP1 DIV DUP5 MUL DUP3 ADD DUP5 ADD SWAP1 SWAP3 MSTORE DUP2 DUP2 MSTORE SWAP3 SWAP2 DUP4 ADD DUP3 DUP3 DUP1 ISZERO PUSH2 0x2CC JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x2A1 JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x2CC JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x2AF JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP DUP2 JUMP JUMPDEST CALLER PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x5 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 DUP1 DUP4 KECCAK256 PUSH1 0x1 PUSH1 0xA0 PUSH1 0x2 EXP SUB DUP8 AND DUP1 DUP6 MSTORE SWAP1 DUP4 MSTORE DUP2 DUP5 KECCAK256 DUP7 SWAP1 SSTORE DUP2 MLOAD DUP7 DUP2 MSTORE SWAP2 MLOAD SWAP4 SWAP5 SWAP1 SWAP4 SWAP1 SWAP3 PUSH32 0x8C5BE1E5EBEC7D5BD14F71427D1E84F3DD0314C0F7B2291E5B200AC8C7C3B925 SWAP3 DUP3 SWAP1 SUB ADD SWAP1 LOG3 POP PUSH1 0x1 SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x3 SLOAD DUP2 JUMP JUMPDEST PUSH1 0x0 DUP1 DUP1 PUSH1 0x1 PUSH1 0xA0 PUSH1 0x2 EXP SUB DUP6 AND ADDRESS EQ ISZERO PUSH2 0x357 JUMPI INVALID JUMPDEST PUSH1 0x1 PUSH1 0xA0 PUSH1 0x2 EXP SUB DUP6 AND ISZERO ISZERO PUSH2 0x369 JUMPI INVALID JUMPDEST PUSH1 0x1 PUSH1 0xA0 PUSH1 0x2 EXP SUB DUP7 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x5 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 DUP1 DUP4 KECCAK256 CALLER DUP5 MSTORE SWAP1 SWAP2 MSTORE SWAP1 KECCAK256 SLOAD SWAP2 POP DUP4 DUP3 LT ISZERO PUSH2 0x399 JUMPI INVALID JUMPDEST PUSH1 0x0 NOT DUP3 EQ PUSH2 0x3CB JUMPI PUSH1 0x1 PUSH1 0xA0 PUSH1 0x2 EXP SUB DUP7 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x5 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 DUP1 DUP4 KECCAK256 CALLER DUP5 MSTORE SWAP1 SWAP2 MSTORE SWAP1 KECCAK256 DUP5 DUP4 SUB SWAP1 SSTORE JUMPDEST POP PUSH1 0x1 PUSH1 0xA0 PUSH1 0x2 EXP SUB DUP6 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x4 PUSH1 0x20 MSTORE PUSH1 0x40 SWAP1 KECCAK256 SLOAD DUP4 DUP2 LT ISZERO PUSH2 0x3EF JUMPI INVALID JUMPDEST PUSH1 0x1 PUSH1 0xA0 PUSH1 0x2 EXP SUB DUP1 DUP8 AND PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x4 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 DUP1 DUP4 KECCAK256 DUP10 DUP8 SUB SWAP1 SSTORE SWAP4 DUP10 AND DUP1 DUP4 MSTORE SWAP2 DUP5 SWAP1 KECCAK256 DUP1 SLOAD DUP10 ADD SWAP1 SSTORE DUP4 MLOAD DUP9 DUP2 MSTORE SWAP4 MLOAD SWAP2 SWAP4 PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF SWAP3 SWAP1 DUP2 SWAP1 SUB SWAP1 SWAP2 ADD SWAP1 LOG3 POP PUSH1 0x1 SWAP6 SWAP5 POP POP POP POP POP JUMP JUMPDEST PUSH1 0x2 SLOAD DUP2 JUMP JUMPDEST PUSH1 0x4 PUSH1 0x20 MSTORE PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x40 SWAP1 KECCAK256 SLOAD DUP2 JUMP JUMPDEST PUSH1 0x1 DUP1 SLOAD PUSH1 0x40 DUP1 MLOAD PUSH1 0x20 PUSH1 0x2 DUP5 DUP7 AND ISZERO PUSH2 0x100 MUL PUSH1 0x0 NOT ADD SWAP1 SWAP5 AND SWAP4 SWAP1 SWAP4 DIV PUSH1 0x1F DUP2 ADD DUP5 SWAP1 DIV DUP5 MUL DUP3 ADD DUP5 ADD SWAP1 SWAP3 MSTORE DUP2 DUP2 MSTORE SWAP3 SWAP2 DUP4 ADD DUP3 DUP3 DUP1 ISZERO PUSH2 0x2CC JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x2A1 JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x2CC JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x1 PUSH1 0xA0 PUSH1 0x2 EXP SUB DUP5 AND ADDRESS EQ ISZERO PUSH2 0x4E8 JUMPI INVALID JUMPDEST PUSH1 0x1 PUSH1 0xA0 PUSH1 0x2 EXP SUB DUP5 AND ISZERO ISZERO PUSH2 0x4FA JUMPI INVALID JUMPDEST POP CALLER PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x4 PUSH1 0x20 MSTORE PUSH1 0x40 SWAP1 KECCAK256 SLOAD DUP3 DUP2 LT ISZERO PUSH2 0x515 JUMPI INVALID JUMPDEST CALLER PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x4 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 DUP1 DUP4 KECCAK256 DUP8 DUP7 SUB SWAP1 SSTORE PUSH1 0x1 PUSH1 0xA0 PUSH1 0x2 EXP SUB DUP9 AND DUP1 DUP5 MSTORE SWAP3 DUP2 SWAP1 KECCAK256 DUP1 SLOAD DUP9 ADD SWAP1 SSTORE DUP1 MLOAD DUP8 DUP2 MSTORE SWAP1 MLOAD SWAP3 SWAP4 SWAP3 PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF SWAP3 SWAP2 DUP2 SWAP1 SUB SWAP1 SWAP2 ADD SWAP1 LOG3 POP PUSH1 0x1 SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x5 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x0 SWAP3 DUP4 MSTORE PUSH1 0x40 DUP1 DUP5 KECCAK256 SWAP1 SWAP2 MSTORE SWAP1 DUP3 MSTORE SWAP1 KECCAK256 SLOAD DUP2 JUMP STOP LOG1 PUSH6 0x627A7A723058 KECCAK256 0xab PUSH15 0x57E88C40F4F05206CBD2D89B2E8398 DUP9 0x3f 0xe3 0x2b DUP1 RETURNDATACOPY 0x46 0xc4 0xc 0x26 MOD PUSH23 0x9476EF0029DDF252AD1BE2C89B69C2B068FC378DAA952B 0xa7 CALL PUSH4 0xC4A11628 0xf5 GAS 0x4d 0xf5 0x23 0xb3 0xef ',
  sourceMap:
    '26:2301:0:-;;;535:549;8:9:-1;5:2;;;30:1;27;20:12;5:2;535:549:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;666:12;;535:549;;;;;;;;;;;;;796:16;;666:12;;796:16;;666:12;;;;:::i;:::-;-1:-1:-1;688:16:0;;;;:6;;:16;;;;;:::i;:::-;-1:-1:-1;714:8:0;:20;;;773:2;:13;;;758:28;;744:11;:42;;;828:10;;816:22;;;;;;;873:11;;859:10;849:21;;;;:9;:21;;;;;;;;816:22;;;;873:23;;;;849:47;;;;911:46;;;;;;;816:22;;-1:-1:-1;859:10:0;;849:21;;-1:-1:-1;;;;;;;;;;;911:46:0;;;;;;;;-1:-1:-1;;;;;991:21:0;;;;;;:9;:21;;;;;;;;;;:35;;967:59;;1041:36;;;;;;;-1:-1:-1;;;;;;;;;;;1041:36:0;;;;;;;;;;535:549;;;;;;;26:2301;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;26:2301:0;;;-1:-1:-1;26:2301:0;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;',
};
