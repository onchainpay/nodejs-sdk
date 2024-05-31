import { TNullableString } from './Base'

export type TBlockchainTrxType = 'withdrawal' | 'deposit';

export type TBlockchainTrxStatus = 'processed' | 'error' | 'rejected' | 'pending';

export type TBlockchainTrxByAddressFilter = {
  id: string;
  type: TBlockchainTrxType | null;
  status: TBlockchainTrxStatus[] | null;
  limit: number;
  offset: number;
};

export type TBusinessWalletAddress = {
  currency: string;
  network: string;
  alias: string;
  comment: string;
};

export type TResponseBlockchainAddress = {
  id: string,
  type: TResponseBlockchainAddressType,
  alias?: TNullableString,
  comment?: TNullableString,
  currency: string,
  network: string,
  balance: string,
  address: string,
  tag?: TNullableString,
  meta?: object | string | null,
  isArchived: boolean
}

export type TResponseBlockchainAddressType = 'PAY_IN' | 'BUSINESS' | 'PAY_OUT' | 'PERSONAL' | 'RECURRENT';

export type TResponseTrackedAddress = {
  id: string,
  networks: string[],
  address: string,
  webhookUrl: string
}

export type TResponseAddressTransactions = {
  count: number,
  transactions: TResponseAddressTransaction[]
}

export type TResponseAddressTransaction = {
  id: string,
  status: TResponseAddressTransactionStatus,
  type: TResponseAddressTransactionType,
  currency: string,
  network: string,
  addressFrom: string,
  addressTo: string,
  amount: string,
  tx: string,
  feeCurrency?: TNullableString,
  feeAmount?: TNullableString,
  feeAmountUSD?: TNullableString,
  withdrawalId?: TNullableString,
  orphanDepositId?: TNullableString,
  createdAt: string
}

export type TResponseAddressTransactionStatus = 'processed' | 'error' | 'rejected' | 'pending';

export type TResponseAddressTransactionType = 'withdrawal' | 'deposit';

export type TResponsePayInAddresses = TResponsePayInAddress[];

export type TResponsePayInAddress = {
  id: string,
  advancedBalanceId: string,
  currency: string,
  network: string,
  address: string,
  tag?: TNullableString,
  balance: string
}

export type TResponseBusinessAddresses = TResponseExtendedAddress[];

export type TResponseRecurrentAddresses = TResponseExtendedAddress[];

export type TResponsePayOutAddresses = TResponseExtendedAddress[];

export type TResponseExtendedAddress = {
  id: string,
  advancedBalanceId?: TNullableString,
  currency: string,
  network: string,
  address: string,
  tag?: TNullableString,
  balance: string,
  alias?: TNullableString,
  comment?: TNullableString
};
