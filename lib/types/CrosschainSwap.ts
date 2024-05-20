import { TNullableString } from './Base'

export type TCrosschainExchangeRequest = {
  advancedBalanceId: string;
  clientId: TNullableString;
  addressFromId: string;
  addressToId: string;
  feeToken: string;
  webhookUrl: TNullableString;
};

export type TCrosschainExchangeCommissionToken = {
  advancedBalanceId: string;
  currencyFrom: string;
  currencyTo: string;
  networkFrom: string;
  networkTo: string;
  amountFrom?: string;
  amountTo?: string;
};

export type TResponseCrosschainExchangeLimit = {
  min: string,
  max: string
}

export type TResponseCrosschainExchange = {
  id: string,
  clientId: string,
  advancedBalanceId: string,
  addressFromId: string,
  addressToId: string,
  currencyFrom: string,
  currencyTo: string,
  networkFrom: string,
  networkTo: string,
  status: TResponseCrosschainExchangeStatus,
  rejectMessage?: TNullableString,
  amountFrom: string,
  amountTo: string,
  price: string,
  serviceBlockchainFeeSource: TResponseCrosschainExchangeServiceBlockchainFeeSource,
  serviceBlockchainFee: string,
  serviceBlockchainFeeUSD: string,
  providerBlockchainFeeSource: TResponseCrosschainExchangeProviderBlockchainFeeSource,
  providerBlockchainFee: string,
  providerBlockchainFeeUSD: string,
  serviceFeeSource: TResponseCrosschainExchangeServiceFeeSource,
  serviceFee: string,
  serviceFeeUSD: string,
  webhookUrl: string,
  createdAt: string
};

export type TResponseCrosschainExchangeStatus = 'CREATED' | 'PENDING' | 'ERROR' | 'REJECTED' | 'PROCESSED';

export type TResponseCrosschainExchangeServiceBlockchainFeeSource = 'ADDRESS' | 'ADVANCE';

export type TResponseCrosschainExchangeProviderBlockchainFeeSource = 'AMOUNT';

export type TResponseCrosschainExchangeServiceFeeSource = 'ADVANCE';

export type TResponseCrosschainExchangeFeeToken = {
  advancedBalanceId: string,
  amountFrom: string,
  amountTo: string,
  serviceBlockchainFeeSource: TResponseCrosschainExchangeServiceBlockchainFeeSource,
  serviceBlockchainFee: string,
  serviceBlockchainFeeUSD: string,
  providerBlockchainFeeSource: TResponseCrosschainExchangeProviderBlockchainFeeSource,
  providerBlockchainFee: string,
  providerBlockchainFeeUSD: string,
  serviceFeeSource: TResponseCrosschainExchangeServiceFeeSource,
  serviceFee: string,
  serviceFeeUSD: string,
  price: string,
  token: string,
  expiresAt: string
}
