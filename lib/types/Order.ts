import { TNullableString } from './Base'

import {TResponseOrphanDeposit} from './OrphanTransaction';

export type TOrderStatus = 'init' | 'error' | 'processed' | 'pending' | 'expired' | 'partial' | 'overpaid';

export type TOrderEntity = {
  advancedBalanceId: string;
  currency: string;
  network: string;
  amount: string;
  order: string;
  errorWebhook: TNullableString;
  successWebhook: TNullableString;
  returnUrl: TNullableString;
  description: TNullableString;
  lifetime: number;
  checkRisks: boolean | null;
};

export type TOrderFilter = {
  status: TOrderStatus[] | null;
  limit: number;
  offset: number;
};

export type TResponseMakeOrder = {
  status: TResponseMakeOrderStatus,
  link: string,
  amount: string,
  advancedBalanceId: string,
  currency: string,
  network: string,
  addressId: string,
  address: string,
  tag?: TNullableString,
  orderId: string,
  clientOrderId: string,
  description: string,
  successWebhook: string,
  errorWebhook: string,
  returnUrl: string,
  expiresAt: string,
  createdAt: string
};

export type TResponseMakeOrderStatus = 'init' | 'error' | 'processed' | 'pending' | 'expired' | 'partial' | 'overpaid';

export type TResponseGetOrder = {
  id: string,
  status: TResponseMakeOrderStatus,
  link: string,
  amount: string,
  advancedBalanceId: string,
  currency: string,
  network: string,
  addressId: string,
  address: string,
  tag?: TNullableString,
  orderId: string,
  clientOrderId: string,
  description: string,
  successWebhook: string,
  errorWebhook: string,
  returnUrl: string,
  expiresAt: string,
  createdAt: string,
  updatedAt: string,
  received: string,
  transactions: TResponseGetOrderTransaction[],
  orphanDeposits: TResponseOrphanDeposit[]
}

export type TResponseGetOrderTransaction = {
  id: string,
  status: TResponseGetOrderTransactionStatus,
  currency: string,
  network: string,
  amount: string,
  tx: string,
  confirmations: number,
  sender?: TNullableString,
  priceUSD: string,
  amountUSD: string
}

export type TResponseGetOrderTransactionStatus = 'processed' | 'error' | 'rejected' | 'pending';

export type TResponseGetOrders = {
  total: number,
  orders: TResponseMakeOrder[]
}
