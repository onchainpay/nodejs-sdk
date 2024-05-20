import {config} from 'dotenv';
import axios, { Axios, AxiosRequestConfig } from 'axios';

import {CustomHeaderBuilder} from '../../lib/DataBuilder';
import { OCPAPIReturnType } from '../../lib/request/BaseClass';
import { TCurrencies } from '../../lib/types/Base';
import {
  TInvoiceRequest, 
  TInvoiceFilter, 
  TResponseMakeInvoice, 
  TResponseGetInvoices
} from '../../lib/types/Invoice';
import InvoiceRequest from '../../lib/request/InvoiceRequest';

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

describe('InvoiceRequest tests', ():void => {
  config();
  const publicKey: string = process.env.PUBLIC_KEY || '';
  const privateKey: string = process.env.PRIVATE_KEY || '';
  const remoteHost: string = process.env.REMOTE_HOST || '';
  const advancedBalanceId: string = process.env.ADVANCED_BALANCE_ID || '';

  const axiosInstance: Axios = axios.create(<AxiosRequestConfig>{...defaultAxiosOptions, baseURL: remoteHost});
  const headerBuilder:CustomHeaderBuilder = new CustomHeaderBuilder(publicKey, privateKey);
  const req = new InvoiceRequest(axiosInstance, headerBuilder);
  let invoice: TResponseMakeInvoice;

  it('InvoiceRequest:constructor', ():void => {
    expect(req).toBeInstanceOf(InvoiceRequest);
    expect(req).toHaveProperty('makeInvoice');
    expect(req).toHaveProperty('getInvoice');
    expect(req).toHaveProperty('getListOfInvoices');
  });

  it('InvoiceRequest:makeInvoice', async () => {
    const promise = req.makeInvoice(
      <TInvoiceRequest>{
        advancedBalanceId,
        currency: 'USD',
        amount: '5',
        lifetime: 30,
        order: null,
        description: null,
        externalId: null,
        currencies: <TCurrencies[]>[]
    });

    const result: TResponseMakeInvoice = await <Promise<TResponseMakeInvoice>>promise;
    invoice = result;
    //console.log('InvoiceRequest:makeInvoice', result);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('advancedBalanceId');
    expect(result).toHaveProperty('externalId');
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('order');
    expect(result).toHaveProperty('orderId');
    expect(result).toHaveProperty('orderLink');
    expect(result).toHaveProperty('invoiceLink');
    expect(result).toHaveProperty('currencies');
    expect(result).toHaveProperty('description');
    expect(result).toHaveProperty('currency');
    expect(result).toHaveProperty('amount');
    expect(result).toHaveProperty('receivedNetwork');
    expect(result).toHaveProperty('receivedCurrency');
    expect(result).toHaveProperty('receivedAmount');
    expect(result).toHaveProperty('receivedAmountInInvoiceCurrency');
    expect(result).toHaveProperty('rate');
    expect(result).toHaveProperty('includeFee');
    expect(result).toHaveProperty('additionalFees');
    expect(result).toHaveProperty('insurancePercent');
    expect(result).toHaveProperty('slippagePercent');
    expect(result).toHaveProperty('webhookURL');
    //expect(result).toHaveProperty('returnUrl');
    expect(result).toHaveProperty('expiresAt');
    expect(result).toHaveProperty('createdAt');
  });

  it('InvoiceRequest:getInvoice:error', async () => {
    try {
      const promise = req.getInvoice('');
  
      const result: TResponseMakeInvoice = await <Promise<TResponseMakeInvoice>>promise;
      //console.log('InvoiceRequest:getInvoice:error', result);
      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('InvoiceRequest:getInvoice', async () => {
    const promise = req.getInvoice(invoice.id);

    const result: TResponseMakeInvoice = await <Promise<TResponseMakeInvoice>>promise;
    //console.log('InvoiceRequest:getInvoice', result);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('advancedBalanceId');
    expect(result).toHaveProperty('externalId');
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('order');
    expect(result).toHaveProperty('orderId');
    expect(result).toHaveProperty('orderLink');
    expect(result).toHaveProperty('invoiceLink');
    expect(result).toHaveProperty('currencies');
    expect(result).toHaveProperty('description');
    expect(result).toHaveProperty('currency');
    expect(result).toHaveProperty('amount');
    expect(result).toHaveProperty('receivedNetwork');
    expect(result).toHaveProperty('receivedCurrency');
    expect(result).toHaveProperty('receivedAmount');
    expect(result).toHaveProperty('receivedAmountInInvoiceCurrency');
    expect(result).toHaveProperty('rate');
    expect(result).toHaveProperty('includeFee');
    expect(result).toHaveProperty('additionalFees');
    expect(result).toHaveProperty('insurancePercent');
    expect(result).toHaveProperty('slippagePercent');
    expect(result).toHaveProperty('webhookURL');
    //expect(result).toHaveProperty('returnUrl');
    expect(result).toHaveProperty('expiresAt');
    expect(result).toHaveProperty('createdAt');
  });

  it('InvoiceRequest:getListOfInvoices:error', async () => {
    try {
      const promise = req.getListOfInvoices(<TInvoiceFilter>{});
  
      const result: TResponseGetInvoices = await <Promise<TResponseGetInvoices>>promise;
      //console.log('InvoiceRequest:getListOfInvoices:error', result);
      expect(result).toBeUndefined();
    } catch (exp) {
      expect(exp).toBeInstanceOf(Error);
    }
  });

  it('InvoiceRequest:getListOfInvoices', async () => {
    const promise = req.getListOfInvoices(<TInvoiceFilter>{
        status: null,
        limit: 50,
        offset: 0
    });

    const result: TResponseGetInvoices = await <Promise<TResponseGetInvoices>>promise;
    //console.log('InvoiceRequest:getListOfInvoices', result);
    expect(result).toHaveProperty('total');
    expect(result).toHaveProperty('invoices');

    let item: TResponseMakeInvoice;
    for (item of result.invoices) {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('advancedBalanceId');
      expect(item).toHaveProperty('externalId');
      expect(item).toHaveProperty('status');
      expect(item).toHaveProperty('order');
      expect(item).toHaveProperty('orderId');
      expect(item).toHaveProperty('orderLink');
      expect(item).toHaveProperty('invoiceLink');
      //expect(item).toHaveProperty('currencies');
      expect(item).toHaveProperty('description');
      expect(item).toHaveProperty('currency');
      expect(item).toHaveProperty('amount');
      expect(item).toHaveProperty('receivedNetwork');
      expect(item).toHaveProperty('receivedCurrency');
      expect(item).toHaveProperty('receivedAmount');
      expect(item).toHaveProperty('receivedAmountInInvoiceCurrency');
      expect(item).toHaveProperty('rate');
      expect(item).toHaveProperty('includeFee');
      expect(item).toHaveProperty('additionalFees');
      expect(item).toHaveProperty('insurancePercent');
      expect(item).toHaveProperty('slippagePercent');
      expect(item).toHaveProperty('webhookURL');
      //expect(item).toHaveProperty('returnUrl');
      expect(item).toHaveProperty('expiresAt');
      expect(item).toHaveProperty('createdAt');
    }
  });
});
