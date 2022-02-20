import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  VAULT_FETCH_WITHDRAW_BEGIN,
  VAULT_FETCH_WITHDRAW_SUCCESS,
  VAULT_FETCH_WITHDRAW_FAILURE,
} from './constants';
import { update } from '../../web3/update';

export function fetchUpdate({ address, web3, isAll, amount, contractAddress, index }) {
  return dispatch => {
    dispatch({
      type: VAULT_FETCH_WITHDRAW_BEGIN,
      index,
    });

    const promise = new Promise((resolve, reject) => {
      update({ web3, address, contractAddress, dispatch })
        .then(data => {
          dispatch({
            type: VAULT_FETCH_WITHDRAW_SUCCESS,
            data,
            index,
          });
          resolve(data);
        })
        .catch(error => {
          dispatch({
            type: VAULT_FETCH_WITHDRAW_FAILURE,
            index,
          });
          reject(error.message || error);
        });
    });
    return promise;
  };
}

export function useFetchUpdate() {
  const dispatch = useDispatch();

  const { fetchUpdatePending } = useSelector(state => ({
    fetchUpdatePending: state.vault.fetchUpdatePending,
  }));

  const boundUpdate = useCallback(data => dispatch(fetchUpdate(data)), [dispatch]);

  return {
    fetchUpdate: boundUpdate,
    fetchUpdatePending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_WITHDRAW_BEGIN:
      return {
        ...state,
        fetchUpdatePending: {
          ...state.fetchUpdatePending,
          [action.index]: true,
        },
      };

    case VAULT_FETCH_WITHDRAW_SUCCESS:
      return {
        ...state,
        fetchUpdatePending: {
          ...state.fetchUpdatePending,
          [action.index]: false,
        },
      };

    case VAULT_FETCH_WITHDRAW_FAILURE:
      return {
        ...state,
        fetchUpdatePending: {
          ...state.fetchUpdatePending,
          [action.index]: false,
        },
      };

    default:
      return state;
  }
}
