import {config} from 'dotenv';
import axios, { Axios, AxiosRequestConfig } from 'axios';

import {CustomHeaderBuilder} from '../../lib/DataBuilder';
import AccountRequest from '../../lib/request/AccountRequest';

import { OCPAPIReturnType } from '../../lib/request/BaseClass';
import {
  TResponseAccountTariff,
  TPaymentAddressFilter, 
  TResponseAccount, 
  TResponseAdvDeposit
} from '../../lib/types/Account';

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

describe('AccountRequest tests', ():void => {
  config();
  const publicKey: string = process.env.PUBLIC_KEY || '';
  const privateKey: string = process.env.PRIVATE_KEY || '';
  const remoteHost: string = process.env.REMOTE_HOST || '';
  const advancedBalanceId: string = process.env.ADVANCED_BALANCE_ID || '';

  const axiosInstance: Axios = axios.create(<AxiosRequestConfig>{...defaultAxiosOptions, baseURL: remoteHost});
  const headerBuilder:CustomHeaderBuilder = new CustomHeaderBuilder(publicKey, privateKey);
  const req = new AccountRequest(axiosInstance, headerBuilder);

  it('AccountRequest:constructor', ():void => {
    expect(req).toBeInstanceOf(AccountRequest);
    expect(req).toHaveProperty('getBalances');
    expect(req).toHaveProperty('getBalanceById');
    expect(req).toHaveProperty('getPaymentAddressForBalanceTopUp');
  });

  it('AccountRequest:getBalances', async () => {
    const promise = req.getBalances();

    const result = await <Promise<TResponseAccount[]>>promise;

    expect(result).toHaveProperty('length');

    let item: TResponseAccount, tariffItem: TResponseAccountTariff;
    for (item of result) {
      expect(item).toHaveProperty('advancedBalanceId');
      expect(item).toHaveProperty('blocked');
      expect(item).toHaveProperty('blockReason');
      expect(item).toHaveProperty('balance');
      expect(item).toHaveProperty('availableCurrenciesForDeposit');

      if (!item.tariffs) {
        expect(item).not.toHaveProperty('tariffs');
      } else {
        expect(item).toHaveProperty('tariffs');
        //console.log('AccountRequest:getBalances', {tariffs: item.tariffs});
        for (tariffItem of item.tariffs) {
          expect(tariffItem).toHaveProperty('advancedBalanceId');
          expect(tariffItem).toHaveProperty('action');
          expect(tariffItem).toHaveProperty('amount');
          expect(tariffItem).toHaveProperty('type');
          expect(tariffItem).toHaveProperty('minAmount');
          expect(tariffItem).toHaveProperty('maxAmount');
          expect(tariffItem).toHaveProperty('invoiceAdditionalFee');
        }
      }
    }
  });

  it('AccountRequest:getBalanceById:emptyString', async () => {
    try {
      const promise = req.getBalanceById('');

      const result: TResponseAccount|undefined = await <Promise<TResponseAccount|undefined>>promise;
      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('AccountRequest:getBalanceById', async () => {
    const promise = req.getBalanceById(advancedBalanceId);

    const result: TResponseAccount = await <Promise<TResponseAccount>>promise;
    //console.log('AccountRequest:getBalanceById', result);
    expect(result).toHaveProperty('advancedBalanceId');
    expect(result).toHaveProperty('blocked');
    expect(result).toHaveProperty('blockReason');
    expect(result).toHaveProperty('balance');
    expect(result).toHaveProperty('availableCurrenciesForDeposit');

    let tariffItem: TResponseAccountTariff;
    if (!result.tariffs) {
      expect(result).not.toHaveProperty('tariffs');
    } else {
      expect(result).toHaveProperty('tariffs');
      //console.log('AccountRequest:getBalanceById', {tariffs: result.tariffs});
      for (tariffItem of result.tariffs) {
        //expect(tariffItem).toHaveProperty('id');
        expect(tariffItem).toHaveProperty('action');
        expect(tariffItem).toHaveProperty('amount');
        expect(tariffItem).toHaveProperty('type');
      }
    }
  });

  it('AccountRequest:getPaymentAddressForBalanceTopUp empty params', async () => {
    try {
      const promise = req.getPaymentAddressForBalanceTopUp(<TPaymentAddressFilter>{advancedBalanceId: ''});

      const result:TResponseAdvDeposit|undefined = await <Promise<TResponseAdvDeposit|undefined>>promise;

      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('AccountRequest:getPaymentAddressForBalanceTopUp', async () => {
    const promise = req.getPaymentAddressForBalanceTopUp(<TPaymentAddressFilter>{advancedBalanceId, currency: 'BUSD', network: 'bsc'});

    const result:TResponseAdvDeposit = await <Promise<TResponseAdvDeposit>>promise;
    //console.log('AccountRequest:getPaymentAddressForBalanceTopUp', result);
    expect(result).toHaveProperty('currency');
    expect(result).toHaveProperty('network');
    expect(result).toHaveProperty('address');
    expect(result).toHaveProperty('tag');
    expect(result).toHaveProperty('until');
  });
});
