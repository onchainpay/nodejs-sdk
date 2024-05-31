import { AxiosRequestConfig, AxiosResponse } from 'axios';

import BaseClass, { OCPAPIReturnType } from './BaseClass';
import { DataBuilder } from '../DataBuilder';

import { 
  TOrphanTrxListRequest, 
  TOrphanTrxCommissionToken, 
  TResponseOrphanDeposit, 
  TResponseOrphanWithdrawalToken, 
  TResponseOrphan 
} from '../types/OrphanTransaction';

export default class OrphanTransactionRequest extends BaseClass {

  getTransaction(id: string) {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder({ id });
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/orphan-deposits/get-deposit',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseOrphanDeposit;
    });
  }

  getListOfTransaction(req: TOrphanTrxListRequest) {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder(req);
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/orphan-deposits/get-deposits',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseOrphanDeposit[];
    });
  }

  getCommissionToken(id: string) {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder({ id });
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/orphan-deposits/withdrawal-token',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseOrphanWithdrawalToken;
    });
  }

  withdrawal(req: TOrphanTrxCommissionToken) {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder(req);
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/orphan-deposits/withdrawal',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseOrphan;
    });
  }
}
