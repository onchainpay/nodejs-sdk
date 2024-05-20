import { TNullableString } from './Base'

export type TBalanceFilter = {
  from: TNullableString;
  to: TNullableString;
};

export type TMerchantUserEntity = {
  clientId: string;
  clientEmail: TNullableString;
  clientName: TNullableString;
  depositWebhookUrl: TNullableString;
  createAddresses: boolean | null;
  groupByBlockchain: boolean | null;
  checkRisks: boolean | null;
};

export type TUserAddressRequest = {
  id: string;
  currency: string;
  network: string;
  renewAddress: boolean | null;
};

export type TPersonalAddressFilter = {
  id: TNullableString;
  isActive: boolean | null;
  currency: string[] | null;
  network: string[] | null;
  balance: TBalanceFilter | null;
  limit: number;
  offset: number;
};

export type TResponsePersonalUserSource = {
  id: string,
  clientId: string,
  clientEmail: string,
  clientName: string,
  depositWebhookUrl: string,
  createdAt: string,
  updatedAt: string,
  addresses?: TResponsePersonalAddress[]
}

export type TResponsePersonalAddress = {
  id: string,
  userId: string,
  currency: string,
  network: string,
  address: string,
  tag?: TNullableString,
  balance: string,
  isActive: boolean
}

export type TResponsePersonalAddresses = {
  total: number,
  addresses: TResponsePersonalAddress[]
}
