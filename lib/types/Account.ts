import { TNullableString } from './Base'

export type TPaymentAddressFilter = {
  currency: TNullableString;
  network: TNullableString;
};

export type TResponseAccount = {
  advancedBalanceId: string,
  currency: string,
  blocked: boolean,
  blockReason: TNullableString,
  balance: string,
  availableCurrenciesForDeposit: string[],
  tariffs?: TResponseAccountTariff[]
}

export type TResponseAccountTariff = {
  id?: string,
  action?: TResponseAccountTariffAction,
  amount?: string,
  type?: TResponseAccountTariffType,
  minAmount?: TNullableString,
  maxAmount?: TNullableString,
  invoiceAdditionalFee?: boolean
}

export type TResponseAccountTariffAction = 'INTERNAL_TRANSFER' | 'ORDER_DEPOSIT' | 'WALLET_DEPOSIT' | 'WALLET_WITHDRAWAL' 
  | 'PAYOUT_DEPOSIT' | 'PAYOUT_WITHDRAWAL' | 'PERSONAL_DEPOSIT' | 'PERSONAL_WITHDRAWAL' | 'RECURRENT_DEPOSIT' | 'RECURRENT_WITHDRAWAL' 
  | 'BRIDGE_INTERNAL' | 'BRIDGE_EXTERNAL' | 'EXCHANGE_INTERNAL' | 'EXCHANGE_AUTO' | 'KYT_TRANSACTION' | 'KYT_WITHDRAWAL_ADDRESS' 
  | 'KYT_ADDRESS' | 'ORPHAN_DEPOSIT_WITHDRAWAL' | 'SEPA_WITHDRAWAL' | 'SEPA_DEPOSIT' | 'FIAT_CRYPTO_EXCHANGE';

export type TResponseAccountTariffType = 'PERCENT' | 'FIXED';

export type TResponseAdvDeposit = {
  currency: string,
  network: string,
  address: string,
  tag: string,
  until: string
}
