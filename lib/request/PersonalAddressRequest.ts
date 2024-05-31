import { AxiosRequestConfig, AxiosResponse } from 'axios';

import BaseClass, { OCPAPIReturnType } from './BaseClass';
import { DataBuilder } from '../DataBuilder';

import { TNullableString } from '../types/Base';
import { 
  TMerchantUserEntity, 
  TUserAddressRequest, 
  TPersonalAddressFilter, 
  TResponsePersonalUserSource, 
  TResponsePersonalAddress,
  TResponsePersonalAddresses
} from '../types/PersonalAddress';

export default class PersonalAddressRequest extends BaseClass {

  saveUser(req: TMerchantUserEntity) {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder(req);
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/personal-addresses/create-user',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponsePersonalUserSource;
    });
  }

  getAddress(req: TUserAddressRequest) {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder(req);
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/personal-addresses/get-user-address',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponsePersonalAddress;
    });
  }

  getListOfAddresses(req: TPersonalAddressFilter) {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder(req);
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/personal-addresses/get-user-addresses',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponsePersonalAddresses;
    });
  }

  getUser(id: TNullableString = null, clientId: TNullableString = null) {
    return this.exceptionWrapper(async () => {
      if (!clientId && !id) {
        throw new Error('Need to pass UserId or ClientId');
      }

      const data: DataBuilder = new DataBuilder({ id, clientId });
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/personal-addresses/get-user',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponsePersonalUserSource;
    });
  }
}
