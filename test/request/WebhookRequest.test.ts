import {config} from 'dotenv';
import axios, { Axios, AxiosRequestConfig } from 'axios';

import {CustomHeaderBuilder} from '../../lib/DataBuilder';
import { OCPAPIReturnType } from '../../lib/request/BaseClass';

import {TResponseWebhook, TWebhookFields, TResponseWebhookGetVerbose} from '../../lib/types/Webhook';

import WebhookRequest from '../../lib/request/WebhookRequest';

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

describe('WebhookRequest tests', ():void => {
  config();
  const publicKey: string = process.env.PUBLIC_KEY || '';
  const privateKey: string = process.env.PRIVATE_KEY || '';
  const remoteHost: string = process.env.REMOTE_HOST || '';
  const advancedBalanceId: string = process.env.ADVANCED_BALANCE_ID || '';

  const axiosInstance: Axios = axios.create(<AxiosRequestConfig>{...defaultAxiosOptions, baseURL: remoteHost});
  const headerBuilder:CustomHeaderBuilder = new CustomHeaderBuilder(publicKey, privateKey);
  const req = new WebhookRequest(axiosInstance, headerBuilder);

  it('WebhookRequest:constructor', ():void => {
    expect(req).toBeInstanceOf(WebhookRequest);
    expect(req).toHaveProperty('getWebhook');
    expect(req).toHaveProperty('getWebhookExt');
  });

  it('WebhookRequest:getWebhook', async () => {
    const promise = req.getWebhook('8822e35d-39b6-47c7-9b88-94fb2adc7e99');

    const result: TResponseWebhook = await <Promise<TResponseWebhook>>promise;
    //console.log('WebhookRequest:getWebhook', result);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('organizationId');
    expect(result).toHaveProperty('stage');
    expect(result).toHaveProperty('webhookId');
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('canWithdrawal');
    expect(result).toHaveProperty('createdAt');
  });

  it('WebhookRequest:getWebhookExt:error', async () => {
    try {
      const promise = req.getWebhookExt('');
  
      const result: TResponseWebhookGetVerbose = await <Promise<TResponseWebhookGetVerbose>>promise;
      //console.log('WebhookRequest:getWebhookExt:error', result);
      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('WebhookRequest:getWebhookExt', async () => {
    const promise = req.getWebhookExt('8822e35d-39b6-47c7-9b88-94fb2adc7e99');

    const result: TResponseWebhookGetVerbose = await <Promise<TResponseWebhookGetVerbose>>promise;
    //console.log('WebhookRequest:getWebhookExt', result);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('event');
    expect(result).toHaveProperty('eventId');
    expect(result).toHaveProperty('requestUrl');
    expect(result).toHaveProperty('requestHeaders');
    expect(result).toHaveProperty('requestBody');
    expect(result).toHaveProperty('responseCode');
    expect(result).toHaveProperty('responseStatus');
    expect(result).toHaveProperty('responseBody');
    expect(result).toHaveProperty('sentAt');
    expect(result).toHaveProperty('signature');
    expect(result).toHaveProperty('apiKey');
    expect(result).toHaveProperty('apiKeyAlias');
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('updatedAt');
  });

  it('WebhookRequest:getWebhookExt', async () => {
    const promise = req.getWebhookExt('8822e35d-39b6-47c7-9b88-94fb2adc7e99', ['event', 'eventId', 'requestUrl', 'responseCode', 'responseStatus']);

    const result: TResponseWebhookGetVerbose = await <Promise<TResponseWebhookGetVerbose>>promise;
    //console.log('WebhookRequest:getWebhookExt', result);
    expect(result).toHaveProperty('event');
    expect(result).toHaveProperty('eventId');
    expect(result).toHaveProperty('requestUrl');
    expect(result).toHaveProperty('responseCode');
    expect(result).toHaveProperty('responseStatus');
  });
});
