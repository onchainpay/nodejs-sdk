import { TNullableString } from './Base'

export type TAutoSwapRequest = {
  address: string;
  currency: string;
  network: string;
  amountFrom: TNullableString;
  amountTo: TNullableString;
  feeInAmount: boolean | null;
  webhookUrl: TNullableString;
};

export type TResponseAutoSwap = {
  id: string,
  organizationId: string,
  status: TResponseAutoSwapStatus,
  message: string,
  addressRiskLevel: TResponseAutoSwapAddressRiskLevel,
  currencyFrom: string,
  networkFrom: string,
  currencyTo: string,
  networkTo: string,
  amountFrom: string,
  amountFromUSD: string,
  amountTo: string,
  amountToUSD: string,
  amountToReceive: string,
  rate: string,
  blockchainFeeFrom: string,
  blockchainFeeFromUSD: string,
  blockchainFeeTo: string,
  blockchainFeeToUSD: string,
  serviceFee: string,
  webhookUrl: string,
  createdAt: string,
  updatedAt: string
}

export type TResponseAutoSwapStatus = 'PROCESSED' | 'ERROR' | 'REJECTED' | 'PENDING' | 'WITHDRAWING';

export type TResponseAutoSwapAddressRiskLevel = 'Low' | 'Medium' | 'High' | 'Severe';
