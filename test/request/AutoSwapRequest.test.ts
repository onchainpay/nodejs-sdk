import {config} from 'dotenv';
import axios, { Axios, AxiosRequestConfig } from 'axios';

import {CustomHeaderBuilder} from '../../lib/DataBuilder';
import { OCPAPIReturnType } from '../../lib/request/BaseClass';
import {TAutoSwapRequest, TResponseAutoSwap} from '../../lib/types/AutoSwap';
import AutoSwapRequest from '../../lib/request/AutoSwapRequest';

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

describe('AutoSwapRequest tests', ():void => {
  config();
  const publicKey: string = process.env.PUBLIC_KEY || '';
  const privateKey: string = process.env.PRIVATE_KEY || '';
  const remoteHost: string = process.env.REMOTE_HOST || '';
  const advancedBalanceId: string = process.env.ADVANCED_BALANCE_ID || '';
  const webhookUrl: string = process.env.WEBHOOK_URL || '';
  const toAddress: string = process.env.AUTO_SWAP_TO_ADDRESS || '';
  const currency: string = process.env.AUTO_SWAP_CURRENCY_TO || '';
  const network: string = process.env.AUTO_SWAP_NETWORK_TO || '';
  const amount: string = process.env.AUTO_SWAP_AMOUNT || '';

  const axiosInstance: Axios = axios.create(<AxiosRequestConfig>{...defaultAxiosOptions, baseURL: remoteHost});
  const headerBuilder:CustomHeaderBuilder = new CustomHeaderBuilder(publicKey, privateKey);
  const req = new AutoSwapRequest(axiosInstance, headerBuilder);

  let globalSwap: TResponseAutoSwap;

  it('AutoSwapRequest:constructor', ():void => {    
    expect(req).toBeInstanceOf(AutoSwapRequest);
    expect(req).toHaveProperty('createAutoSwaps');
    expect(req).toHaveProperty('findAutoSwapById');
  });

  it('AutoSwapRequest:createAutoSwaps:error', async () => {
    try {
      const promise = req.createAutoSwaps(<TAutoSwapRequest>{});
  
      const result: TResponseAutoSwap = await <Promise<TResponseAutoSwap>>promise;
      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('AutoSwapRequest:createAutoSwaps', async () => {
    const promise = req.createAutoSwaps(
      <TAutoSwapRequest>{
        address: toAddress, 
        currency, 
        network,
        amountTo: amount,
        webhookUrl
    });

    const result: TResponseAutoSwap = await <Promise<TResponseAutoSwap>>promise;
    globalSwap = result;
    //console.log('AutoSwapRequest:createAutoSwaps', result);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('organizationId');
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('message');
    expect(result).toHaveProperty('addressRiskLevel');
    expect(result).toHaveProperty('currencyFrom');
    expect(result).toHaveProperty('networkFrom');
    expect(result).toHaveProperty('currencyTo');
    expect(result).toHaveProperty('networkTO');
    expect(result).toHaveProperty('amountFrom');
    expect(result).toHaveProperty('amountFromUSD');
    expect(result).toHaveProperty('amountTo');
    expect(result).toHaveProperty('amountToUSD');
    expect(result).toHaveProperty('amountToReceive');
    expect(result).toHaveProperty('rate');
    expect(result).toHaveProperty('blockchainFeeFrom');
    expect(result).toHaveProperty('blockchainFeeFromUSD');
    expect(result).toHaveProperty('blockchainFeeTo');
    expect(result).toHaveProperty('blockchainFeeToUSD');
    expect(result).toHaveProperty('serviceFee');
    expect(result).toHaveProperty('webhookUrl');
    expect(result).toHaveProperty('updatedAt');
    expect(result).toHaveProperty('createdAt');
  });

  it('AutoSwapRequest:findAutoSwapById', async () => {
    const promise = req.findAutoSwapById(globalSwap.id);

    const result: TResponseAutoSwap = await <Promise<TResponseAutoSwap>>promise;
    //console.log('AutoSwapRequest:findAutoSwapById', result);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('organizationId');
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('message');
    expect(result).toHaveProperty('addressRiskLevel');
    expect(result).toHaveProperty('currencyFrom');
    expect(result).toHaveProperty('networkFrom');
    expect(result).toHaveProperty('currencyTo');
    expect(result).toHaveProperty('networkTo');
    expect(result).toHaveProperty('amountFrom');
    expect(result).toHaveProperty('amountFromUSD');
    expect(result).toHaveProperty('amountTo');
    expect(result).toHaveProperty('amountToUSD');
    expect(result).toHaveProperty('amountToReceive');
    expect(result).toHaveProperty('rate');
    expect(result).toHaveProperty('blockchainFeeFrom');
    expect(result).toHaveProperty('blockchainFeeFromUSD');
    expect(result).toHaveProperty('blockchainFeeTo');
    expect(result).toHaveProperty('blockchainFeeToUSD');
    expect(result).toHaveProperty('serviceFee');
    expect(result).toHaveProperty('webhookUrl');
    expect(result).toHaveProperty('updatedAt');
    expect(result).toHaveProperty('createdAt');
  });
});
