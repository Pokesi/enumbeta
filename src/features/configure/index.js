import { addressBook } from 'blockchain-addressbook';

var {
  polygon: polygonAddressBook,
  heco: hecoAddressBook,
  celo: celoAddressBook,
  avax: avaxAddressBook,
  bsc: bscAddressBook,
  fantom: fantomAddressBook,
  one: harmonyAddressBook,
  arbitrum: arbitrumAddressBook,
  moonriver: moonriverAddressBook,
  cronos: cronosAddressBook,
  aurora: auroraAddressBook,
  fuse: fuseAddressBook,
  metis: metisAddressBook,
  moonbeam: moonbeamAddressBook,
} = addressBook;

fantomAddressBook["tokens"] = {...fantomAddressBook["tokens"], DMD: { address: "0x90E892FED501ae00596448aECF998C88816e5C0F", chainId: 250, deciamls: 18, description: "Dark Matter DeFi (DMD) was created with the vision to bring NFT staking with a storyline to the world of DeFi farming.", logoUri: "https://www.darkmatterdefi.com/images/tokens/0x90e892fed501ae00596448aecf998c88816e5c0f.svg", name: "DarkMatter Defi", website: "https://www.darkmatterdefi.com/" } };

export {
  bscAddressBook,
  hecoAddressBook,
  celoAddressBook,
  avaxAddressBook,
  polygonAddressBook,
  fantomAddressBook,
  harmonyAddressBook,
  arbitrumAddressBook,
  moonriverAddressBook,
  cronosAddressBook,
  auroraAddressBook,
  fuseAddressBook,
  metisAddressBook,
  moonbeamAddressBook,
};

console.log(fantomAddressBook);

export {
  vaultABI,
  bnbVaultABI,
  erc20ABI,
  strategyABI,
  multicallABI,
  govPoolABI,
  beefyUniV2ZapABI,
  uniswapV2PairABI,
  uniswapV2RouterABI,
  launchPoolABI,
} from './abi';
export { bscStakePools } from './stake/bsc_stake';
export { hecoStakePools } from './stake/heco_stake';
export { avalancheStakePools } from './stake/avalanche_stake';
export { celoStakePools } from './stake/celo_stake';
export { moonriverStakePools } from './stake/moonriver_stake';
export { polygonStakePools } from './stake/polygon_stake';
export { fantomStakePools } from './stake/fantom_stake';
export { harmonyStakePools } from './stake/harmony_stake';
export { arbitrumStakePools } from './stake/arbitrum_stake';
export { cronosStakePools } from './stake/cronos_stake';
export { auroraStakePools } from './stake/aurora_stake';
export { fuseStakePools } from './stake/fuse_stake';
export { metisStakePools } from './stake/metis_stake';
export { moonbeamStakePools } from './stake/moonbeam_stake';
export { bscPools } from './vault/bsc_pools';
export { hecoPools } from './vault/heco_pools';
export { avalanchePools } from './vault/avalanche_pools';
export { celoPools } from './vault/celo_pools';
export { moonriverPools } from './vault/moonriver_pools';
export { polygonPools } from './vault/polygon_pools';
export { fantomPools } from './vault/fantom_pools';
export { harmonyPools } from './vault/harmony_pools';
export { arbitrumPools } from './vault/arbitrum_pools';
export { cronosPools } from './vault/cronos_pools';
export { auroraPools } from './vault/aurora_pools';
export { fusePools } from './vault/fuse_pools';
export { metisPools } from './vault/metis_pools';
export { moonbeamPools } from './vault/moonbeam_pools';
export { bscZaps } from './zap/bsc_zaps';
export { hecoZaps } from './zap/heco_zaps';
export { avalancheZaps } from './zap/avalanche_zaps';
export { celoZaps } from './zap/celo_zaps';
export { moonriverZaps } from './zap/moonriver_zaps';
export { polygonZaps } from './zap/polygon_zaps';
export { fantomZaps } from './zap/fantom_zaps';
export { harmonyZaps } from './zap/harmony_zaps';
export { arbitrumZaps } from './zap/arbitrum_zaps';
export { cronosZaps } from './zap/cronos_zaps';
export { auroraZaps } from './zap/aurora_zaps';
export { fuseZaps } from './zap/fuse_zaps';
export { metisZaps } from './zap/metis_zaps';
export { moonbeamZaps } from './zap/moonbeam_zaps';
export { nativeCoins } from './native_coins';
