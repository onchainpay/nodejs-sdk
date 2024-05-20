import {config} from 'dotenv';
import axios, { Axios, AxiosRequestConfig } from 'axios';

import {CustomHeaderBuilder} from '../../lib/DataBuilder';
import { OCPAPIReturnType } from '../../lib/request/BaseClass';

import { 
  TPaymentLinkRequest, 
  TPaymentLinksByUserRequest, 
  TSubscriptionRequest, 
  TPaymentRequest, 
  TResponseBillingLink, 
  TResponseSubscriptionBillingLink, 
  TResponseDisableSubscriptionBillingLink,
  TResponseSubscription, 
  TResponseRecurrentPayment
} from '../../lib/types/RecurringPayment';

import RecurringPaymentRequest from '../../lib/request/RecurringPaymentRequest';

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

describe('RecurringPaymentRequest tests', ():void => {
  config();
  const publicKey: string = process.env.PUBLIC_KEY || '';
  const privateKey: string = process.env.PRIVATE_KEY || '';
  const remoteHost: string = process.env.REMOTE_HOST || '';
  const advancedBalanceId: string = process.env.ADVANCED_BALANCE_ID || '';
  const merchantId: string = process.env.MERCHANT_ID || '';
  const webhookUrl: string = process.env.WEBHOOK_URL || '';

  const axiosInstance: Axios = axios.create(<AxiosRequestConfig>{...defaultAxiosOptions, baseURL: remoteHost});
  const headerBuilder:CustomHeaderBuilder = new CustomHeaderBuilder(publicKey, privateKey);
  const req = new RecurringPaymentRequest(axiosInstance, headerBuilder);

  let billingLinks: TResponseSubscriptionBillingLink[],
  globalSubscription: TResponseSubscription;

  it('RecurringPaymentRequest:constructor', ():void => {
    expect(req).toBeInstanceOf(RecurringPaymentRequest);
    expect(req).toHaveProperty('createPaymentLink');
    expect(req).toHaveProperty('getPaymentLink');
    expect(req).toHaveProperty('getPaymentLinksByUser');
    expect(req).toHaveProperty('disablePaymentLink');
    expect(req).toHaveProperty('createSubscription');
    expect(req).toHaveProperty('getSubscription');
    expect(req).toHaveProperty('cancelSubscription');
    expect(req).toHaveProperty('createPayment');
  });

  it('RecurringPaymentRequest:createPaymentLink:error', async () => {
    try {
      const promise = req.createPaymentLink(<TPaymentLinkRequest>{});
  
      const result: TResponseBillingLink = await <Promise<TResponseBillingLink>>promise;
      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('RecurringPaymentRequest:createPaymentLink', async () => {
    const promise = req.createPaymentLink(
      <TPaymentLinkRequest>{
        merchantId,
        clientId: '8b40dfea-0baa-4616-8e82-007f2f100230',
        clientEmail: 'ererer@ww.ww',
        returnUrl: webhookUrl,
        webhookUrl
    });

    const result: TResponseBillingLink = await <Promise<TResponseBillingLink>>promise;
    //console.log('RecurringPaymentRequest:createPaymentLink', result);
    expect(result).toHaveProperty('merchantId');
    expect(result).toHaveProperty('clientId');
    expect(result).toHaveProperty('clientEmail');
    //expect(result).toHaveProperty('clientName');
    //expect(result).toHaveProperty('returnUrl');
    //expect(result).toHaveProperty('webhookUrl');
    expect(result).toHaveProperty('link');
  });

  it('RecurringPaymentRequest:getPaymentLinksByUser:error', async () => {
    try {
      const promise = req.getPaymentLinksByUser(<TPaymentLinksByUserRequest>{});
  
      const result: TResponseSubscriptionBillingLink[] = await <Promise<TResponseSubscriptionBillingLink[]>>promise;
      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('RecurringPaymentRequest:getPaymentLinksByUser', async () => {
    const promise = req.getPaymentLinksByUser(
      <TPaymentLinksByUserRequest>{
        merchantId,
        clientId: '123',
        clientEmail: 'ererer@ww.ww'
    });

    const result: TResponseSubscriptionBillingLink[] = await <Promise<TResponseSubscriptionBillingLink[]>>promise;
    billingLinks = result;
    //console.log('RecurringPaymentRequest:getPaymentLinksByUser', result);
    let item: TResponseSubscriptionBillingLink;
    for (item of result) {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('merchantId');
      expect(item).toHaveProperty('clientId');
      expect(item).toHaveProperty('clientEmail');
      //expect(item).toHaveProperty('clientName');
      expect(item).toHaveProperty('address');
      expect(item).toHaveProperty('currency');
      expect(item).toHaveProperty('network');
      expect(item).toHaveProperty('status');
      expect(item).toHaveProperty('createdAt');
      expect(item).toHaveProperty('updatedAt');
      expect(item).toHaveProperty('returnUrl');
      expect(item).toHaveProperty('webhookUrl');
    }
  });

  it('RecurringPaymentRequest:getPaymentLink:error', async () => {
    try {
      const promise = req.getPaymentLink('', merchantId);
  
      const result: TResponseSubscriptionBillingLink = await <Promise<TResponseSubscriptionBillingLink>>promise;
      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('RecurringPaymentRequest:getPaymentLink', async () => {
    const promise = req.getPaymentLink(billingLinks[billingLinks.length-1].id, merchantId);

    const result: TResponseSubscriptionBillingLink = await <Promise<TResponseSubscriptionBillingLink>>promise;
    //console.log('RecurringPaymentRequest:getPaymentLink', result);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('merchantId');
    expect(result).toHaveProperty('clientId');
    expect(result).toHaveProperty('clientEmail');
    //expect(result).toHaveProperty('clientName');
    expect(result).toHaveProperty('address');
    expect(result).toHaveProperty('currency');
    expect(result).toHaveProperty('network');
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('updatedAt');
    expect(result).toHaveProperty('returnUrl');
    expect(result).toHaveProperty('webhookUrl');
  });

  it('RecurringPaymentRequest:createSubscription', async () => {
    const promise = req.createSubscription(
      <TSubscriptionRequest>{
        merchantId,
        title: 'create subscription',
        spendInterval: -3,
        currency: 'USDT',
        amount: '5',
        webhookUrl,
        billingLinkId: billingLinks[0].id
    });

    const result: TResponseSubscription = await <Promise<TResponseSubscription>>promise;
    globalSubscription = result;
    //console.log('RecurringPaymentRequest:createSubscription', result);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('merchantId');
    expect(result).toHaveProperty('billingLinkId');
    expect(result).toHaveProperty('title');
    expect(result).toHaveProperty('description');
    expect(result).toHaveProperty('spendInterval');
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('currency');
    expect(result).toHaveProperty('amount');
    expect(result).toHaveProperty('webhookUrl');
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('updatedAt');
  });

  it('RecurringPaymentRequest:getSubscription', async () => {
    const promise = req.getSubscription(globalSubscription.id, merchantId);

    const result: TResponseSubscription = await <Promise<TResponseSubscription>>promise;
    //console.log('RecurringPaymentRequest:getSubscription', result);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('merchantId');
    expect(result).toHaveProperty('billingLinkId');
    expect(result).toHaveProperty('title');
    expect(result).toHaveProperty('description');
    expect(result).toHaveProperty('spendInterval');
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('currency');
    expect(result).toHaveProperty('amount');
    expect(result).toHaveProperty('webhookUrl');
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('updatedAt');
  });

  it('RecurringPaymentRequest:createPayment:error', async () => {
    try {
      const promise = req.createPayment(<TPaymentRequest>{});
  
      const result: TResponseRecurrentPayment = await <Promise<TResponseRecurrentPayment>>promise;
      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('RecurringPaymentRequest:createPayment', async () => {
    const promise = req.createPayment(
      <TPaymentRequest>{
        merchantId,
        billingLinkId: billingLinks[billingLinks.length-1].id,
        amount: '1',
        webhookUrl
    });

    const result: TResponseRecurrentPayment = await <Promise<TResponseRecurrentPayment>>promise;
    //console.log('RecurringPaymentRequest:createPayment', result);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('merchantId');
    expect(result).toHaveProperty('billingLinkId');
    expect(result).toHaveProperty('webhookUrl');
    expect(result).toHaveProperty('amount');
    //expect(result).toHaveProperty('tx');
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('updatedAt');
  });

  it('RecurringPaymentRequest:disablePaymentLink:error', async () => {
    try {
      const promise = req.disablePaymentLink('', merchantId);
  
      const result: TResponseDisableSubscriptionBillingLink = await <Promise<TResponseDisableSubscriptionBillingLink>>promise;
      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('RecurringPaymentRequest:disablePaymentLink', async () => {
    const promise = req.disablePaymentLink(billingLinks[billingLinks.length-1].id, merchantId);

    const result: TResponseDisableSubscriptionBillingLink = await <Promise<TResponseDisableSubscriptionBillingLink>>promise;
    //console.log('RecurringPaymentRequest:disablePaymentLink', result);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('merchantId');
    expect(result).toHaveProperty('currency');
    expect(result).toHaveProperty('network');
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('updatedAt');
  });

  it('RecurringPaymentRequest:cancelSubscription:error', async () => {
    try {
      const promise = req.cancelSubscription('', merchantId);
  
      const result: TResponseSubscription = await <Promise<TResponseSubscription>>promise;
      //console.log('RecurringPaymentRequest:cancelSubscription:error', result);
      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('RecurringPaymentRequest:cancelSubscription', async () => {
    const promise = req.cancelSubscription(globalSubscription.id, merchantId);

    const result: TResponseSubscription = await <Promise<TResponseSubscription>>promise;
    //console.log('RecurringPaymentRequest:cancelSubscription', result);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('merchantId');
    expect(result).toHaveProperty('billingLinkId');
    expect(result).toHaveProperty('title');
    expect(result).toHaveProperty('description');
    expect(result).toHaveProperty('spendInterval');
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('currency');
    expect(result).toHaveProperty('amount');
    expect(result).toHaveProperty('webhookUrl');
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('updatedAt');
  });
});
