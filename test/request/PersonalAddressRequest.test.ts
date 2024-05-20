import {config} from 'dotenv';
import axios, { Axios, AxiosRequestConfig } from 'axios';

import {CustomHeaderBuilder} from '../../lib/DataBuilder';
import { OCPAPIReturnType } from '../../lib/request/BaseClass';

import { 
  TMerchantUserEntity, 
  TUserAddressRequest, 
  TPersonalAddressFilter, 
  TResponsePersonalUserSource, 
  TResponsePersonalAddress,
  TResponsePersonalAddresses
} from '../../lib/types/PersonalAddress';

import PersonalAddressRequest from '../../lib/request/PersonalAddressRequest';

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

describe('PersonalAddressRequest tests', ():void => {
  config();
  const publicKey: string = process.env.PUBLIC_KEY || '';
  const privateKey: string = process.env.PRIVATE_KEY || '';
  const remoteHost: string = process.env.REMOTE_HOST || '';
  const advancedBalanceId: string = process.env.ADVANCED_BALANCE_ID || '';

  const axiosInstance: Axios = axios.create(<AxiosRequestConfig>{...defaultAxiosOptions, baseURL: remoteHost});
  const headerBuilder:CustomHeaderBuilder = new CustomHeaderBuilder(publicKey, privateKey);
  const req = new PersonalAddressRequest(axiosInstance, headerBuilder);

  let globalUser: TResponsePersonalUserSource;

  it('PersonalAddressRequest:constructor', ():void => {
    expect(req).toBeInstanceOf(PersonalAddressRequest);
    expect(req).toHaveProperty('saveUser');
    expect(req).toHaveProperty('getAddress');
    expect(req).toHaveProperty('getListOfAddresses');
    expect(req).toHaveProperty('getUser');
  });

  it('PersonalAddressRequest:saveUser without addresses', async () => {
    const promise = req.saveUser(
      <TMerchantUserEntity>{
        clientId: '0x0d0d9ffdd',
        clientEmail: 'elzemik@yandex.com',
        clientName: 'Test Test',
        depositWebhookUrl: 'http://org.kg'
    });

    const result: TResponsePersonalUserSource = await <Promise<TResponsePersonalUserSource>>promise;
    //console.log('PersonalAddressRequest:saveUser', result);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('clientId');
    expect(result).toHaveProperty('clientEmail');
    expect(result).toHaveProperty('clientName');
    expect(result).toHaveProperty('depositWebhookUrl');
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('updatedAt');
    expect(result).not.toHaveProperty('addresses');
  });

  it('PersonalAddressRequest:saveUser with addresses', async () => {
    const promise = req.saveUser(
      <TMerchantUserEntity>{
        clientId: '0x0d0d9ffdd',
        clientEmail: 'aabdyraev9@yahoo.com',
        clientName: 'Test Test',
        depositWebhookUrl: 'http://org.kg',
        createAddresses: true
    });

    const result: TResponsePersonalUserSource = await <Promise<TResponsePersonalUserSource>>promise;
    globalUser = result;
    //console.log('PersonalAddressRequest:saveUser', result);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('clientId');
    expect(result).toHaveProperty('clientEmail');
    expect(result).toHaveProperty('clientName');
    expect(result).toHaveProperty('depositWebhookUrl');
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('updatedAt');
    expect(result).toHaveProperty('addresses');
  });

  it('PersonalAddressRequest:getListOfAddresses:error', async () => {
    try {
      const promise = req.getListOfAddresses(<TPersonalAddressFilter>{});
  
      const result: TResponsePersonalAddresses|undefined = await <Promise<TResponsePersonalAddresses|undefined>>promise;
      //console.log('PersonalAddressRequest:getListOfAddresses:error', result);
      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('PersonalAddressRequest:getListOfAddresses', async () => {
    const promise = req.getListOfAddresses(
      <TPersonalAddressFilter>{
        network: ['bsc', 'ethereum', 'polygon', 'tron'],
        limit: 50,
        offset: 0
    });

    const result: TResponsePersonalAddresses = await <Promise<TResponsePersonalAddresses>>promise;
    //console.log('PersonalAddressRequest:getListOfAddresses', result);
    globalUser.addresses = result.addresses;
    expect(result).toHaveProperty('total');
    expect(result).toHaveProperty('addresses');
    if (result.addresses?.length) {
      let item: TResponsePersonalAddress;
      for (item of result.addresses) {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('userId');
        expect(item).toHaveProperty('currency');
        expect(item).toHaveProperty('network');
        expect(item).toHaveProperty('address');
        expect(item).toHaveProperty('balance');
        expect(item).toHaveProperty('isActive');
      }
    }
  });

  it('PersonalAddressRequest:getAddress:error', async () => {
    try {
      const promise = req.getAddress(<TUserAddressRequest>{});
  
      const result: TResponsePersonalAddress|undefined = await <Promise<TResponsePersonalAddress|undefined>>promise;
      //console.log('PersonalAddressRequest:getAddress:error', result);
      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('PersonalAddressRequest:getAddress', async () => {
    const promise = req.getAddress(
      <TUserAddressRequest>{
        id: globalUser.id,
        currency: globalUser.addresses ? globalUser.addresses[0]?.currency : 'USDT',
        network: globalUser.addresses ? globalUser.addresses[0]?.network : 'bsc',
        renewAddress: true
    });

    const result: TResponsePersonalAddress = await <Promise<TResponsePersonalAddress>>promise;
    //console.log('PersonalAddressRequest:getAddress', result);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('userId');
    expect(result).toHaveProperty('currency');
    expect(result).toHaveProperty('network');
    expect(result).toHaveProperty('address');
    expect(result).toHaveProperty('balance');
    expect(result).toHaveProperty('isActive');
  });

  it('PersonalAddressRequest:getUser:error', async () => {
    try {
      const promise = req.getUser('', '');
  
      const result: TResponsePersonalUserSource|undefined = await <Promise<TResponsePersonalUserSource|undefined>>promise;
      //console.log('PersonalAddressRequest:getUser:error', result);
      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('PersonalAddressRequest:getUser', async () => {
    const promise = req.getUser(globalUser.id, globalUser.clientId);

    const result: TResponsePersonalUserSource = await <Promise<TResponsePersonalUserSource>>promise;
    //console.log('PersonalAddressRequest:getUser', result);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('clientId');
    expect(result).toHaveProperty('clientEmail');
    expect(result).toHaveProperty('clientName');
    expect(result).toHaveProperty('depositWebhookUrl');
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('updatedAt');
    // | expect(result).toHaveProperty('addresses');
  });
});
