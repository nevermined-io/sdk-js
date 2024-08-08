import { parseAbi } from 'viem'

export function getRegisterAssetPermissions(contractAddress: `0x${string}`) {
  return [
    {
      target: contractAddress,
      abi: parseAbi([
        'function registerMintableDID(bytes32 _didSeed, address _nftContractAddress, bytes32 _checksum, address[] memory _providers, string memory _url, uint256 _cap, uint256 _royalties, bool _mint, bytes32 _activityId, string memory _nftMetadata, string memory _immutableUrl) public',
      ]),
      functionName: 'registerMintableDID',
    },
    {
      target: contractAddress,
      abi: parseAbi([
        'function registerMintableDID(bytes32 _didSeed,address _nftContractAddress,bytes32 _checksum,address[] memory _providers,string memory _url,uint256 _cap,uint256 _royalties,bytes32 _activityId,string memory _nftMetadata,string memory _immutableUrl) public',
      ]),
      functionName: 'registerMintableDID',
    },
  ]
}

export function getOrderPermissions(contractAddress: `0x${string}`) {
  return [
    {
      target: contractAddress,
      abi: parseAbi([
        'function createAgreementAndPayEscrow(bytes32 _id, bytes32 _did, bytes32[] _conditionIds, uint256[] _timeLocks, uint256[] _timeOuts, address _accessConsumer, uint256 _idx, address _rewardAddress, address _tokenAddress, uint256[] _amounts, address[] _receivers) public',
      ]),
      functionName: 'createAgreementAndPayEscrow',
    },
  ]
}

export function getERC20ApprovePermissions(contractAddress: `0x${string}`) {
  return [
    {
      target: contractAddress,
      abi: parseAbi(['function approve(address spender, uint256 amount) external returns (bool)']),
      functionName: 'approve',
    },
  ]
}

export function getERC20TransferPermissions(contractAddress: `0x${string}`) {
  return [
    {
      target: contractAddress,
      abi: parseAbi(['function transfer(address to, uint amount) returns (bool)']),
      functionName: 'transfer',
    },
  ]
}

export function getBurnNFTPermissions(nftContractAddress: `0x${string}`) {
  return [
    {
      target: nftContractAddress,
      abi: parseAbi(['function burn(address _1, uint256 _2, uint256 _3) public']),
      functionName: 'burn',
    },
  ]
}

export function getMintNFTPermissions(nftContractAddress: `0x${string}`) {
  return [
    {
      target: nftContractAddress,
      abi: parseAbi(['function mint(address _1, uint256 _2, uint256 amount_3, bytes memory _4)']),
      functionName: 'mint',
    },
  ]
}

export function getFullZeroDevPermissions(
  didRegistryAddress: `0x${string}`,
  salesTemplateAddress: `0x${string}`,
  erc20Address: `0x${string}`,
  nft1155CreditsAddress: `0x${string}`,
  nft1155TimeAddress: `0x${string}`,
) {
  return [
    ...getRegisterAssetPermissions(didRegistryAddress),
    ...getOrderPermissions(salesTemplateAddress),
    ...getERC20ApprovePermissions(erc20Address),
    ...getMintNFTPermissions(nft1155CreditsAddress),
    ...getBurnNFTPermissions(nft1155CreditsAddress),
    ...getMintNFTPermissions(nft1155TimeAddress),
    ...getBurnNFTPermissions(nft1155TimeAddress),
  ]
}
