import {config} from 'dotenv';
import axios, { Axios, AxiosRequestConfig } from 'axios';

import {CustomHeaderBuilder} from '../../lib/DataBuilder';
import { OCPAPIReturnType } from '../../lib/request/BaseClass';

import { 
  TWithdrawalCommissionRequest, 
  TWithdrawalRequest, 
  TResponseRequestFee, 
  TResponseMakeWithdrawal 
} from '../../lib/types/Withdrawal';

import WithdrawalRequest from '../../lib/request/WithdrawalRequest';

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

describe('WithdrawalRequest tests', ():void => {
  config();
  const publicKey: string = process.env.PUBLIC_KEY || '';
  const privateKey: string = process.env.PRIVATE_KEY || '';
  const remoteHost: string = process.env.REMOTE_HOST || '';
  const advancedBalanceId: string = process.env.ADVANCED_BALANCE_ID || '';
  const webhookUrl: string = process.env.WEBHOOK_URL || '';
  const payerAddressId: string = process.env.WITHDRAWAL_PAYER_ADDRESS_ID || '';
  const receiverAddress: string = process.env.WITHDRAWAL_RECEIVER_ADDRESS || '';

  const axiosInstance: Axios = axios.create(<AxiosRequestConfig>{...defaultAxiosOptions, baseURL: remoteHost});
  const headerBuilder:CustomHeaderBuilder = new CustomHeaderBuilder(publicKey, privateKey);
  const req = new WithdrawalRequest(axiosInstance, headerBuilder);

  let requestFee: TResponseRequestFee,
  requestAmount: string = '1',
  globalWithdrawal: TResponseMakeWithdrawal;

  it('WithdrawalRequest:constructor', ():void => {
    expect(req).toBeInstanceOf(WithdrawalRequest);
    expect(req).toHaveProperty('getCommissionForMakingWithdrawal');
    expect(req).toHaveProperty('makeWithdrawal');
    expect(req).toHaveProperty('makeWithdrawalAsync');
    expect(req).toHaveProperty('getWithdrawal');
  });

  it('WithdrawalRequest:getCommissionForMakingWithdrawal', async () => {
    const promise = req.getCommissionForMakingWithdrawal(
      <TWithdrawalCommissionRequest>{
        advancedBalanceId,
        addressId: payerAddressId,
        amount: requestAmount
    });

    const result: TResponseRequestFee = await <Promise<TResponseRequestFee>>promise;
    requestFee = result;
    //console.log('WithdrawalRequest:getCommissionForMakingWithdrawal', result);
    expect(result).toHaveProperty('blockchainFeeCurrencyUSDRate');
    expect(result).toHaveProperty('blockchainFeeCurrency');
    expect(result).toHaveProperty('withdrawalCurrencyUSDRate');
    expect(result).toHaveProperty('blockchainFeeSource');
    expect(result).toHaveProperty('blockchainFee');
    expect(result).toHaveProperty('blockchainFeeUSD');
    expect(result).toHaveProperty('serviceFee');
    expect(result).toHaveProperty('serviceFeeUSD');
    expect(result).toHaveProperty('withdrawalMin');
    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('until');
  });

  it('WithdrawalRequest:makeWithdrawal:error', async () => {
    try {
      const promise = req.makeWithdrawal(<TWithdrawalRequest>{});
  
      const result: TResponseMakeWithdrawal = await <Promise<TResponseMakeWithdrawal>>promise;
      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('WithdrawalRequest:makeWithdrawal', async () => {
    const promise = req.makeWithdrawal(
      <TWithdrawalRequest>{
        advancedBalanceId,
        addressId: payerAddressId,
        address: receiverAddress,
        amount: requestAmount,
        feeToken: requestFee.token,
        webhookUrl,
        tag: 'make-withdrawal'
    });

    const result: TResponseMakeWithdrawal = await <Promise<TResponseMakeWithdrawal>>promise;
    globalWithdrawal = result;
    //console.log('WithdrawalRequest:makeWithdrawal', result);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('advancedBalanceId');
    expect(result).toHaveProperty('addressId');
    expect(result).toHaveProperty('currency');
    expect(result).toHaveProperty('network');
    expect(result).toHaveProperty('tx');
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('address');
    expect(result).toHaveProperty('amount');
    expect(result).toHaveProperty('feeSource');
    expect(result).toHaveProperty('feeAmount');
    expect(result).toHaveProperty('createdAt');
  });

  it('WithdrawalRequest:makeWithdrawalAsync:error', async () => {
    try {
      const promise = req.makeWithdrawalAsync(<TWithdrawalRequest>{});
  
      const result: TResponseMakeWithdrawal = await <Promise<TResponseMakeWithdrawal>>promise;
      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('WithdrawalRequest:makeWithdrawalAsync', async () => {
    const promise = req.makeWithdrawalAsync(<TWithdrawalRequest>{
      advancedBalanceId,
      addressId: payerAddressId,
      address: receiverAddress,
      amount: requestAmount,
      feeToken: requestFee.token,
      webhookUrl,
      tag: 'make-withdrawal-async'
    });

    const result: TResponseMakeWithdrawal = await <Promise<TResponseMakeWithdrawal>>promise;
    globalWithdrawal = globalWithdrawal || result;
    //console.log('WithdrawalRequest:makeWithdrawalAsync', result);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('advancedBalanceId');
    expect(result).toHaveProperty('addressId');
    expect(result).toHaveProperty('currency');
    expect(result).toHaveProperty('network');
    expect(result).toHaveProperty('tx');
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('address');
    expect(result).toHaveProperty('amount');
    expect(result).toHaveProperty('feeSource');
    expect(result).toHaveProperty('feeAmount');
    expect(result).toHaveProperty('createdAt');
  });

  it('WithdrawalRequest:getWithdrawal:error', async () => {
    try {
      const promise = req.getWithdrawal('');
  
      const result: TResponseMakeWithdrawal = await <Promise<TResponseMakeWithdrawal>>promise;
      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('WithdrawalRequest:getWithdrawal', async () => {
    const promise = req.getWithdrawal(globalWithdrawal.id);

    const result: TResponseMakeWithdrawal = await <Promise<TResponseMakeWithdrawal>>promise;
    //console.log('WithdrawalRequest:getWithdrawal', result);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('advancedBalanceId');
    expect(result).toHaveProperty('addressId');
    expect(result).toHaveProperty('currency');
    expect(result).toHaveProperty('network');
    expect(result).toHaveProperty('tx');
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('address');
    expect(result).toHaveProperty('amount');
    expect(result).toHaveProperty('feeSource');
    expect(result).toHaveProperty('feeAmount');
    expect(result).toHaveProperty('createdAt');
  });
});
