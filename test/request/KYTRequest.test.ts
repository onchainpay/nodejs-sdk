import {config} from 'dotenv';
import axios, { Axios, AxiosRequestConfig } from 'axios';

import {CustomHeaderBuilder} from '../../lib/DataBuilder';
import { OCPAPIReturnType } from '../../lib/request/BaseClass';

import {
  TResponseCheckTransferCategory,
  TKYTTransactionCheckRequest, 
  TKYTWithdrawalCheckRequest, 
  TKYTWithdrawalForAddressCheckRequest, 
  TResponseCheckTransfer, 
  TResponseWithdrawalAddressScreening
} from '../../lib/types/KYT';

import KYTRequest from '../../lib/request/KYTRequest';

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

describe('KYTRequest tests', ():void => {
  config();
  const publicKey: string = process.env.PUBLIC_KEY || '';
  const privateKey: string = process.env.PRIVATE_KEY || '';
  const remoteHost: string = process.env.REMOTE_HOST || '';
  const advancedBalanceId: string = process.env.ADVANCED_BALANCE_ID || '';

  const axiosInstance: Axios = axios.create(<AxiosRequestConfig>{...defaultAxiosOptions, baseURL: remoteHost});
  const headerBuilder:CustomHeaderBuilder = new CustomHeaderBuilder(publicKey, privateKey);
  const req: KYTRequest = new KYTRequest(axiosInstance, headerBuilder);

  it('KYTRequest:constructor', ():void => {
    expect(req).toBeInstanceOf(KYTRequest);
    expect(req).toHaveProperty('checkTransactionRisks');
    expect(req).toHaveProperty('checkWithdrawalRisks');
    expect(req).toHaveProperty('checkWithdrawalRisksForAddress');
  });

  it('KYTRequest:checkTransactionRisks', async () => {
    const promise = req.checkTransactionRisks(
      <TKYTTransactionCheckRequest>{
        tx: '0xedffa132e4c34189a62fb9c14112b8dad9fd6e09fb92e1f84a28f5df679fd7ad',
        currency: 'USDT',
        network: 'bsc',
        outputAddress: '0xb13E746630bAFc7d2aA78A1e3c90E8D89292776b',
        direction: 'received'//sent
    });

    const result: TResponseCheckTransfer = await <Promise<TResponseCheckTransfer>>promise;
    //console.log('KYTRequest:checkTransactionRisks', result);
    expect(result).toHaveProperty('level');
    expect(result).toHaveProperty('categories');
    let item: TResponseCheckTransferCategory;
    for (item of result.categories) {
      expect(item).toHaveProperty('level');
      expect(item).toHaveProperty('usdAmount');
      expect(item).toHaveProperty('exposure');
      expect(item).toHaveProperty('category');
      expect(item).toHaveProperty('service');
    }
  });

  it('KYTRequest:checkWithdrawalRisks:error', async () => {
    try {
      const promise = req.checkWithdrawalRisks(<TKYTWithdrawalCheckRequest>{});
  
      const result: TResponseCheckTransfer = await <Promise<TResponseCheckTransfer>>promise;
      //console.log('KYTRequest:checkWithdrawalRisks:error', result);
      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('KYTRequest:checkWithdrawalRisks', async () => {
    const promise = req.checkWithdrawalRisks(<TKYTWithdrawalCheckRequest>{
      currency: 'USDT',
      network: 'bsc',
      address: '0x667aFf13268c437d53d8328249BDdFedc6645B33',
      amount: '5'
    });

    const result: TResponseCheckTransfer = await <Promise<TResponseCheckTransfer>>promise;
    //console.log('KYTRequest:checkWithdrawalRisks', result);
    expect(result).toHaveProperty('level');
    expect(result).toHaveProperty('categories');
    let item: TResponseCheckTransferCategory;
    for (item of result.categories) {
      expect(item).toHaveProperty('level');
      expect(item).toHaveProperty('usdAmount');
      expect(item).toHaveProperty('exposure');
      expect(item).toHaveProperty('category');
      expect(item).toHaveProperty('service');
    }
  });

  it('KYTRequest:checkWithdrawalRisksForAddress:error', async () => {
    try {
      const promise = req.checkWithdrawalRisksForAddress(<TKYTWithdrawalForAddressCheckRequest>{});
  
      const result: TResponseWithdrawalAddressScreening = await <Promise<TResponseWithdrawalAddressScreening>>promise;
      //console.log('KYTRequest:checkWithdrawalRisksForAddress:error', result);
      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('KYTRequest:checkWithdrawalRisksForAddress', async () => {
    const promise = req.checkWithdrawalRisksForAddress(<TKYTWithdrawalForAddressCheckRequest>{
      currency: 'USDT',
      network: 'bsc',
      address: '0xsddhsdhudheufvfkmvfvhbdhdbfjf'
    });

    const result: TResponseWithdrawalAddressScreening = await <Promise<TResponseWithdrawalAddressScreening>>promise;
    //console.log('KYTRequest:checkWithdrawalRisksForAddress', result);
    expect(result).toHaveProperty('currency');
    expect(result).toHaveProperty('address');
    expect(result).toHaveProperty('rating');
    //expect(result).toHaveProperty('cluster');
    //expect(result).toHaveProperty('cluster.name');
    //expect(result).toHaveProperty('cluster.category');
    //expect(result).toHaveProperty('cluster.categoryId');
    //expect(result).toHaveProperty('identification');
    //expect(result).toHaveProperty('identification.addressName');
    //expect(result).toHaveProperty('identification.description');
    //expect(result).toHaveProperty('identification.categoryName');
    //expect(result).toHaveProperty('identification.categoryId');
  });
});
