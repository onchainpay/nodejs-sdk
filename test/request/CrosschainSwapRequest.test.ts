import {config} from 'dotenv';
import axios, { Axios, AxiosRequestConfig } from 'axios';

import {CustomHeaderBuilder} from '../../lib/DataBuilder';
import { OCPAPIReturnType } from '../../lib/request/BaseClass';
import {
  TCrosschainExchangeCommissionToken, 
  TCrosschainExchangeRequest, 
  TResponseCrosschainExchangeLimit, 
  TResponseCrosschainExchange, 
  TResponseCrosschainExchangeFeeToken
} from '../../lib/types/CrosschainSwap';
import CrosschainSwapRequest from '../../lib/request/CrosschainSwapRequest';

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

describe('CrosschainSwapRequest tests', ():void => {
  config();
  const publicKey: string = process.env.PUBLIC_KEY || '';
  const privateKey: string = process.env.PRIVATE_KEY || '';
  const remoteHost: string = process.env.REMOTE_HOST || '';
  const advancedBalanceId: string = process.env.ADVANCED_BALANCE_ID || '';
  const webhookUrl: string = process.env.WEBHOOK_URL || '';
  const fromAddressId: string = process.env.CROSSCHAIN_SWAP_FROM_ADDRESS_ID || '';
  const toAddressId: string = process.env.CROSSCHAIN_SWAP_TO_ADDRESS_ID || '';
  const currencyFrom: string = process.env.CROSSCHAIN_SWAP_CURRENCY_FROM || '';
  const currencyTo: string = process.env.CROSSCHAIN_SWAP_CURRENCY_TO || '';
  const networkFrom: string = process.env.CROSSCHAIN_SWAP_NETWORK_FROM || '';
  const networkTo: string = process.env.CROSSCHAIN_SWAP_NETWORK_TO || '';

  const axiosInstance: Axios = axios.create(<AxiosRequestConfig>{...defaultAxiosOptions, baseURL: remoteHost});
  const headerBuilder:CustomHeaderBuilder = new CustomHeaderBuilder(publicKey, privateKey);
  const req = new CrosschainSwapRequest(axiosInstance, headerBuilder);

  let minAmount: string, 
  globalToken: TResponseCrosschainExchangeFeeToken,
  globalExchange: TResponseCrosschainExchange;

  it('CrosschainSwapRequest:constructor', ():void => {
    expect(req).toBeInstanceOf(CrosschainSwapRequest);
    expect(req).toHaveProperty('getCrosschainExchangeLimits');
    expect(req).toHaveProperty('getCrosschainExchangeInfo');
    expect(req).toHaveProperty('getCrosschainExchangeCommissionToken');
    expect(req).toHaveProperty('createCrosschainExchange');
  });

  it('CrosschainSwapRequest:getCrosschainExchangeLimits', async () => {
    const promise = req.getCrosschainExchangeLimits();

    const result: TResponseCrosschainExchangeLimit = await <Promise<TResponseCrosschainExchangeLimit>>promise;
    //console.log('CrosschainSwapRequest:getCrosschainExchangeLimits', result);
    expect(result).toHaveProperty('min');
    expect(result).toHaveProperty('max');
    minAmount = result.min;
  });

  it('CrosschainSwapRequest:getCrosschainExchangeCommissionToken:error', async () => {
    try {
      const promise = req.getCrosschainExchangeCommissionToken(<TCrosschainExchangeCommissionToken>{});
  
      const result: TResponseCrosschainExchangeFeeToken|undefined = await <Promise<TResponseCrosschainExchangeFeeToken|undefined>>promise;
      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('CrosschainSwapRequest:getCrosschainExchangeCommissionToken', async () => {
    const promise = req.getCrosschainExchangeCommissionToken(<TCrosschainExchangeCommissionToken>{
      advancedBalanceId,
      currencyFrom,
      currencyTo,
      networkFrom,
      networkTo,
      amountFrom: minAmount
    });

    const result: TResponseCrosschainExchangeFeeToken = await <Promise<TResponseCrosschainExchangeFeeToken>>promise;
    globalToken = result;
    //console.log('CrosschainSwapRequest:getCrosschainExchangeCommissionToken', result);
    expect(result).toHaveProperty('advancedBalanceId');
    expect(result).toHaveProperty('amountFrom');
    expect(result).toHaveProperty('amountTo');
    expect(result).toHaveProperty('serviceBlockchainFeeSource');
    expect(result).toHaveProperty('serviceBlockchainFee');
    expect(result).toHaveProperty('serviceBlockchainFeeUSD');
    expect(result).toHaveProperty('providerBlockchainFeeSource');
    expect(result).toHaveProperty('providerBlockchainFee');
    expect(result).toHaveProperty('providerBlockchainFeeUSD');
    expect(result).toHaveProperty('serviceFeeSource');
    expect(result).toHaveProperty('serviceFee');
    expect(result).toHaveProperty('serviceFeeUSD');
    expect(result).toHaveProperty('price');
    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('expiresAt');
  });

  it('CrosschainSwapRequest:createCrosschainExchange:error', async () => {
    try {
      const promise = req.createCrosschainExchange(<TCrosschainExchangeRequest>{});
  
      const result: TResponseCrosschainExchange|undefined = await <Promise<TResponseCrosschainExchange|undefined>>promise;
      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('CrosschainSwapRequest:createCrosschainExchange', async () => {
    const promise = req.createCrosschainExchange(<TCrosschainExchangeRequest>{
      advancedBalanceId,
      clientId: advancedBalanceId + Date.now(),
      addressFromId: fromAddressId,
      addressToId: toAddressId,
      feeToken: globalToken.token,
      webhookUrl
    });

    const result: TResponseCrosschainExchange = await <Promise<TResponseCrosschainExchange>>promise;
    globalExchange = result;
    //console.log('CrosschainSwapRequest:createCrosschainExchange', result);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('clientId');
    expect(result).toHaveProperty('advancedBalanceId');
    expect(result).toHaveProperty('addressFromId');
    expect(result).toHaveProperty('addressToId');
    expect(result).toHaveProperty('currencyFrom');
    expect(result).toHaveProperty('currencyTo');
    expect(result).toHaveProperty('networkFrom');
    expect(result).toHaveProperty('networkTo');
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('amountFrom');
    expect(result).toHaveProperty('amountTo');
    expect(result).toHaveProperty('price');
    expect(result).toHaveProperty('serviceBlockchainFeeSource');
    expect(result).toHaveProperty('serviceBlockchainFee');
    expect(result).toHaveProperty('serviceBlockchainFeeUSD');
    expect(result).toHaveProperty('providerBlockchainFeeSource');
    expect(result).toHaveProperty('providerBlockchainFee');
    expect(result).toHaveProperty('providerBlockchainFeeUSD');
    expect(result).toHaveProperty('serviceFeeSource');
    expect(result).toHaveProperty('serviceFee');
    expect(result).toHaveProperty('serviceFeeUSD');
    expect(result).toHaveProperty('webhookUrl');
    expect(result).toHaveProperty('createdAt');
  });

  it('CrosschainSwapRequest:getCrosschainExchangeInfo:error', async () => {
    try {
      const promise = req.getCrosschainExchangeInfo('');
  
      const result: TResponseCrosschainExchange|undefined = await <Promise<TResponseCrosschainExchange|undefined>>promise;
      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('CrosschainSwapRequest:getCrosschainExchangeInfo', async () => {
  const promise = req.getCrosschainExchangeInfo(globalExchange.id);

    const result: TResponseCrosschainExchange = await <Promise<TResponseCrosschainExchange>>promise;
    //console.log('CrosschainSwapRequest:createBusinessWalletAddress', result);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('clientId');
    expect(result).toHaveProperty('advancedBalanceId');
    expect(result).toHaveProperty('addressFromId');
    expect(result).toHaveProperty('addressToId');
    expect(result).toHaveProperty('currencyFrom');
    expect(result).toHaveProperty('currencyTo');
    expect(result).toHaveProperty('networkFrom');
    expect(result).toHaveProperty('networkTo');
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('amountFrom');
    expect(result).toHaveProperty('amountTo');
    expect(result).toHaveProperty('price');
    expect(result).toHaveProperty('serviceBlockchainFeeSource');
    expect(result).toHaveProperty('serviceBlockchainFee');
    expect(result).toHaveProperty('serviceBlockchainFeeUSD');
    expect(result).toHaveProperty('providerBlockchainFeeSource');
    expect(result).toHaveProperty('providerBlockchainFee');
    expect(result).toHaveProperty('providerBlockchainFeeUSD');
    expect(result).toHaveProperty('serviceFeeSource');
    expect(result).toHaveProperty('serviceFee');
    expect(result).toHaveProperty('serviceFeeUSD');
    expect(result).toHaveProperty('webhookUrl');
    expect(result).toHaveProperty('createdAt');
  });

});
