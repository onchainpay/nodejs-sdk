import { TNullableString } from './Base'

export type TKYTTransactionDirection = 'sent' | 'received';

export type TKYTTransactionCheckRequest = {
  tx: string;
  currency: string;
  network: string;
  outputAddress: string;
  direction: TKYTTransactionDirection;
};

export type TKYTWithdrawalCheckRequest = {
  currency: TNullableString;
  network: TNullableString;
  address: string;
  amount: TNullableString;
};

export type TKYTWithdrawalForAddressCheckRequest = {
  currency: string;
  network: string;
  address: string;
};

export type TResponseCheckTransfer = {
  level: TResponseCheckTransferLevel,
  categories: TResponseCheckTransferCategory[]
}

export type TResponseCheckTransferLevel = 'white' | 'yellow' | 'green' | 'red' | 'black';

export type TResponseCheckTransferCategory = {
  level: TResponseCheckTransferLevel,
  usdAmount: number,
  category?: TNullableString,
  service?: TNullableString,
  exposure: TResponseCheckTransferCategoryExposure
}

export type TResponseCheckTransferCategoryExposure = 'DIRECT' | 'INDIRECT';

export type TResponseWithdrawalAddressScreening = {
  currency: string,
  address: string,
  rating: TResponseWithdrawalAddressScreeningRating,
  cluster: {
    name?: TNullableString,
    category?: TNullableString,
    categoryId?: TNullableString
  },
  identification: {
    addressName?: TNullableString,
    description?: TNullableString,
    categoryName?: TNullableString,
    categoryId?: TNullableString
  }
}

export type TResponseWithdrawalAddressScreeningRating = 'unknown' | 'lowRisk' | 'highRisk';
