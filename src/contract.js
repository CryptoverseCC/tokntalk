export const claimContractAddressesForNetworkId = {
  1: '0xFd74f0ce337fC692B8c124c094c1386A14ec7901',
  3: '0x6f32a6F579CFEed1FFfDc562231C957ECC894001',
  4: '0xC5De286677AC4f371dc791022218b1c13B72DbBd',
  42: '0x139d658eD55b78e783DbE9bD4eb8F2b977b24153',
};

export const claimWithValueTransferContractAddressesForNetworkId = {
  1: '0xfad31a5672fBd8243E9691E8a5F958699CD0AaA9',
  3: '0x298611B2798d280910274C222A9dbDfBA914B058',
  4: '0x1f8A01833A0B083CCcd87fffEe50EF1D35621fD2',
  42: '0x0c20Daa719Cd4fD73eAf23d2Cb687cD07d500E17',
};

export const networkNameForNetworkId = {
  1: 'ethereum',
  3: 'ropsten',
  4: 'rinkeby',
  42: 'kovan',
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
