/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useMemo, useEffect } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import Grid from '@material-ui/core/Grid';
import BigNumber from 'bignumber.js';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';

import Button from 'components/CustomButtons/Button.js';
import CustomOutlinedInput from 'components/CustomOutlinedInput/CustomOutlinedInput';
import CustomSlider from 'components/CustomSlider/CustomSlider';
import RefundButtons from '../RefundButtons/RefundButtons';
import {
  byDecimals,
  //convertAmountToRawNumber,
  //convertAmountFromRawNumber,
} from 'features/helpers/bignumber';
import { shouldHideFromHarvest } from 'features/helpers/utils';
import { useFetchUpdate, useFetchBalances, useFetchZapEstimate } from 'features/vault/redux/hooks';
import { useConnectWallet } from 'features/home/redux/hooks';
import { getNetworkCoin } from 'features/helpers/getNetworkData';
import styles from './styles';

const useStyles = makeStyles(styles);
const nativeCoin = getNetworkCoin();

const UpdateSection = ({ pool, index, sharesBalance }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { web3, address } = useConnectWallet();
  const { enqueueSnackbar } = useSnackbar();
  const { fetchUpdate, fetchUpdatePending } = useFetchUpdate();
  const {
    //  fetchZapWithdrawEstimate,
    fetchZapEstimatePending,
  } = useFetchZapEstimate();
  const { tokens, fetchBalances, fetchPairReverves } = useFetchBalances();

  const sharesDecimals = pool.tokenDecimals;
  const sharesByDecimals = byDecimals(sharesBalance, sharesDecimals);
  const underliyngBalance = sharesByDecimals
    .multipliedBy(pool.pricePerFullShare)
    .decimalPlaces(pool.tokenDecimals, BigNumber.ROUND_DOWN);

  const withdrawOutputs = useMemo(() => {
    const outputs = [
      {
        name: pool.name,
        symbol: pool.token,
        address: pool.tokenAddress,
        decimals: pool.tokenDecimals,
      },
    ];

    if (pool.zap) {
      const pairTokens = pool.zap.tokens.filter(t => t.symbol !== nativeCoin.wrappedSymbol);
      if (pairTokens.length) {
        outputs.push(
          {
            symbol: pool.assets.join('+'),
          },
          ...pairTokens
        );
      }
    }

    return outputs;
  }, [pool.assets, pool.name, pool.token, pool.tokenAddress, pool.tokenDecimals, pool.zap]);

  const [withdrawSettings, setWithdrawSettings] = useState({
    isZap: false,
    isSwap: false,
    swapInput: undefined,
    swapOutput: undefined,
    outputIndex: 0,
    amount: new BigNumber(0),
    slider: 0,
    input: '0.0',
    vaultAddress: pool.earnContractAddress,
    withdrawAddress: pool.earnContractAddress,
    isNeedApproval: false,
    slippageTolerance: 0.01,
    swapAmountOut: pool.zapWithdrawEstimate?.swapAmountOut,
  });

  useDeepCompareEffect(() => {
    if (fetchUpdatePending[index]) return;
    if (fetchZapEstimatePending[pool.tokenAddress]) return;
    if (pool.zap) {
      fetchPairReverves({ web3, pairToken: tokens[pool.token] });
    }
  }, [pool, new Date().getMinutes()]);

  {
    /*useDeepCompareEffect(() => {
    if (fetchUpdatePending[index]) return;
    if (fetchZapEstimatePending[pool.tokenAddress]) return;
    if (pool.zap && withdrawSettings.isSwap) {
      fetchZapWithdrawEstimate({
        web3,
        vaultAddress: pool.earnContractAddress,
        routerAddress: pool.zap.ammRouter,
        swapInput: withdrawSettings.swapInput,
        swapOutput: withdrawSettings.swapOutput,
        pairToken: tokens[pool.token],
        pairTokenAmount: convertAmountToRawNumber(
          withdrawSettings.amount,
          tokens[pool.token].decimals
        ),
      });
    }
  }, [tokens[pool.token].reserves, withdrawSettings.amount, withdrawSettings.outputIndex]);*/
  }

  const handleOutputChange = event => {
    const outputIndex = event.target.value;
    const isZap = outputIndex > 0;
    const isSwap = outputIndex > 1;
    const spender = isZap ? pool.zap.zapAddress : pool.earnContractAddress;
    const swapInput = isSwap ? withdrawOutputs[outputIndex === 2 ? 3 : 2] : undefined;
    const swapOutput = isSwap ? withdrawOutputs[outputIndex] : undefined;
    const allowance = new BigNumber(tokens[pool.earnedToken].allowance[spender]);

    setWithdrawSettings(prevState => ({
      ...prevState,
      outputIndex,
      isZap,
      isSwap,
      swapInput,
      swapOutput,
      withdrawAddress: spender,
      isNeedApproval: isZap && allowance.isZero(),
    }));
  };

  const handleSliderChange = (_, sliderInt) => {
    setWithdrawSettings(prevState => ({
      ...prevState,
      slider: sliderInt,
    }));
  };

  const handleSliderChangeCommitted = (_, sliderInt) => {
    let amount = new BigNumber(0);
    let input = new BigNumber(0);
    if (sliderInt > 0 && sliderInt < 99) {
      amount = underliyngBalance
        .times(sliderInt)
        .div(100)
        .decimalPlaces(pool.tokenDecimals, BigNumber.ROUND_DOWN);
      input = amount.decimalPlaces(8, BigNumber.ROUND_DOWN).toFormat();
    }
    if (sliderInt >= 99) {
      amount = underliyngBalance;
      sliderInt = 100;
      input = amount.toFormat();
    }

    setWithdrawSettings(prevState => ({
      ...prevState,
      amount: amount,
      slider: sliderInt,
      input: input,
    }));
  };

  const handleMax = _ => {
    handleSliderChangeCommitted(_, 100);
  };

  const handleInputAmountChange = event => {
    const input = event.target.value.replace(/[,]+/, '').replace(/[^0-9.]+/, '');
    let amount = new BigNumber(input);

    if (amount.isNaN()) amount = new BigNumber(0);
    if (amount.isGreaterThan(underliyngBalance)) amount = underliyngBalance;

    const sliderInt = underliyngBalance.isZero()
      ? 0
      : amount.times(100).dividedToIntegerBy(underliyngBalance).toNumber();

    setWithdrawSettings(prevState => ({
      ...prevState,
      amount: amount,
      slider: sliderInt,
      input: amount.isEqualTo(input) ? input : amount.toFormat(),
    }));
  };

  useEffect(() => {
    const allowance = new BigNumber(
      tokens[pool.earnedToken].allowance[withdrawSettings.withdrawAddress]
    );
    setWithdrawSettings(prevState => ({
      ...prevState,
      isNeedApproval: prevState.isZap && allowance.isZero(),
    }));
  }, [pool.earnedToken, tokens, withdrawSettings.withdrawAddress]);

  const handleUpdate = () => {
    update();
  };

  const update = () => {
    //web3, contract, address, dispatch
    const vaultWithdrawArgs = {
      web3,
      contractAddress: pool.earnContractAddress,
      address,
      index,
    };
    fetchUpdate(vaultWithdrawArgs)
      .then(() => {
        enqueueSnackbar(t('Vault-UpdateSuccess'), { variant: 'success' });
        fetchBalances({ address, web3, tokens });
      })
      .catch(error => enqueueSnackbar(t('Vault-UpdateError', { error }), { variant: 'error' }));
  };

  const withrawalNoticeKey = `Vault-Withdrawal-Platform-Notice-${pool.platform}`;
  //const withdrawalNotice = !sharesBalance.isZero() && i18n.exists(withrawalNoticeKey);

  return (
    <Grid
      item
      xs={12}
      md={shouldHideFromHarvest(pool.name) ? 6 : 5}
      className={classes.sliderDetailContainer}
    >
      <div className={classes.showDetailLeft}>
        {t('Vault-Update')}:{' '}
        <a onClick={handleMax} className={classes.balanceMax}>
          {byDecimals(
            sharesBalance.multipliedBy(new BigNumber(pool.pricePerFullShare)),
            pool.tokenDecimals
          ).toFormat(8)}{' '}
          {pool.token}
        </a>
      </div>
      <FormControl fullWidth variant="outlined">
        <CustomOutlinedInput
          fullWidth
          value={withdrawSettings.input}
          onChange={handleInputAmountChange}
          endAdornment={
            pool.zap && (
              <FormControl className={classes.zapFormControl}>
                <Select
                  variant="standard"
                  className={classes.zapSelect}
                  value={withdrawSettings.outputIndex}
                  onChange={handleOutputChange}
                >
                  {withdrawOutputs.map((output, i) => (
                    <MenuItem key={i} value={i}>
                      {output.symbol}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )
          }
        />
      </FormControl>
      <CustomSlider
        aria-labelledby="continuous-slider"
        value={withdrawSettings.slider}
        onChange={handleSliderChange}
        onChangeCommitted={handleSliderChangeCommitted}
      />
      <div className={classes.showDetailButtonCon}>
        {pool.refund === true ? (
          <RefundButtons
            tokenAddress={pool.earnedTokenAddress}
            refundAddress={pool.refundContractAddress}
            index={index}
          />
        ) : (
          <div>
            <div className={classes.showDetailButtonCon}>
              <Button
                className={`${classes.showDetailButton} ${classes.showDetailButtonOutlined}`}
                type="button"
                color="primary"
                disabled={false}
                onClick={handleUpdate}
              >
                {fetchUpdatePending[index]
                  ? `${t('Vault-Updating')}`
                  : `${t('Vault-UpdateButton')}`}
              </Button>
            </div>
            )}
            {/* Display a platform-specific withdrawal notice */}
            {/* NOTE: Temporary hack until better solution is found */}
            {false ? (
              <div className={classes.withdrawalNoticeContainer}>
                <div className={classes.withdrawalNotice}>{t(withrawalNoticeKey)}</div>
              </div>
            ) : (
              ''
            )}
            <div className={classes.zapNote}>
              <span>{t('Vault-UpdateInfo')}&nbsp;</span>
              {fetchZapEstimatePending[pool.tokenAddress] && <CircularProgress size={12} />}
              <ol>
                <li>
                  {t('Vault-UpdateMoreInfo', {
                    poolToken: pool.token,
                  })}
                </li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </Grid>
  );
};

export default UpdateSection;
