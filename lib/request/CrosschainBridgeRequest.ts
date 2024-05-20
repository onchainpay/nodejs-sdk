import { AxiosRequestConfig, AxiosResponse } from 'axios';

import BaseClass, { OCPAPIReturnType } from './BaseClass';
import { DataBuilder } from '../DataBuilder';

import { 
  TCrosschainTransferCommissionToken, 
  TCrosschainTransferRequest, 
  TResponseCrosschainBridgeLimit, 
  TResponseCrosschainBridge, 
  TResponseCrosschainBridgeFeeToken 
} from '../types/CrosschainBridge';

export default class CrosschainBridgeRequest extends BaseClass {

  getCrosschainTransferLimits(): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder();
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/bridge/limit',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseCrosschainBridgeLimit;
    });
  }

  getCrosschainTransferInfo(id: string): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder({ id });
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/bridge/get',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseCrosschainBridge;
    });
  }

  getCrosschainTransferCommissionToken(req: TCrosschainTransferCommissionToken): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder(req);
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/bridge/fee-token',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseCrosschainBridgeFeeToken;
    });
  }

  createCrosschainTransfer(req: TCrosschainTransferRequest): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder(req);
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/bridge/create',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error, requestId } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseCrosschainBridge;
    });
  }
}
