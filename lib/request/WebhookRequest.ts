import { AxiosRequestConfig, AxiosResponse } from 'axios';

import BaseClass, { OCPAPIReturnType } from './BaseClass';
import { DataBuilder } from '../DataBuilder';

import { TWebhookFields, TResponseWebhook, TResponseWebhookGetVerbose } from '../types/Webhook';

export default class WebhookRequest extends BaseClass {

  getWebhook(webhookId: string) {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder({ webhookId });
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/webhooks/get',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseWebhook;
    });
  }

  getWebhookExt(webhookId: string, fields: TWebhookFields[] | undefined = undefined) {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder({ webhookId, fields });
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/webhooks/get-verbose',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseWebhookGetVerbose;
    });
  }
}
