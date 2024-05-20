import {config} from 'dotenv';
import axios, { Axios, AxiosRequestConfig } from 'axios';

import {CustomHeaderBuilder} from '../../lib/DataBuilder';
import { OCPAPIReturnType } from '../../lib/request/BaseClass';
import {
  TCrosschainTransferCommissionToken, 
  TCrosschainTransferRequest, 
  TResponseCrosschainBridgeLimit, 
  TResponseCrosschainBridge, 
  TResponseCrosschainBridgeFeeToken 
} from '../../lib/types/CrosschainBridge';
import CrosschainBridgeRequest from '../../lib/request/CrosschainBridgeRequest';

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

describe('CrosschainBridgeRequest tests', ():void => {
  config();
  const publicKey: string = process.env.PUBLIC_KEY || '';
  const privateKey: string = process.env.PRIVATE_KEY || '';
  const remoteHost: string = process.env.REMOTE_HOST || '';
  const advancedBalanceId: string = process.env.ADVANCED_BALANCE_ID || '';
  const webhookUrl: string = process.env.WEBHOOK_URL || '';
  const fromAddressId: string = process.env.CROSSCHAIN_BRIDGE_FROM_ADDRESS_ID || '';
  const toAddressId: string = process.env.CROSSCHAIN_BRIDGE_TO_ADDRESS_ID || '';
  const forCurrency: string = process.env.CROSSCHAIN_BRIDGE_CURRENCY || '';
  const networkFrom: string = process.env.CROSSCHAIN_BRIDGE_NETWORK_FROM || '';
  const networkTo: string = process.env.CROSSCHAIN_BRIDGE_NETWORK_TO || '';

  const axiosInstance: Axios = axios.create(<AxiosRequestConfig>{...defaultAxiosOptions, baseURL: remoteHost});
  const headerBuilder:CustomHeaderBuilder = new CustomHeaderBuilder(publicKey, privateKey);
  const req = new CrosschainBridgeRequest(axiosInstance, headerBuilder);

  let minAmount: string, 
  globalToken: TResponseCrosschainBridgeFeeToken,
  globalTransfer: TResponseCrosschainBridge;

  it('CrosschainBridgeRequest:constructor', ():void => {
    expect(req).toBeInstanceOf(CrosschainBridgeRequest);
    expect(req).toHaveProperty('getCrosschainTransferLimits');
    expect(req).toHaveProperty('getCrosschainTransferInfo');
    expect(req).toHaveProperty('getCrosschainTransferCommissionToken');
    expect(req).toHaveProperty('createCrosschainTransfer');
  });

  it('CrosschainBridgeRequest:getCrosschainTransferLimits', async () => {
    const promise = req.getCrosschainTransferLimits();

    const result: TResponseCrosschainBridgeLimit = await <Promise<TResponseCrosschainBridgeLimit>>promise;
    //console.log('CrosschainBridgeRequest:getCrosschainTransferLimits', result);
    expect(result).toHaveProperty('min');
    expect(result).toHaveProperty('max');
    minAmount = result.min;
  });

  it('CrosschainBridgeRequest:getCrosschainTransferCommissionToken:error', async () => {
    try {
      const promise = req.getCrosschainTransferCommissionToken(<TCrosschainTransferCommissionToken>{});
  
      const result: TResponseCrosschainBridgeFeeToken|undefined = await <Promise<TResponseCrosschainBridgeFeeToken|undefined>>promise;
      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('CrosschainBridgeRequest:getCrosschainTransferCommissionToken', async () => {
    const promise = req.getCrosschainTransferCommissionToken(<TCrosschainTransferCommissionToken>{
      advancedBalanceId,
      currency: forCurrency,
      networkFrom,
      networkTo,
      amount: minAmount
    });

    const result: TResponseCrosschainBridgeFeeToken = await <Promise<TResponseCrosschainBridgeFeeToken>>promise;
    globalToken = result;
    //console.log('CrosschainBridgeRequest:getCrosschainTransferCommissionToken', result);
    expect(result).toHaveProperty('advancedBalanceId');
    expect(result).toHaveProperty('blockchainFee');
    expect(result).toHaveProperty('blockchainFeeUSD');
    expect(result).toHaveProperty('serviceFeeUSD');
    expect(result).toHaveProperty('amount');
    expect(result).toHaveProperty('amountUSD');
    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('expiresAt');
  });

  it('CrosschainBridgeRequest:createCrosschainTransfer:error', async () => {
    try {
      const promise = req.createCrosschainTransfer(<TCrosschainTransferRequest>{});
  
      const result: TResponseCrosschainBridge|undefined = await <Promise<TResponseCrosschainBridge|undefined>>promise;
      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('CrosschainBridgeRequest:createCrosschainTransfer', async () => {
    const promise = req.createCrosschainTransfer(<TCrosschainTransferRequest>{
      advancedBalanceId,
      clientId: advancedBalanceId + Date.now(),
      addressFromId: fromAddressId,
      addressToId: toAddressId,
      feeToken: globalToken.token,
      webhookUrl
    });

    const result: TResponseCrosschainBridge = await <Promise<TResponseCrosschainBridge>>promise;
    globalTransfer = result;
    //console.log('CrosschainBridgeRequest:createCrosschainTransfer', result);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('clientId');
    expect(result).toHaveProperty('advancedBalanceId');
    expect(result).toHaveProperty('currency');
    expect(result).toHaveProperty('networkFrom');
    expect(result).toHaveProperty('networkTo');
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('amount');
    expect(result).toHaveProperty('amountUSD');    
    expect(result).toHaveProperty('blockchainFee');
    expect(result).toHaveProperty('blockchainFeeUSD');
    expect(result).toHaveProperty('serviceFeeUSD');
    expect(result).toHaveProperty('webhookUrl');
    expect(result).toHaveProperty('createdAt');
  });

  it('CrosschainBridgeRequest:getCrosschainTransferInfo:error', async () => {
    try {
      const promise = req.getCrosschainTransferInfo('');
  
      const result: TResponseCrosschainBridge|undefined = await <Promise<TResponseCrosschainBridge|undefined>>promise;
      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('CrosschainBridgeRequest:getCrosschainTransferInfo', async () => {
    const promise = req.getCrosschainTransferInfo(globalTransfer.id);

    const result: TResponseCrosschainBridge = await <Promise<TResponseCrosschainBridge>>promise;
    //console.log('CrosschainBridgeRequest:getCrosschainTransferInfo', result);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('clientId');
    expect(result).toHaveProperty('advancedBalanceId');
    expect(result).toHaveProperty('currency');
    expect(result).toHaveProperty('networkFrom');
    expect(result).toHaveProperty('networkTo');
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('amount');
    expect(result).toHaveProperty('amountUSD');    
    expect(result).toHaveProperty('blockchainFee');
    expect(result).toHaveProperty('blockchainFeeUSD');
    expect(result).toHaveProperty('serviceFeeUSD');
    expect(result).toHaveProperty('webhookUrl');
    expect(result).toHaveProperty('createdAt');
  });
});

// lost trx id: 292420f6-1e18-4ab2-9297-8d31dfb006c1 
// on blockchain: https://tronscan.org/#/transaction/22acb7a5d5bf7ddd15bc066bdbb545aa305ed290065b9db8a84033819800ec64
// lost trx id: 04335d64-18f9-4cda-9dac-aab9dde0e7cf 
// on blockchain2: https://bscscan.com/tx/0xb842705a73c476d1a27d00cd57462254ebf9b1787f788b932844b31e5eb3cf67
