//import * as crypto from 'node:crypto';
import {config} from 'dotenv';
import axios, { Axios, AxiosRequestConfig } from 'axios';

import {CustomHeaderBuilder} from '../../lib/DataBuilder';
import {OCPAPIReturnType} from '../../lib/request/BaseClass';
import BaseRequest from '../../lib/request/BaseRequest';
import { 
  TNullableString, 
  TResponseNetwork,
  TResponseTestSignature, 
  TResponsePrice, 
  TResponseAvailableCurrency, 
  TResponseFindTx, 
  TResponseValidateAddress
} from '../../lib/types/Base';
//import supertest from 'supertest';

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

describe('BaseRequest tests', ():void => {
  config();
  const publicKey: string = process.env.PUBLIC_KEY || '';
  const privateKey: string = process.env.PRIVATE_KEY || '';
  const remoteHost: string = process.env.REMOTE_HOST || '';

  const axiosInstance: Axios = axios.create(<AxiosRequestConfig>{...defaultAxiosOptions, baseURL: remoteHost});
  const headerBuilder:CustomHeaderBuilder = new CustomHeaderBuilder(publicKey, privateKey);
  const base = new BaseRequest(axiosInstance, headerBuilder);
  let currencies: TResponseAvailableCurrency[] = [];

  it('BaseRequest:constructor', ():void => {
    expect(base).toBeInstanceOf(BaseRequest);
    expect(base).toHaveProperty('testConnection');
    expect(base).toHaveProperty('availableCurrencies');
    expect(base).toHaveProperty('priceRate');
    expect(base).toHaveProperty('operationsByTXHash');
    expect(base).toHaveProperty('checkAddressFormat');
  });

  it('BaseRequest:testConnection', async () => {
    const promise = base.testConnection();

    const result = await <Promise<TResponseTestSignature>>promise;

    expect(result).toHaveProperty('checkSignatureResult');
    expect(result).toHaveProperty('signature');
    expect(result).toHaveProperty('receivedBody');
    expect(result).toHaveProperty('errors');
  });

  it('BaseRequest:availableCurrencies', async () => {
    const promise = base.availableCurrencies();

    const result = await <Promise<TResponseAvailableCurrency[]>>promise;
    currencies = currencies.concat(result); 
    //console.log('BaseRequest:availableCurrencies', {result});
    expect(result).toHaveProperty('length');

    let item:TResponseAvailableCurrency, networkItem: TResponseNetwork;
    for (item of result) {
      //console.log('BaseRequest:availableCurrencies:item', item);
      expect(item).toHaveProperty('currency');
      expect(item).toHaveProperty('alias');
      expect(item).toHaveProperty('allowDeposit');
      expect(item).toHaveProperty('allowWithdrawal');
      expect(item).toHaveProperty('priceUSD');
      expect(item).toHaveProperty('networks');

      for (networkItem of item.networks) {
        //console.log('BaseRequest:availableCurrencies:networkItem', networkItem);
        expect(networkItem).toHaveProperty('name');
        expect(networkItem).toHaveProperty('alias');
        expect(networkItem).toHaveProperty('contract');
        expect(networkItem).toHaveProperty('addressRegex');
        expect(networkItem).toHaveProperty('tagRegex');
        expect(networkItem).toHaveProperty('allowDeposit');
        expect(networkItem).toHaveProperty('allowWithdrawal');
        expect(networkItem).toHaveProperty('allowCrosschainBridge');
        expect(networkItem).toHaveProperty('allowCrosschainSwapFrom');
        expect(networkItem).toHaveProperty('allowCrosschainSwapTo');
        expect(networkItem).toHaveProperty('allowAutoSwapFrom');
        expect(networkItem).toHaveProperty('allowAutoSwapTo');
        expect(networkItem).toHaveProperty('withdrawalFee');
        expect(networkItem).toHaveProperty('withdrawalMin');
        expect(networkItem).toHaveProperty('confirmations');
        expect(networkItem).toHaveProperty('underMaintenance');
      }
    }
  });

  it('BaseRequest:priceRate', async () => {
    try {
      const promise = base.priceRate('', '');
      const result = await <Promise<OCPAPIReturnType|undefined>>promise;
      expect(result).toBeUndefined();
    } catch(exp) {
      expect(exp).toBeInstanceOf(Error);
    }

    try {
      const promise = base.priceRate('', currencies[0].currency);
      const result = await <Promise<OCPAPIReturnType|undefined>>promise;
      expect(result).toBeUndefined();
    } catch(exp) {
      expect(exp).toBeInstanceOf(Error);
    }

    try {
      const promise = base.priceRate(currencies[0].currency, '');
      const result = await <Promise<OCPAPIReturnType|undefined>>promise;
      expect(result).toBeUndefined();
    } catch(exp) {
      expect(exp).toBeInstanceOf(Error);
    }

    const promise = base.priceRate(currencies[0].currency, currencies[currencies.length-1].currency);

    expect(promise).toBeInstanceOf(Promise<TResponsePrice>);

    const result:TResponsePrice = await <Promise<TResponsePrice>>promise;

    expect(result).toMatch(/\d+\.?\d*/);
  });

  it('BaseRequest:operationsByTXHash', async () => {  
    try {
      const promise = base.operationsByTXHash();
      const result = await <Promise<OCPAPIReturnType|undefined>>promise;
      expect(result).toEqual([]);
    } catch(exp) {
      expect(exp).toBeInstanceOf(Error);
    }

    const promise = base.operationsByTXHash('0xb19c749640e26b284e05214d1138707d92e6e1f3a48db9f0beff431dbf3538a0');
    // 0x606c19fea0dabae36a703c9c030eabfe9546cc6e689a5a81fb6d72a8377f50ac 0xedffa132e4c34189a62fb9c14112b8dad9fd6e09fb92e1f84a28f5df679fd7ad

    expect(promise).toBeInstanceOf(Promise<TResponseFindTx[]>);

    const result:TResponseFindTx[] = await <Promise<TResponseFindTx[]>>promise;

    expect(result).toHaveProperty('length');
    expect(result).toEqual([]);
  });

  it('BaseRequest:checkAddressFormat', async () => {  
    try {
      const promise = base.checkAddressFormat();
      const result = await <Promise<TResponseValidateAddress>>promise;
      expect(result).toHaveProperty('isValid');
      expect(result).toHaveProperty('regex');
    } catch(exp) {
      expect(exp).toBeInstanceOf(Error);
    }

    try {
      const promise = base.checkAddressFormat('0x62F074A8c57b8126aB9d87E611D9bBbE02777326', 'ERC20');
      const result = await <Promise<TResponseValidateAddress>>promise;
      expect(result).toHaveProperty('isValid');
      expect(result).toHaveProperty('regex');
    } catch(exp) {
      expect(exp).toBeInstanceOf(Error);
    }

    const promise = base.checkAddressFormat('0xC43911bfA65B243867383aF7a137e8122bfa9723', 'bsc');

    const result: TResponseValidateAddress = await <Promise<TResponseValidateAddress>>promise;
    expect(result).toHaveProperty('isValid');
    expect(result).toHaveProperty('regex');
  });
});
