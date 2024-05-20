import { AxiosRequestConfig, AxiosResponse } from 'axios';

import BaseClass, { OCPAPIReturnType } from './BaseClass';
import { DataBuilder } from '../DataBuilder';

import { 
  TCrosschainExchangeCommissionToken, 
  TCrosschainExchangeRequest, 
  TResponseCrosschainExchangeLimit, 
  TResponseCrosschainExchange, 
  TResponseCrosschainExchangeFeeToken 
} from '../types/CrosschainSwap';

export default class CrosschainSwapRequest extends BaseClass {

  getCrosschainExchangeLimits(): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder();
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/swaps/limit',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseCrosschainExchangeLimit;
    });
  }

  getCrosschainExchangeInfo(id: string): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder({ id });
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/swaps/get',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseCrosschainExchange;
    });
  }

  getCrosschainExchangeCommissionToken(req: TCrosschainExchangeCommissionToken): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder(req);
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/swaps/fee-token',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseCrosschainExchangeFeeToken;
    });
  }

  createCrosschainExchange(req: TCrosschainExchangeRequest): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder(req);
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/swaps/create',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseCrosschainExchange;
    });
  }
}
