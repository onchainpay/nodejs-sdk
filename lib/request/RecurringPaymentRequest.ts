import { AxiosRequestConfig, AxiosResponse } from 'axios';

import BaseClass, { OCPAPIReturnType } from './BaseClass';
import { DataBuilder } from '../DataBuilder';

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
} from '../types/RecurringPayment';

export default class RecurringPaymentRequest extends BaseClass {
  createPaymentLink(req: TPaymentLinkRequest): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder(req);
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/recurrents/create-subscriber-billing-link',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseBillingLink;
    });
  }

  getPaymentLink(id: string, merchantId: string): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder({ id, merchantId });
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/recurrents/get-billing-link',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseSubscriptionBillingLink;
    });
  }

  getPaymentLinksByUser(req: TPaymentLinksByUserRequest): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder(req);
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/recurrents/get-billing-links-by-subscriber',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseSubscriptionBillingLink[];
    });
  }

  disablePaymentLink(id: string, merchantId: string): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder({ id, merchantId });
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/recurrents/disable-subscriber-billing-link',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseDisableSubscriptionBillingLink;
    });
  }

  createSubscription(req: TSubscriptionRequest): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder(req);
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/recurrents/create-subscription',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseSubscription;
    });
  }
 
  getSubscription(id: string, merchantId: string): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder({ id, merchantId });
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/recurrents/get-subscription',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseSubscription;
    });
  }

  cancelSubscription(id: string, merchantId: string): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder({ id, merchantId });
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/recurrents/cancel-subscription',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseSubscription;
    });
  }

  createPayment(req: TPaymentRequest): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder(req);
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/recurrents/make-payment',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseRecurrentPayment;
    });
  }
}
