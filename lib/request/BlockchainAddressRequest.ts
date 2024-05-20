import { AxiosRequestConfig, AxiosResponse } from 'axios';

import BaseClass, { OCPAPIReturnType } from './BaseClass';
import { DataBuilder } from '../DataBuilder';

import { 
  TBlockchainTrxByAddressFilter, 
  TBusinessWalletAddress, 
  TResponseBlockchainAddress, 
  TResponseTrackedAddress, 
  TResponseAddressTransactions, 
  TResponsePayInAddresses, 
  TResponseBusinessAddresses, 
  TResponseRecurrentAddresses, 
  TResponsePayOutAddresses,
  TResponseExtendedAddress
} from '../types/BlockchainAddress';

export default class BlockchainAddressRequest extends BaseClass {
  searchById(id: string): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder({ id });
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/addresses/find-by-id',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseBlockchainAddress | null;
    });
  }

  addTrackingAddress(address: string, webhookUrl: string): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder({ address, webhookUrl });
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/track-addresses/add-address',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseTrackedAddress;
    });
  }

  searchByAddress(address: string): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder({ address });
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/addresses/find-by-address',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseBlockchainAddress[];
    });
  }

  setMetaData(id: string, meta: Object | String | null): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder({ id, meta });
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/addresses/set-meta',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return success;
    });
  }

  getAddressTransactions(req: TBlockchainTrxByAddressFilter): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder(req);
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/addresses/transactions',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;
      //console.log('getAddressTransactions', {success, error, response});
      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseAddressTransactions;
    });
  }

  getListOfPayInAddresses(advancedBalanceId: string): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder({ advancedBalanceId });
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/account-addresses',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponsePayInAddresses;
    });
  }

  getListOfBusinessAddresses(advancedBalanceId: string): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder({ advancedBalanceId });
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/business-addresses',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseBusinessAddresses;
    });
  }

  getListOfRecurrentAddresses(advancedBalanceId: string): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder({ advancedBalanceId });
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/recurrent-addresses',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseRecurrentAddresses;
    });
  }

  getListOfPayOutAddresses(advancedBalanceId: string): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder({ advancedBalanceId });
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/payout-balances',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponsePayOutAddresses;
    });
  }

  createBusinessWalletAddress(req: TBusinessWalletAddress): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder(req);
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/business-address',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }
      //console.log('createBusinessWalletAddress', response);
      return response as TResponseBusinessAddresses|TResponseExtendedAddress;
    });
  }

  createPayOutWalletAddress(currency: string, network: string): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder({ currency, network });
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/payout-address',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }
      //console.log('createPayOutWalletAddress', response);
      return response as TResponsePayOutAddresses|TResponseExtendedAddress;
    });
  }
}
