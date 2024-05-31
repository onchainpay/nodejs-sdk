import { TNullableString, TCurrencies } from './Base'

export type TInvoiceStatus = 'CREATED' | 'INIT' | 'PENDING' | 'PROCESSED' | 'PARTIAL' | 'REJECTED' | 'ERROR' | 'EXPIRED' | 'OVERPAID';

export type TInvoiceRequest = {
  externalId: TNullableString;
  currency: string;
  order: TNullableString;
  description: TNullableString;
  amount: string;
  includeFee: boolean | null;
  additionalFees: string[] | null;
  insurancePercent: TNullableString;
  slippagePercent: TNullableString;
  webhookURL: TNullableString;
  returnURL: TNullableString;
  lifetime: number;
  currencies: TCurrencies[];
};

export type TInvoiceFilter = {
  status: TInvoiceStatus[] | null;
  limit: number;
  offset: number;
};

export type TResponseMakeInvoice = {
  id: string,
  advancedBalanceId: string,
  externalId: string,
  status: TResponseMakeInvoiceStatus,
  order: string,
  orderId?: TNullableString,
  orderLink?: TNullableString,
  invoiceLink: string,
  description: string,
  currency: string,
  amount: string,
  receivedNetwork?: TNullableString,
  receivedCurrency?: TNullableString,
  receivedAmount: string,
  receivedAmountInInvoiceCurrency: string,
  rate: string,
  includeFee: boolean,
  additionalFees: string[],
  insurancePercent: string,
  slippagePercent: string,
  webhookURL: string,
  returnUrl: string,
  expiresAt: string,
  createdAt: string,
  currencies: TCurrencies[]
};

export type TResponseMakeInvoiceStatus = 'CREATED' | 'INIT' | 'PENDING' | 'PROCESSED' | 'PARTIAL' | 'REJECTED' | 'ERROR' | 'EXPIRED' | 'OVERPAID';

export type TResponseGetInvoices = {
  total: number,
  invoices: TResponseMakeInvoice[]
}
