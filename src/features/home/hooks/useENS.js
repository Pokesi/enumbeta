//import { getDefaultProvider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { ABI, ADDRESS } from './FNSAbi.js';

export function useENS(address) {
  const [ensName, setENSName] = useState();
  const provider = new ethers.providers.JsonRpcProvider('https://rpc.ftm.tools/');

  useEffect(() => {
    async function resolveENS() {
      const fnsContract = new ethers.Contract(ADDRESS, ABI, provider);
      if (address) {
        const name = await fnsContract.functions.getNameFromOwner(address);
        if (name) setENSName(name);
      }
    }
    resolveENS();
  }, [address]);

  return { ensName };
}
