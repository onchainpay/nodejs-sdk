import { TNullableString } from './Base'

export type TOrphanTrxStage = 'DEPOSIT' | 'WITHDRAWAL';

export type TOrphanTrxStatus = 'PENDING' | 'PROCESSED' | 'ERROR' | 'REJECTED';

export type TOrphanTrxListRequest = {
  id: TNullableString;
  orderId: TNullableString;
  stage: TOrphanTrxStage | null;
  status: TOrphanTrxStatus | null;
  offset: number | null;
  limit: number | null;
};

export type TOrphanTrxCommissionToken = {
  token: TNullableString;
  address: TNullableString;
  comment: TNullableString;
  webhookUrl: TNullableString;
};

export type TResponseOrphanDeposit = {
  id: string,
  organizationId: string,
  orderId?: TNullableString,
  stage: TResponseOrphanDepositStage,
  status: TResponseOrphanDepositStatus,
  message?: TNullableString,
  currency: string,
  network: string,
  amount: string,
  canWithdrawal: boolean,
  inTransaction: TResponseOrphanDepositInTransaction,
  outTransaction: TResponseOrphanDepositOutTransaction | null,
  createdAt: string
};

export type TResponseOrphanDepositStage = 'DEPOSIT' | 'WITHDRAWAL';

export type TResponseOrphanDepositStatus = 'PENDING' | 'PROCESSED' | 'ERROR' | 'REJECTED';

export type TResponseOrphanDepositInTransaction = {
  txId: string,
  addressType: TResponseOrphanDepositTransactionAddressType,
  addressId: string,
  address: string,
  amount: string,
  status: TResponseOrphanDepositTransactionStatus,
  createdAt: string
};

export type TResponseOrphanDepositTransactionAddressType = 'PAY_IN' | 'BUSINESS' | 'PAY_OUT' | 'PERSONAL' | 'RECURRENT';

export type TResponseOrphanDepositTransactionStatus = 'processed' | 'error' | 'rejected' | 'pending';

export type TResponseOrphanDepositOutTransaction = {
  txId: TNullableString,
  address: string,
  amount: string,
  status: TResponseOrphanDepositTransactionStatus,
  feeAmount: string,
  feeAmountUSD: string,
  withdrawalId: string,
  createdAt: string
};

export type TResponseOrphanWithdrawalToken = {
  currency: string,
  network: string,
  feeSource: TResponseOrphanWithdrawalTokenFeeSource,
  blockchainFee: string,
  blockchainFeeUSD: string,
  serviceFee: string,
  serviceFeeUSD: string,
  amount: string,
  amountTo: string,
  price: string,
  token: string,
  expiresAt: string
};

export type TResponseOrphanWithdrawalTokenFeeSource = 'ADDRESS' | 'ADVANCE';

export type TResponseOrphan = {
  id: string,
  organizationId: string,
  orderId?: TNullableString,
  stage: TResponseOrphanDepositStage,
  status: TResponseOrphanDepositStatus,
  message?: TNullableString,
  currency?: TNullableString,
  network?: TNullableString,
  amount: string,
  canWithdrawal: boolean,
  inTransaction: TResponseOrphanDepositInTransaction,
  outTransaction?: TResponseOrphanDepositOutTransaction | null,
  createdAt: string
};
