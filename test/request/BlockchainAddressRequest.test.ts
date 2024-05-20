import {config} from 'dotenv';
import axios, { Axios, AxiosRequestConfig } from 'axios';

import {CustomHeaderBuilder} from '../../lib/DataBuilder';
import { OCPAPIReturnType } from '../../lib/request/BaseClass';
import {
  TBlockchainTrxByAddressFilter, 
  TBusinessWalletAddress, 
  TResponseBlockchainAddress, 
  TResponseTrackedAddress, 
  TResponseAddressTransaction,
  TResponseAddressTransactions, 
  TResponsePayInAddress,
  TResponsePayInAddresses, 
  TResponseBusinessAddresses, 
  TResponseRecurrentAddresses, 
  TResponsePayOutAddresses,
  TResponseExtendedAddress
} from '../../lib/types/BlockchainAddress';
import BlockchainAddressRequest from '../../lib/request/BlockchainAddressRequest';

const defaultAxiosOptions: AxiosRequestConfig = {
  headers: {
    'Cache-Control': 'no-cache',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  validateStatus: function (status: number): boolean {
    return true;
  }
};

let globalAddress: TResponseTrackedAddress,
globalAddresses: TResponseExtendedAddress[];

describe('BlockchainAddressRequest tests', ():void => {
  config();
  const publicKey: string = process.env.PUBLIC_KEY || '';
  const privateKey: string = process.env.PRIVATE_KEY || '';
  const remoteHost: string = process.env.REMOTE_HOST || '';
  const advancedBalanceId: string = process.env.ADVANCED_BALANCE_ID || '';

  const axiosInstance: Axios = axios.create(<AxiosRequestConfig>{...defaultAxiosOptions, baseURL: remoteHost});
  const headerBuilder:CustomHeaderBuilder = new CustomHeaderBuilder(publicKey, privateKey);
  const req = new BlockchainAddressRequest(axiosInstance, headerBuilder);

  it('BlockchainAddressRequest:constructor', ():void => {
    expect(req).toBeInstanceOf(BlockchainAddressRequest);
    expect(req).toHaveProperty('addTrackingAddress');
    expect(req).toHaveProperty('createBusinessWalletAddress');
    expect(req).toHaveProperty('createPayOutWalletAddress');
    expect(req).toHaveProperty('getAddressTransactions');
    expect(req).toHaveProperty('getListOfBusinessAddresses');
    expect(req).toHaveProperty('getListOfPayInAddresses');
    expect(req).toHaveProperty('getListOfPayOutAddresses');
    expect(req).toHaveProperty('getListOfRecurrentAddresses');
    expect(req).toHaveProperty('searchByAddress');
    expect(req).toHaveProperty('searchById');
    expect(req).toHaveProperty('setMetaData');
  });

  it('BlockchainAddressRequest:addTrackingAddress', async () => {
    const promise = req.addTrackingAddress('0x1111222233334444555566667777888899990000', 'https://kitep.org.kg/?webhook');

    const result: TResponseTrackedAddress = await <Promise<TResponseTrackedAddress>>promise;
    //console.log('BlockchainAddressRequest:addTrackingAddress', result);
    globalAddress = result;
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('webhookUrl');
    expect(result).toHaveProperty('address');
    expect(result).toHaveProperty('networks');
  });

  it('BlockchainAddressRequest:createBusinessWalletAddress:error', async () => {
    try {
      const promise = req.createBusinessWalletAddress(
        <TBusinessWalletAddress>{
          advancedBalanceId, 
          network: '', 
          currency: '', 
          alias: '', 
          comment: ''
      });
  
      const result: TResponseBusinessAddresses|undefined = await <Promise<TResponseBusinessAddresses|undefined>>promise;
      //console.log('BlockchainAddressRequest:createBusinessWalletAddress:error', result);
      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('BlockchainAddressRequest:createBusinessWalletAddress', async () => {
    const promise = req.createBusinessWalletAddress(
      <TBusinessWalletAddress>{
        advancedBalanceId, 
        network: 'bsc', 
        currency: 'USDC', 
        alias: 'MyUSDCWallet', 
        comment: 'MyUSDCWallet'
    });

    const result: TResponseBusinessAddresses|TResponseExtendedAddress = await <Promise<TResponseBusinessAddresses|TResponseExtendedAddress>>promise;
    //console.log('BlockchainAddressRequest:createBusinessWalletAddress', result);
    if (result instanceof Array) {
      let item: TResponseExtendedAddress;
      for (item of result) {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('advancedBalanceId');
        expect(item).toHaveProperty('currency');
        expect(item).toHaveProperty('network');
        expect(item).toHaveProperty('address');
        expect(item).toHaveProperty('tag');
        expect(item).toHaveProperty('balance');
        expect(item).toHaveProperty('alias');
        expect(item).toHaveProperty('comment');
      }
    } else {
      expect(result).toHaveProperty('id');
      //expect(result).toHaveProperty('advancedBalanceId');
      expect(result).toHaveProperty('currency');
      expect(result).toHaveProperty('network');
      expect(result).toHaveProperty('address');
      expect(result).toHaveProperty('tag');
      //expect(result).toHaveProperty('balance');
      expect(result).toHaveProperty('alias');
      expect(result).toHaveProperty('comment');
    }
  });

  it('BlockchainAddressRequest:createPayOutWalletAddress:error', async () => {
    try {
      const promise = req.createPayOutWalletAddress('', '');
  
      const result: TResponsePayOutAddresses|undefined = await <Promise<TResponsePayOutAddresses|undefined>>promise;
      //console.log('BlockchainAddressRequest:createPayOutWalletAddress:error', result);
      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('BlockchainAddressRequest:createPayOutWalletAddress', async () => {
    const promise = req.createPayOutWalletAddress('USDT', 'ethereum');

    const result: TResponsePayOutAddresses = await <Promise<TResponsePayOutAddresses>>promise;
    //console.log('BlockchainAddressRequest:createPayOutWalletAddress', result);
    if (result instanceof Array) {
      let item: TResponseExtendedAddress;
      for (item of result) {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('advancedBalanceId');
        expect(item).toHaveProperty('currency');
        expect(item).toHaveProperty('network');
        expect(item).toHaveProperty('address');
        expect(item).toHaveProperty('tag');
        expect(item).toHaveProperty('balance');
        expect(item).toHaveProperty('alias');
        expect(item).toHaveProperty('comment');
      }
    } else {
      expect(result).toHaveProperty('id');
      //expect(result).toHaveProperty('advancedBalanceId');
      expect(result).toHaveProperty('currency');
      expect(result).toHaveProperty('network');
      expect(result).toHaveProperty('address');
      expect(result).toHaveProperty('tag');
      //expect(result).toHaveProperty('balance');
      //expect(result).toHaveProperty('alias');
      //expect(result).toHaveProperty('comment');
    }
  });

  it('BlockchainAddressRequest:getListOfBusinessAddresses', async () => {
    const promise = req.getListOfBusinessAddresses(advancedBalanceId);

    const result: TResponseBusinessAddresses = await <Promise<TResponseBusinessAddresses>>promise;
    //console.log('BlockchainAddressRequest:getListOfBusinessAddresses', result);
    let item: TResponseExtendedAddress;
    for (item of result) {
      expect(item).toHaveProperty('id');
      //expect(item).toHaveProperty('advancedBalanceId');
      expect(item).toHaveProperty('currency');
      expect(item).toHaveProperty('network');
      expect(item).toHaveProperty('address');
      expect(item).toHaveProperty('tag');
      expect(item).toHaveProperty('balance');
      expect(item).toHaveProperty('alias');
      expect(item).toHaveProperty('comment');
    }
  });

  it('BlockchainAddressRequest:getListOfPayInAddresses', async () => {
    const promise = req.getListOfPayInAddresses(advancedBalanceId);

    const result: TResponsePayInAddresses = await <Promise<TResponsePayInAddresses>>promise;
    globalAddresses = result;
    //console.log('BlockchainAddressRequest:getListOfPayInAddresses', result);
    let item: TResponsePayInAddress;
    for (item of result) {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('advancedBalanceId');
      expect(item).toHaveProperty('currency');
      expect(item).toHaveProperty('network');
      expect(item).toHaveProperty('address');
      expect(item).toHaveProperty('tag');
      expect(item).toHaveProperty('balance');
    }
  });

  it('BlockchainAddressRequest:getListOfPayOutAddresses', async () => {
    const promise = req.getListOfPayOutAddresses(advancedBalanceId);

    const result: TResponsePayOutAddresses = await <Promise<TResponsePayOutAddresses>>promise;
    //console.log('BlockchainAddressRequest:getListOfPayOutAddresses', result);
    let item: TResponseExtendedAddress;
    for (item of result) {
      expect(item).toHaveProperty('id');
      //expect(item).toHaveProperty('advancedBalanceId');
      expect(item).toHaveProperty('currency');
      expect(item).toHaveProperty('network');
      expect(item).toHaveProperty('address');
      expect(item).toHaveProperty('tag');
      expect(item).toHaveProperty('balance');
      //expect(item).toHaveProperty('alias');
      //expect(item).toHaveProperty('comment');
    }
  });

  it('BlockchainAddressRequest:getListOfRecurrentAddresses', async () => {
    const promise = req.getListOfRecurrentAddresses(advancedBalanceId);

    const result: TResponseRecurrentAddresses = await <Promise<TResponseRecurrentAddresses>>promise;
    //console.log('BlockchainAddressRequest:getListOfRecurrentAddresses', result);
    let item: TResponseExtendedAddress;
    for (item of result) {
      expect(item).toHaveProperty('id');
      //expect(item).toHaveProperty('advancedBalanceId');
      expect(item).toHaveProperty('currency');
      expect(item).toHaveProperty('network');
      expect(item).toHaveProperty('address');
      expect(item).toHaveProperty('tag');
      expect(item).toHaveProperty('balance');
      expect(item).toHaveProperty('alias');
      expect(item).toHaveProperty('comment');
    }
  });

  it('BlockchainAddressRequest:searchByAddress', async () => {
    const promise = req.searchByAddress(globalAddresses[0].address);

    const result: TResponseBlockchainAddress[] | null = await <Promise<TResponseBlockchainAddress[] | null>>promise;
    //console.log('BlockchainAddressRequest:searchByAddress', result);
    if (result) {
      let item: TResponseBlockchainAddress;
      for (item of result) {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('type');
        expect(item).toHaveProperty('currency');
        expect(item).toHaveProperty('network');
        expect(item).toHaveProperty('balance');
        expect(item).toHaveProperty('address');
        expect(item).toHaveProperty('isArchived');
        expect(item).toHaveProperty('meta');
        expect(item).toHaveProperty('tag');
        expect(item).toHaveProperty('alias');
        expect(item).toHaveProperty('comment');
      }
    }
  });

  it('BlockchainAddressRequest:searchById', async () => {
    const promise = req.searchById(globalAddresses[0].id);

    const result: TResponseBlockchainAddress | null = await <Promise<TResponseBlockchainAddress | null>>promise;
    //console.log('BlockchainAddressRequest:searchById', result);
    if (result) {
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('type');
      expect(result).toHaveProperty('currency');
      expect(result).toHaveProperty('network');
      expect(result).toHaveProperty('balance');
      expect(result).toHaveProperty('address');
      expect(result).toHaveProperty('isArchived');
      expect(result).toHaveProperty('meta');
      expect(result).toHaveProperty('tag');
      expect(result).toHaveProperty('alias');
      expect(result).toHaveProperty('comment');
    } else {
      expect(result).toBeNull();
    }
  });

  it('BlockchainAddressRequest:getAddressTransactions:error', async () => {
    try {
      const promise = req.getAddressTransactions(<TBlockchainTrxByAddressFilter>{});
  
      const result: TResponseAddressTransactions|undefined = await <Promise<TResponseAddressTransactions|undefined>>promise;
      //console.log('BlockchainAddressRequest:getAddressTransactions:error', result);
      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('BlockchainAddressRequest:getAddressTransactions', async () => {
    const promise = req.getAddressTransactions(
      <TBlockchainTrxByAddressFilter>{
        id: globalAddresses[0].id,
        offset: 0,
        limit: 50
    });

    const result: TResponseAddressTransactions = await <Promise<TResponseAddressTransactions>>promise;
    //console.log('BlockchainAddressRequest:getAddressTransactions', result);
    expect(result).toHaveProperty('count');
    expect(result).toHaveProperty('transactions');
    let item: TResponseAddressTransaction;
    for (item of result.transactions) {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('status');
      expect(item).toHaveProperty('type');
      expect(item).toHaveProperty('currency');
      expect(item).toHaveProperty('network');
      expect(item).toHaveProperty('addressFrom');
      expect(item).toHaveProperty('addressTo');
      expect(item).toHaveProperty('amount');
      expect(item).toHaveProperty('tx');
    }
  });

  it('BlockchainAddressRequest:setMetaData', async () => {
    const promise = req.setMetaData(
      globalAddresses[0].id, //'f61d18df-d43e-4c21-a673-f3c2b0571c61'
      {testProps: 'testProps'}
    );

    const result: boolean = await <Promise<boolean>>promise;
    //console.log('BlockchainAddressRequest:setMetaData', result);
    expect(result).toBe(true);
  });

});
