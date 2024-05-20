import { TNullableString } from './Base'

export type TPaymentLinkRequest = {
  merchantId: string;
  clientId: string;
  clientEmail: string;
  clientName: TNullableString;
  returnUrl: TNullableString;
  webhookUrl: TNullableString;
};

export type TCrosschainExchangeCommissionToken = {
  advancedBalanceId: string;
  currencyFrom: string;
  currencyTo: string;
  networkFrom: string;
  networkTo: string;
  amount: string;
};

export type TPaymentLinksByUserRequest = {
  merchantId: string;
  clientId: TNullableString;
  clientEmail: TNullableString;
};

export type TSubscriptionRequest = {
  merchantId: string;
  billingLinkId: string;
  title: string;
  description: TNullableString;
  spendInterval: number;
  currency: string;
  amount: string;
  webhookUrl: TNullableString;
};

export type TPaymentRequest = {
  merchantId: string;
  billingLinkId: string;
  amount: string;
  webhookUrl: TNullableString;
};

export type TResponseBillingLink = {
  merchantId: string,
  clientId: string,
  clientEmail: string,
  clientName: string,
  returnUrl: string,
  webhookUrl: string,
  link: string
}

export type TResponseSubscriptionBillingLink = {
  id: string,
  merchantId: string,
  clientId: string,
  clientEmail: string,
  clientName?: string,
  webhookUrl: string,
  returnUrl: string,
  address: string,
  currency: string,
  network: string,
  status: TResponseSubscriptionBillingLinkStatus,
  createdAt: string,
  updatedAt: string
}

export type TResponseSubscriptionBillingLinkStatus = 'PENDING' | 'SUCCESS' | 'BLOCKED' | 'CANCELED' | 'DECLINED';

export type TResponseDisableSubscriptionBillingLink = {
  id: string,
  merchantId: string,
  currency: string,
  network: string,
  status: TResponseSubscriptionBillingLinkStatus,
  createdAt: string,
  updatedAt: string
}

export type TResponseSubscription = {
  id: string,
  merchantId: string,
  billingLinkId: string,
  title: string,
  description: string,
  clientName: string,
  spendInterval: number,
  status: TResponseSubscriptionBillingLinkStatus,
  message?: TNullableString,
  currency: string,
  amount: string,
  webhookUrl: string,
  createdAt: string,
  updatedAt: string
}

export type TResponseRecurrentPayment = {
  id: string,
  merchantId: string,
  billingLinkId: string,
  webhookUrl: string,
  amount: string,
  tx?: TNullableString,
  status: TResponseRecurrentPaymentStatus,  
  createdAt: string,
  updatedAt: string
}

export type TResponseRecurrentPaymentStatus = 'INIT' | 'PENDING' | 'ERROR' | 'PROCESSED';
