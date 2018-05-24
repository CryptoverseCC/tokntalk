export const claimContractAddressesForNetworkId = {
  1: '0xFd74f0ce337fC692B8c124c094c1386A14ec7901',
  3: '0x6f32a6F579CFEed1FFfDc562231C957ECC894001',
  4: '0xC5De286677AC4f371dc791022218b1c13B72DbBd',
  42: '0x139d658eD55b78e783DbE9bD4eb8F2b977b24153'
};

export const claimWithValueTransferContractAddressesForNetworkId = {
  1: '0x70B610F7072E742d4278eC55C02426Dbaaee388C',
  3: '0x37C1CA7996CDdAaa31e13AA3eEE0C89Ee4f665B5',
  4: '0x00034B8397d9400117b4298548EAa59267953F8c',
  42: '0xc666c75C2bBA9AD8Df402138cE32265ac0EC7aaC'
};

export const networkNameForNetworkId = {
  1: 'ethereum',
  3: 'ropsten',
  4: 'rinkeby',
  42: 'kovan'
};

export const claimContractAbi = [
  {
    constant: false,
    inputs: [{ name: 'data', type: 'string' }],
    name: 'post',
    outputs: [],
    payable: false,
    type: 'function'
  }
];

export const claimWithValueTransferContractAbi = [
  {
    constant: false,
    inputs: [
      {
        name: 'userfeed',
        type: 'address'
      },
      {
        name: 'data',
        type: 'string'
      }
    ],
    name: 'post',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function'
  }
];
