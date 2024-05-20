import { AxiosRequestConfig, AxiosResponse } from 'axios';

import BaseClass, { OCPAPIReturnType } from './BaseClass';
import { DataBuilder } from '../DataBuilder';

import { TNullableString } from '../types/Base';
import {
  TPartnersAPIOrganizationListRequest,
  TPartnersAPIReplenishmentOfUserBalanceRequest,
  TPartnersAPIIndividualTariffEntityRequest,
  TPartnersAPIKeyRequest,
  TPartnersAPIKeyListRequest,
  TPartnersAPIKeyDeleteRequest,
  TResponsePartnerUser, 
  TResponseGetPartnerUsers, 
  TResponseCreatedPartnerOrganization, 
  TResponseGetPartnerOrganization, 
  TResponsePartnerAdvancedBalancesSource,
  TResponsePartnerTariff, 
  TResponsePartnerCustomTariff, 
  TResponsePartnerApiKey, 
  TResponseGetPartnerApiKeys,
  // deletable type
  CreatedPartnerOrganizationResponse
} from '../types/PartnersAPI';
import { TPagination } from '../types/Base';

export default class PartnersAPIRequest extends BaseClass {

  createUser(email: string): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder({ email });
      this.headerBuilder.setData(data);
      const request = <AxiosRequestConfig>{
        method: 'POST',
        url: '/partner/api/create-user',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      };
      const res: AxiosResponse = await this.axiosInstance.request(request);

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponsePartnerUser;
    });
  }

  getUser(userId: string): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder({ id: userId });
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/partner/api/get-user',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponsePartnerUser;
    });
  }

  getUsers(req: TPagination): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder(req);
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/partner/api/get-users',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseGetPartnerUsers;
    });
  }

  createOrganization(userId: string, name: string): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder({ userId, name });
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/partner/api/create-user-organization',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }
      // restorable string
      // return response as TResponseCreatedPartnerOrganization;
      // deletable string
      return response.result ? response as CreatedPartnerOrganizationResponse : response as TResponseCreatedPartnerOrganization;

    });
  }

  getOrganizations(req: TPartnersAPIOrganizationListRequest): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder(req);
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/partner/api/get-user-organizations',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseGetPartnerOrganization[];
    });
  }

  getUserBalances(userId: string): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder({ userId });
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/partner/api/get-organization-advanced-balances',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;
      console.log('/partner/api/get-organization-advanced-balances', {userId, success, response, error});
      if (error) {
        throw new Error(error.message);
      }

      return response as TResponsePartnerAdvancedBalancesSource[];
    });
  }

  replenishmentOfUserBalance(req: TPartnersAPIReplenishmentOfUserBalanceRequest): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder(req);
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/partner/api/top-up-advanced-balance',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;
      console.log('/partner/api/top-up-advanced-balance', {req, success, response, error});
      if (error) {
        throw new Error(error.message);
      }

      return response as TResponsePartnerAdvancedBalancesSource;
    });
  }

  getGeneralTariffs(): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder();
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/partner/api/get-default-tariffs',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponsePartnerTariff[];
    });
  }

  saveIndividualTariff(req: TPartnersAPIIndividualTariffEntityRequest): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder(req);
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/partner/api/set-organization-tariff',
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

  getIndividualTariffs(userId: TNullableString = null, organizationId: TNullableString = null): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder({ userId, organizationId });
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/partner/api/get-organization-tariffs',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponsePartnerCustomTariff[];
    });
  }

  createAPIkey(req: TPartnersAPIKeyRequest): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder(req);
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/partner/api/create-api-keys',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponsePartnerApiKey;
    });
  }

  getAPIkeys(req: TPartnersAPIKeyListRequest): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder(req);
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/partner/api/get-api-keys',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseGetPartnerApiKeys;
    });
  }

  deleteAPIkeys(req: TPartnersAPIKeyDeleteRequest): OCPAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder(req);
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/partner/api/delete-api-keys',
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
}
