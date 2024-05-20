import { TNullableString } from './Base'

export type TWithdrawalCommissionRequest = {
  advancedBalanceId: string;
  addressId: string;
  amount: string;
  native: boolean | null;
};

export type TWithdrawalRequest = {
  advancedBalanceId: string;
  addressId: string;
  address: string;
  amount: string;
  feeToken: string;
  tag: TNullableString;
  webhookUrl?: TNullableString;
};

export type TResponseRequestFee = {
  blockchainFeeCurrencyUSDRate: string,
  blockchainFeeCurrency: string,
  withdrawalCurrencyUSDRate: string,
  blockchainFeeSource: TResponseRequestFeeBlockchainFeeSource,
  blockchainFee: string,
  blockchainFeeUSD: string,
  serviceFee: string,
  serviceFeeUSD: string,
  withdrawalMin: string,
  token: string,
  until: string
}

export type TResponseRequestFeeBlockchainFeeSource = 'advanced_balance' | 'wallet' | 'native';

export type TResponseMakeWithdrawal = {
  id: string,
  advancedBalanceId: string;
  addressId: string;
  currency: string;
  network: string;
  tx: TNullableString,
  status: TResponseMakeWithdrawalStatus,
  address: string,
  tag?: TNullableString;
  amount: string,
  feeCurrency?: TNullableString,
  feeSource: TResponseMakeWithdrawalFeeSource,
  feeAmount: string;
  createdAt: string;
  webhookUrl?: string
};

export type TResponseMakeWithdrawalFeeSource = 'advanced_balance' | 'wallet' | 'native';

export type TResponseMakeWithdrawalStatus = 'init' | 'error' | 'pending' | 'processed' | 'rejected';
