import {config} from 'dotenv';
import axios, { Axios, AxiosRequestConfig } from 'axios';

import {CustomHeaderBuilder} from '../../lib/DataBuilder';
import AddressRequest from '../../lib/request/AddressRequest';
import { 
  TNewAddressEntity, 
  TExistingAddressEntity, 
  TAddressPagination, 
  TResponseAddressBookRecord, 
  TResponseGetListOfAddresses
} from '../../lib/types/Address';
//import supertest from 'supertest';

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

describe('AddressRequest tests', ():void => {
  config();
  const publicKey: string = process.env.PUBLIC_KEY || '';
  const privateKey: string = process.env.PRIVATE_KEY || '';
  const remoteHost: string = process.env.REMOTE_HOST || '';

  const axiosInstance: Axios = axios.create(<AxiosRequestConfig>{...defaultAxiosOptions, baseURL: remoteHost});
  const headerBuilder:CustomHeaderBuilder = new CustomHeaderBuilder(publicKey, privateKey);
  const req = new AddressRequest(axiosInstance, headerBuilder);
  const addressBookIds: string[] = [];

  it('AddressRequest:constructor', ():void => {
    expect(req).toBeInstanceOf(AddressRequest);
    expect(req).toHaveProperty('addAddress');
    expect(req).toHaveProperty('deleteAddress');
    expect(req).toHaveProperty('updateAddress');
    expect(req).toHaveProperty('getListOfAddresses');
  });

  it('AddressRequest:addAddress empty', async () => {
    try {
      const promise = req.addAddress(<TNewAddressEntity>{});
    
      const result = await <Promise<TResponseAddressBookRecord>>promise;
      addressBookIds.push(<string>result.id);
      //console.log('AddressRequest:addAddress empty', result);
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('networks');
      expect(result).toHaveProperty('address');
      expect(result).toHaveProperty('alias');
      expect(result).toHaveProperty('comment');
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('AddressRequest:addAddress', async () => {
    const promise = req.addAddress(
      <TNewAddressEntity>{
        address: '1CGuTUAx7icKniPVKGiyiT7QLycpkxULLP', 
        alias: 'MyTestAlias', 
        comment: 'MyTestAlias address', 
        networks: ['ethereum', 'bsc', 'tron']
    });

    const result = await <Promise<TResponseAddressBookRecord>>promise;
    addressBookIds.push(<string>result.id);
    //console.log('AddressRequest:addAddress', result);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('networks');
    expect(result).toHaveProperty('address');
    expect(result).toHaveProperty('alias');
    expect(result).toHaveProperty('comment');
  });

  it('AddressRequest:deleteAddress empty', async () => {
    try {
      const promise = req.deleteAddress('');
  
      const result = await <Promise<boolean>>promise;
  
      expect(result).toBe(false);
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('AddressRequest:deleteAddress', async () => {
    const promise = req.deleteAddress(addressBookIds[addressBookIds.length-1]);

    const result = await <Promise<boolean>>promise;

    expect(result).toBe(true);
  });

  it('AddressRequest:updateAddress empty', async () => {
    try {
      const promise = req.updateAddress(<TExistingAddressEntity>{});
  
      const result:boolean = await <Promise<boolean>>promise;
  
      expect(result).toBe(false);
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('AddressRequest:updateAddress', async () => {
    const promise = req.updateAddress(
      <TExistingAddressEntity>{
        addressId: addressBookIds[addressBookIds.length-1], 
        alias: addressBookIds[addressBookIds.length-1], 
        comment: addressBookIds[addressBookIds.length-1]
    });

    const result: boolean = await <Promise<boolean>>promise;
    //console.log('AddressRequest:updateAddress', addressBookIds);
    expect(result).toBe(true);
  });

  it('AddressRequest:getListOfAddresses empty params', async () => {
    const promise = req.getListOfAddresses(<TAddressPagination>{});

    const result: TResponseGetListOfAddresses = await <Promise<TResponseGetListOfAddresses>>promise;
    //console.log('AddressRequest:getListOfAddresses empty params', result);
    expect(result).toHaveProperty('addresses');
    expect(result).toHaveProperty('count');
    expect(result).toHaveProperty('countPages');
    expect(result).toHaveProperty('limit');
    expect(result).toHaveProperty('page');
  
    let addressItem: TResponseAddressBookRecord;
    for (addressItem of result.addresses) {
      expect(addressItem).toHaveProperty('id');
      expect(addressItem).toHaveProperty('networks');
      expect(addressItem).toHaveProperty('address');
      expect(addressItem).toHaveProperty('alias');
      expect(addressItem).toHaveProperty('comment');
    }
  });

  it('AddressRequest:getListOfAddresses without networks', async () => {
    const promise = req.getListOfAddresses(<TAddressPagination>{page: 1, limit: 50, networks: null});

    const result: TResponseGetListOfAddresses = await <Promise<TResponseGetListOfAddresses>>promise;
    //console.log('AddressRequest:getListOfAddresses without networks', result);
    expect(result).toHaveProperty('addresses');
    expect(result).toHaveProperty('count');
    expect(result).toHaveProperty('countPages');
    expect(result).toHaveProperty('limit');
    expect(result).toHaveProperty('page');

    let addressItem: TResponseAddressBookRecord;
    for (addressItem of result.addresses) {
      expect(addressItem).toHaveProperty('id');
      expect(addressItem).toHaveProperty('networks');
      expect(addressItem).toHaveProperty('address');
      expect(addressItem).toHaveProperty('alias');
      expect(addressItem).toHaveProperty('comment');
    }
  });
});
