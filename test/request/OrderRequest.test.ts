import {config} from 'dotenv';
import axios, { Axios, AxiosRequestConfig } from 'axios';

import {CustomHeaderBuilder} from '../../lib/DataBuilder';
import { OCPAPIReturnType } from '../../lib/request/BaseClass';

import { 
  TOrderEntity, 
  TOrderFilter, 
  TResponseMakeOrder, 
  TResponseGetOrder, 
  TResponseGetOrders
} from '../../lib/types/Order';

import OrderRequest from '../../lib/request/OrderRequest';

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

describe('OrderRequest tests', ():void => {
  config();
  const publicKey: string = process.env.PUBLIC_KEY || '';
  const privateKey: string = process.env.PRIVATE_KEY || '';
  const remoteHost: string = process.env.REMOTE_HOST || '';
  const advancedBalanceId: string = process.env.ADVANCED_BALANCE_ID || '';

  const axiosInstance: Axios = axios.create(<AxiosRequestConfig>{...defaultAxiosOptions, baseURL: remoteHost});
  const headerBuilder:CustomHeaderBuilder = new CustomHeaderBuilder(publicKey, privateKey);
  const req = new OrderRequest(axiosInstance, headerBuilder);
  let order: TResponseMakeOrder;

  it('OrderRequest:constructor', ():void => {
    expect(req).toBeInstanceOf(OrderRequest);
    expect(req).toHaveProperty('makeOrder');
    expect(req).toHaveProperty('getOrder');
    expect(req).toHaveProperty('getListOfOrders');
  });

  it('OrderRequest:makeOrder', async () => {
    const promise = req.makeOrder(
      <TOrderEntity>{
        advancedBalanceId,
        currency: 'USDC',
        network: 'bsc',
        amount: '5',
        lifetime: 60 * 60,
        order: 'Order #93751',
    });

    const result: TResponseMakeOrder = await <Promise<TResponseMakeOrder>>promise;
    order = result;
    //console.log('OrderRequest:makeOrder', result);
    expect(result).toHaveProperty('advancedBalanceId');
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('link');
    expect(result).toHaveProperty('amount');
    expect(result).toHaveProperty('currency');
    expect(result).toHaveProperty('network');
    expect(result).toHaveProperty('addressId');
    expect(result).toHaveProperty('address');
    expect(result).toHaveProperty('orderId');
    expect(result).toHaveProperty('clientOrderId');
    expect(result).toHaveProperty('description');
    expect(result).toHaveProperty('successWebhook');
    expect(result).toHaveProperty('errorWebhook');
    expect(result).toHaveProperty('returnUrl');
    expect(result).toHaveProperty('expiresAt');
    expect(result).toHaveProperty('createdAt');
  });

  it('OrderRequest:getOrder:error', async () => {
    try {
      const promise = req.getOrder('');
  
      const result: TResponseGetOrder = await <Promise<TResponseGetOrder>>promise;
      //console.log('OrderRequest:getOrder:error', result);
      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('OrderRequest:getOrder', async () => {
    const promise = req.getOrder(order.orderId);

    const result: TResponseGetOrder = await <Promise<TResponseGetOrder>>promise;
    //console.log('OrderRequest:getOrder', result);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('advancedBalanceId');
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('link');
    expect(result).toHaveProperty('amount');
    expect(result).toHaveProperty('currency');
    expect(result).toHaveProperty('network');
    expect(result).toHaveProperty('addressId');
    expect(result).toHaveProperty('address');
    //expect(result).toHaveProperty('orderId');
    //expect(result).toHaveProperty('clientOrderId');
    expect(result).toHaveProperty('description');
    expect(result).toHaveProperty('successWebhook');
    expect(result).toHaveProperty('errorWebhook');
    expect(result).toHaveProperty('returnUrl');
    expect(result).toHaveProperty('expiresAt');
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('updatedAt');
    expect(result).toHaveProperty('received');
    expect(result).toHaveProperty('transactions');
    expect(result).toHaveProperty('orphanDeposits');
  });

  it('OrderRequest:getListOfOrders:error', async () => {
    try {
      const promise = req.getListOfOrders(<TOrderFilter>{});
  
      const result: TResponseGetOrders = await <Promise<TResponseGetOrders>>promise;
      //console.log('OrderRequest:getListOfOrders:error', result);
      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('OrderRequest:getListOfOrders', async () => {
    const promise = req.getListOfOrders(<TOrderFilter>{
        status: null,
        limit: 50,
        offset: 0
    });

    const result: TResponseGetOrders = await <Promise<TResponseGetOrders>>promise;
    //console.log('OrderRequest:getListOfOrders', result);
    expect(result).toHaveProperty('total');
    expect(result).toHaveProperty('orders');

    let item: TResponseMakeOrder;
    for (item of result.orders) {
      expect(item).toHaveProperty('advancedBalanceId');
      expect(item).toHaveProperty('status');
      expect(item).toHaveProperty('link');
      expect(item).toHaveProperty('amount');
      expect(item).toHaveProperty('currency');
      expect(item).toHaveProperty('network');
      expect(item).toHaveProperty('addressId');
      expect(item).toHaveProperty('address');
      //expect(item).toHaveProperty('orderId');
      //expect(item).toHaveProperty('clientOrderId');
      expect(item).toHaveProperty('description');
      expect(item).toHaveProperty('successWebhook');
      expect(item).toHaveProperty('errorWebhook');
      expect(item).toHaveProperty('returnUrl');
      expect(item).toHaveProperty('expiresAt');
      expect(item).toHaveProperty('createdAt');
    }
  });
});
