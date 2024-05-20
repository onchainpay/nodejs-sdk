import {config} from 'dotenv';
import axios, { Axios, AxiosRequestConfig } from 'axios';

import {CustomHeaderBuilder} from '../../lib/DataBuilder';
import { OCPAPIReturnType } from '../../lib/request/BaseClass';

import { 
  TOrphanTrxListRequest, 
  TOrphanTrxCommissionToken, 
  TResponseOrphanDeposit, 
  TResponseOrphanWithdrawalToken, 
  TResponseOrphan 
} from '../../lib/types/OrphanTransaction';

import OrphanTransactionRequest from '../../lib/request/OrphanTransactionRequest';

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

describe('OrphanTransactionRequest tests', ():void => {
  config();
  const publicKey: string = process.env.PUBLIC_KEY || '';
  const privateKey: string = process.env.PRIVATE_KEY || '';
  const remoteHost: string = process.env.REMOTE_HOST || '';
  const advancedBalanceId: string = process.env.ADVANCED_BALANCE_ID || '';
  const receiverAddress: string = process.env.WITHDRAWAL_RECEIVER_ADDRESS || '';
  const webhookUrl: string = process.env.WEBHOOK_URL || '';

  const axiosInstance: Axios = axios.create(<AxiosRequestConfig>{...defaultAxiosOptions, baseURL: remoteHost});
  const headerBuilder:CustomHeaderBuilder = new CustomHeaderBuilder(publicKey, privateKey);
  const req = new OrphanTransactionRequest(axiosInstance, headerBuilder);

  let globalTrxList: TResponseOrphanDeposit[],
  globalTrx: TResponseOrphanDeposit,
  globalCommissionToken: TResponseOrphanWithdrawalToken;

  it('OrphanTransactionRequest:constructor', ():void => {
    expect(req).toBeInstanceOf(OrphanTransactionRequest);
    expect(req).toHaveProperty('getTransaction');
    expect(req).toHaveProperty('getListOfTransaction');
    expect(req).toHaveProperty('getCommissionToken');
    expect(req).toHaveProperty('withdrawal');
  });

  it('OrphanTransactionRequest:getListOfTransaction:error', async () => {
    try {
      const promise = req.getListOfTransaction(<TOrphanTrxListRequest>{});

      const result: TResponseOrphanDeposit[]|undefined = await <Promise<TResponseOrphanDeposit[]|undefined>>promise;
      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('OrphanTransactionRequest:getListOfTransaction', async () => {
    const promise = req.getListOfTransaction(
      <TOrphanTrxListRequest>{
        offset: 0,
        limit: 50
    });

    const result: TResponseOrphanDeposit[] = await <Promise<TResponseOrphanDeposit[]>>promise;
    globalTrxList = result;
    //console.log('OrphanTransactionRequest:getListOfTransaction', result);
    let item: TResponseOrphanDeposit;
    for (item of result) {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('organizationId');
      expect(item).toHaveProperty('orderId');
      expect(item).toHaveProperty('stage');
      expect(item).toHaveProperty('status');
      //expect(item).toHaveProperty('message');
      expect(item).toHaveProperty('currency');
      expect(item).toHaveProperty('network');
      expect(item).toHaveProperty('amount');
      expect(item).toHaveProperty('canWithdrawal');
      expect(item).toHaveProperty('inTransaction');
      expect(item).toHaveProperty('outTransaction');
      expect(item).toHaveProperty('createdAt');

      if (item.stage === 'DEPOSIT' && item.status === 'PROCESSED' && item.canWithdrawal && Number(item.amount) >= 0.1) {
        globalTrx = item;
      }
    }
  });

  it('OrphanTransactionRequest:getTransaction:error', async () => {
    try {
      const promise = req.getTransaction('');

      const result: TResponseOrphanDeposit|undefined = await <Promise<TResponseOrphanDeposit|undefined>>promise;
      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('OrphanTransactionRequest:getTransaction', async () => {
    const promise = req.getTransaction(globalTrx?.id || globalTrxList[globalTrxList.length-1].id);

    const result: TResponseOrphanDeposit = await <Promise<TResponseOrphanDeposit>>promise;
    //console.log('OrphanTransactionRequest:getTransaction', result);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('organizationId');
    expect(result).toHaveProperty('orderId');
    expect(result).toHaveProperty('stage');
    expect(result).toHaveProperty('status');
    //expect(result).toHaveProperty('message');
    expect(result).toHaveProperty('currency');
    expect(result).toHaveProperty('network');
    expect(result).toHaveProperty('amount');
    expect(result).toHaveProperty('canWithdrawal');
    expect(result).toHaveProperty('inTransaction');
    expect(result).toHaveProperty('outTransaction');
    expect(result).toHaveProperty('createdAt');
  });

  it('OrphanTransactionRequest:getCommissionToken:error', async () => {
    try {
      const promise = req.getCommissionToken('');

      const result: TResponseOrphanWithdrawalToken|undefined = await <Promise<TResponseOrphanWithdrawalToken|undefined>>promise;
      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('OrphanTransactionRequest:getCommissionToken', async () => {
    const promise = req.getCommissionToken(globalTrx?.id || globalTrxList[globalTrxList.length-1].id);

    const result: TResponseOrphanWithdrawalToken = await <Promise<TResponseOrphanWithdrawalToken>>promise;
    globalCommissionToken = result;
    //console.log('OrphanTransactionRequest:getCommissionToken', result);
    expect(result).toHaveProperty('currency');
    expect(result).toHaveProperty('network');
    expect(result).toHaveProperty('feeSource');
    expect(result).toHaveProperty('blockchainFee');
    expect(result).toHaveProperty('blockchainFeeUSD');
    expect(result).toHaveProperty('serviceFee');
    expect(result).toHaveProperty('serviceFeeUSD');
    expect(result).toHaveProperty('amount');
    expect(result).toHaveProperty('amountTo');
    expect(result).toHaveProperty('price');
    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('expiresAt');
  });

  it('OrphanTransactionRequest:withdrawal', async () => {
    const promise = req.withdrawal(
      <TOrphanTrxCommissionToken>{
        token: globalCommissionToken.token,
        address: globalTrx?.inTransaction.address || receiverAddress, //receiverAddress
        comment: 'Orphan transaction comment',
        webhookUrl
    });

    const result: TResponseOrphan = await <Promise<TResponseOrphan>>promise;
    //console.log('OrphanTransactionRequest:withdrawal', result);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('organizationId');
    //expect(result).toHaveProperty('orderId');
    expect(result).toHaveProperty('stage');
    expect(result).toHaveProperty('status');
    //expect(result).toHaveProperty('message');
    //expect(result).toHaveProperty('currency');
    //expect(result).toHaveProperty('network');
    expect(result).toHaveProperty('amount');
    expect(result).toHaveProperty('canWithdrawal');
    expect(result).toHaveProperty('inTransaction');
    expect(result).toHaveProperty('outTransaction');
    expect(result).toHaveProperty('createdAt');
  });
});
