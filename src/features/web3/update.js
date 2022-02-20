import { stratAbi } from './updateABI';
import { enqueueSnackbar } from '../common/redux/actions';

export const update = async ({ web3, address, contractAddress, dispatch }) => {
  const contract = new web3.eth.Contract(stratAbi, contractAddress);
  const data = await _update({ web3, contract, address, dispatch });
  return data;
};

const _update = ({ web3, contract, address, dispatch }) => {
  return new Promise((resolve, reject) => {
    contract.methods
      .harvest()
      .send({ from: address })
      .on('transactionHash', function (hash) {
        console.log(hash);
        dispatch(
          enqueueSnackbar({
            message: hash,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
            },
            hash,
          })
        );
      })
      .on('receipt', function (receipt) {
        console.log(receipt);
        resolve();
      })
      .on('error', function (error) {
        console.log(error);
        reject(error);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};
