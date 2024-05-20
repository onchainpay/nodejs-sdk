import {config} from 'dotenv';
import axios, { Axios, AxiosRequestConfig } from 'axios';

import {CustomHeaderBuilder} from '../../lib/DataBuilder';
import { OCPAPIReturnType } from '../../lib/request/BaseClass';

import {TPagination} from '../../lib/types/Base';
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
  // deletable string
  CreatedPartnerOrganizationResponse
} from '../../lib/types/PartnersAPI';

import PartnersAPIRequest from '../../lib/request/PartnersAPIRequest';

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

let globalUser: TResponsePartnerUser, 
globalUserList: TResponsePartnerUser[],
globalOrganization: TResponseCreatedPartnerOrganization,
globalAPIKey: TResponsePartnerApiKey,
globalUserBalance: TResponsePartnerAdvancedBalancesSource,
globalUserId: string;

describe('PartnersAPIRequest tests', ():void => {
  config();
  const publicKey: string = process.env.PARTNER_PUBLIC_KEY || '';
  const privateKey: string = process.env.PARTNER_PRIVATE_KEY || '';
  const remoteHost: string = process.env.REMOTE_HOST || '';
  const advancedBalanceId: string = process.env.ADVANCED_BALANCE_ID || '';

  const axiosInstance: Axios = axios.create(<AxiosRequestConfig>{...defaultAxiosOptions, baseURL: remoteHost});
  const headerBuilder:CustomHeaderBuilder = new CustomHeaderBuilder(publicKey, privateKey);
  const req = new PartnersAPIRequest(axiosInstance, headerBuilder);

  it('PartnersAPIRequest:constructor', ():void => {
    expect(req).toBeInstanceOf(PartnersAPIRequest);
    expect(req).toHaveProperty('createUser');
    expect(req).toHaveProperty('getUser');
    expect(req).toHaveProperty('getUsers');
    expect(req).toHaveProperty('createOrganization');
    expect(req).toHaveProperty('getOrganizations');
    expect(req).toHaveProperty('getUserBalances');
    expect(req).toHaveProperty('replenishmentOfUserBalance');
    expect(req).toHaveProperty('getGeneralTariffs');
    expect(req).toHaveProperty('saveIndividualTariff');
    expect(req).toHaveProperty('getIndividualTariffs');
    expect(req).toHaveProperty('createAPIkey');
    expect(req).toHaveProperty('getAPIkeys');
    expect(req).toHaveProperty('deleteAPIkeys');
  });

  it('PartnersAPIRequest:getUsers:error', async () => {
    try {
      const promise = req.getUsers(<TPagination>{});
  
      const result: TResponseGetPartnerUsers = await <Promise<TResponseGetPartnerUsers>>promise;
      expect(result).toHaveProperty('total');
      expect(result).toHaveProperty('users');
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('PartnersAPIRequest:getUsers', async () => {
    const promise = req.getUsers(
      <TPagination>{
        limit: 100,
        offset: 1,
        page: 1
    });

    const result: TResponseGetPartnerUsers = await <Promise<TResponseGetPartnerUsers>>promise;
    ////console.log('PartnersAPIRequest:getUsers', result);
    globalUserList = result.users;
    expect(result).toHaveProperty('total');
    expect(result).toHaveProperty('users');
    let item: TResponsePartnerUser;
    for (item of result.users) {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('email');
      expect(item).toHaveProperty('createdAt');
      expect(item).toHaveProperty('updatedAt');
      expect(item).toHaveProperty('confirmedAt');
    }
  });

  it('PartnersAPIRequest:createUser:error', async () => {
    try {
      const promise = req.createUser('');
  
      const result: TResponsePartnerUser = await <Promise<TResponsePartnerUser>>promise;
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('email');
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('PartnersAPIRequest:createUser:error:userExists', async () => {
    try {
      const promise = req.createUser('small.zemik@gmail.com');
  
      const result: TResponsePartnerUser = await <Promise<TResponsePartnerUser>>promise;
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('email');
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('PartnersAPIRequest:createUser', async () => {
    const promise = req.createUser('aabdyraev7@yahoo.com');

    const result: TResponsePartnerUser = await <Promise<TResponsePartnerUser>>promise;
    ////console.log('PartnersAPIRequest:createUser', result);
    globalUser = result;
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('email');
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('updatedAt');
    expect(result).toHaveProperty('confirmedAt');
  });

  it('PartnersAPIRequest:getUser:error', async () => {
    try {
      const promise = req.getUser('');
  
      const result: TResponsePartnerUser = await <Promise<TResponsePartnerUser>>promise;
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('email');
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('PartnersAPIRequest:getUser', async () => {
    const promise = req.getUser(globalUser?.id || globalUserList[globalUserList.length-1]?.id);

    const result: TResponsePartnerUser = await <Promise<TResponsePartnerUser>>promise;
    ////console.log('PartnersAPIRequest:getUser', result);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('email');
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('updatedAt');
    expect(result).toHaveProperty('confirmedAt');
  });

  it('PartnersAPIRequest:createOrganization:error', async () => {
    try {
      const promise = req.createOrganization('', '');
  
      const result: TResponseCreatedPartnerOrganization = await <Promise<TResponseCreatedPartnerOrganization>>promise;
      expect(result).toBeInstanceOf(String);
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('PartnersAPIRequest:createOrganization', async () => {
    const promise = req.createOrganization(globalUser?.id || globalUserList[globalUserList.length-1]?.id, 'Another one organization');
    // restorable string above
    //const result: TResponseCreatedPartnerOrganization = await <Promise<TResponseCreatedPartnerOrganization>>promise;
    // deletable string above
    let response: TResponseCreatedPartnerOrganization | CreatedPartnerOrganizationResponse = await <Promise<TResponseCreatedPartnerOrganization | CreatedPartnerOrganizationResponse>>promise;
    let result: TResponseCreatedPartnerOrganization;
    //console.log('PartnersAPIRequest:createOrganization', response);
    // restorable string above
    //globalOrganization = result;
    // deletable string above
    if ((<CreatedPartnerOrganizationResponse>response).result) {
      globalOrganization = result = (response as CreatedPartnerOrganizationResponse).result;
    } else {
      globalOrganization = result = <TResponseCreatedPartnerOrganization>response;  
    }
    //console.log('PartnersAPIRequest:createOrganization:result', result);
    expect(result).toMatch(/^[a-z\d]{4,12}\-[a-z\d]{4,12}\-[a-z\d]{4,12}\-[a-z\d]{4,12}\-[a-z\d]{4,12}$/);
  });

  it('PartnersAPIRequest:getOrganizations:error', async () => {
    try {
      const promise = req.getOrganizations(<TPartnersAPIOrganizationListRequest>{});
  
      const result: TResponseGetPartnerOrganization[] = await <Promise<TResponseGetPartnerOrganization[]>>promise;
      expect(result).toBeInstanceOf(String);
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('PartnersAPIRequest:getOrganizations', async () => {
    const promise = req.getOrganizations(
      <TPartnersAPIOrganizationListRequest>{
        limit: 50,
        offset: 0,
        userId: globalUser?.id || globalUserList[globalUserList.length-1]?.id
    });

    const result: TResponseGetPartnerOrganization[] = await <Promise<TResponseGetPartnerOrganization[]>>promise;
    //console.log('PartnersAPIRequest:getOrganizations', result);
    let item: TResponseGetPartnerOrganization;
    for (item of result) {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('createdAt');
    }
  });

  it('PartnersAPIRequest:getUserBalances:error', async () => {
    try {
      const promise = req.getUserBalances('');
  
      const result: TResponsePartnerAdvancedBalancesSource[] = await <Promise<TResponsePartnerAdvancedBalancesSource[]>>promise;
      expect(result).toHaveProperty('length');
      let item: TResponsePartnerAdvancedBalancesSource;
      for (item of result) {
        expect(item).toHaveProperty('advancedBalanceId');
      }
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('PartnersAPIRequest:getUserBalances', async () => {
    globalUserId = globalUser?.id || globalUserList[globalUserList.length-1]?.id;
    const promise = req.getUserBalances(globalUserId);

    const result: TResponsePartnerAdvancedBalancesSource[] = await <Promise<TResponsePartnerAdvancedBalancesSource[]>>promise;
    console.log('PartnersAPIRequest:getUserBalances', result);

    let item: TResponsePartnerAdvancedBalancesSource;
    for (item of result) {
      expect(item).toHaveProperty('advancedBalanceId');
      expect(item).toHaveProperty('currency');
      expect(item).toHaveProperty('blocked');
      expect(item).toHaveProperty('blockReason');
      expect(item).toHaveProperty('balance');
      expect(item).toHaveProperty('availableCurrenciesForDeposit');
    }

    globalUserBalance = result[result.length-1];
  });

  it('PartnersAPIRequest:replenishmentOfUserBalance:error', async () => {
    try {
      const promise = req.replenishmentOfUserBalance(<TPartnersAPIReplenishmentOfUserBalanceRequest>{});
  
      const result: TResponsePartnerAdvancedBalancesSource = await <Promise<TResponsePartnerAdvancedBalancesSource>>promise;
      expect(result).toHaveProperty('advancedBalanceId');
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('PartnersAPIRequest:replenishmentOfUserBalance', async () => {
    const promise = req.replenishmentOfUserBalance(
      <TPartnersAPIReplenishmentOfUserBalanceRequest>{
        userId: globalUser?.id || globalUserList[globalUserList.length-1].id,
        organizationId: globalOrganization,
        advancedBalanceId: globalUserBalance.advancedBalanceId,
        amount: '5'
    });

    const result: TResponsePartnerAdvancedBalancesSource = await <Promise<TResponsePartnerAdvancedBalancesSource>>promise;
    console.log('PartnersAPIRequest:replenishmentOfUserBalance', result);
    expect(result).toHaveProperty('advancedBalanceId');
    expect(result).toHaveProperty('currency');
    expect(result).toHaveProperty('blocked');
    expect(result).toHaveProperty('blockReason');
    expect(result).toHaveProperty('balance');
    expect(result).toHaveProperty('availableCurrenciesForDeposit');
  });

  it('PartnersAPIRequest:getGeneralTariffs', async () => {
    const promise = req.getGeneralTariffs();

    const result: TResponsePartnerTariff[] = await <Promise<TResponsePartnerTariff[]>>promise;
    //console.log('PartnersAPIRequest:getGeneralTariffs', result);
    let item: TResponsePartnerTariff;
    for (item of result) {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('action');      
      expect(item).toHaveProperty('amount');
      expect(item).toHaveProperty('type');
      expect(item).toHaveProperty('minAmount');
      expect(item).toHaveProperty('maxAmount');
    }
  });

  it('PartnersAPIRequest:saveIndividualTariff:error', async () => {
    try {
      const promise = req.saveIndividualTariff(<TPartnersAPIIndividualTariffEntityRequest>{});
  
      const result: boolean = await <Promise<boolean>>promise;
      expect(result).toBe(true);
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('PartnersAPIRequest:saveIndividualTariff', async () => {
    const promise = req.saveIndividualTariff(
      <TPartnersAPIIndividualTariffEntityRequest>{
        userId: globalUser?.id || globalUserList[globalUserList.length-1]?.id,
        organizationId: globalOrganization,
        action: 'WALLET_DEPOSIT',
        amount: '1',
        type: 'FIXED'
    });

    const result: boolean = await <Promise<boolean>>promise;
    //console.log('PartnersAPIRequest:saveIndividualTariff', result);
    expect(result).toBe(true);
  });

  it('PartnersAPIRequest:getIndividualTariffs:error', async () => {
    try {
      const promise = req.getIndividualTariffs('', '');
  
      const result: TResponsePartnerCustomTariff[] = await <Promise<TResponsePartnerCustomTariff[]>>promise;
      let item: TResponsePartnerCustomTariff;
      for (item of result) {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('action');
        expect(item).toHaveProperty('amount');
        expect(item).toHaveProperty('type');
      }
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('PartnersAPIRequest:getIndividualTariffs', async () => {
    const promise = req.getIndividualTariffs(globalUser?.id || globalUserList[globalUserList.length-1]?.id, globalOrganization);

    const result: TResponsePartnerCustomTariff[] = await <Promise<TResponsePartnerCustomTariff[]>>promise;
    //console.log('PartnersAPIRequest:getIndividualTariffs', result);
    let item: TResponsePartnerCustomTariff;
    for (item of result) {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('action');
      expect(item).toHaveProperty('amount');
      expect(item).toHaveProperty('type');
      expect(item).toHaveProperty('minAmount');
      expect(item).toHaveProperty('maxAmount');
      expect(item).toHaveProperty('comment');
      expect(item).toHaveProperty('createdAt');
      expect(item).toHaveProperty('updatedAt');
    }
  });

  it('PartnersAPIRequest:createAPIkey:error', async () => {
    try {
      const promise = req.createAPIkey(<TPartnersAPIKeyRequest>{});
  
      const result: TResponsePartnerApiKey = await <Promise<TResponsePartnerApiKey>>promise;
      expect(result).toHaveProperty('id');
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('PartnersAPIRequest:createAPIkey', async () => {
    const promise = req.createAPIkey(<TPartnersAPIKeyRequest>{
      userId: globalUser?.id || globalUserList[globalUserList.length-1]?.id,
      organizationId: globalOrganization,
      alias: 'MyIndividualAPIKey' + globalOrganization
    });

    const result: TResponsePartnerApiKey = await <Promise<TResponsePartnerApiKey>>promise;
    //console.log('PartnersAPIRequest:createAPIkey', result);
    globalAPIKey = result;
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('public');
    expect(result).toHaveProperty('secret');
    expect(result).toHaveProperty('alias');
    expect(result).toHaveProperty('createdAt');
  });

  it('PartnersAPIRequest:getAPIkeys:error', async () => {
    try {
      const promise = req.getAPIkeys(<TPartnersAPIKeyListRequest>{});
  
      const result: TResponseGetPartnerApiKeys = await <Promise<TResponseGetPartnerApiKeys>>promise;
      expect(result).toHaveProperty('total');
      expect(result).toHaveProperty('keys');
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('PartnersAPIRequest:getAPIkeys', async () => {
    const promise = req.getAPIkeys(
      <TPartnersAPIKeyListRequest>{
        userId: globalUser?.id || globalUserList[globalUserList.length-1]?.id,
        organizationId: globalOrganization,
        limit: 50,
        offset: 0
    });

    const result: TResponseGetPartnerApiKeys = await <Promise<TResponseGetPartnerApiKeys>>promise;
    //console.log('PartnersAPIRequest:getAPIkeys', result);
    expect(result).toHaveProperty('total');
    expect(result).toHaveProperty('keys');
    let item: TResponsePartnerApiKey;
    for (item of result.keys) {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('public');
      expect(item).toHaveProperty('secret');
      expect(item).toHaveProperty('alias');
      expect(item).toHaveProperty('createdAt');
    }
  });

  it('PartnersAPIRequest:deleteAPIkeys:error', async () => {
    try {
      const promise = req.deleteAPIkeys(<TPartnersAPIKeyDeleteRequest>{});
  
      const result: boolean = await <Promise<boolean>>promise;
      expect(result).toBe(true);
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('PartnersAPIRequest:deleteAPIkeys', async () => {
    const promise = req.deleteAPIkeys(<TPartnersAPIKeyDeleteRequest>{
      userId: globalUser?.id || globalUserList[globalUserList.length-1]?.id,
      organizationId: globalOrganization,
      keyId: globalAPIKey.id
    });

    const result: boolean = await <Promise<boolean>>promise;
    console.log('PartnersAPIRequest:deleteAPIkeys', result);
    expect(result).toBe(true);
  });
});
