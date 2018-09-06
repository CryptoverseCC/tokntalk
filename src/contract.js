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
    constant: false,
    inputs: [{ name: '_spender', type: 'address' }, { name: '_value', type: 'uint256' }],
    name: 'approve',
    outputs: [{ name: 'success', type: 'bool' }],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }, { name: '_spender', type: 'address' }],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    type: 'function',
  },
  {
    constant: false,
    name: 'transfer',
    inputs: [{ name: '_to', type: 'address' }, { name: '_value', type: 'uint256' }],
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    type: 'function',
    stateMutability: 'nonpayable',
  },
];
