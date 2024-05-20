import {TResponseMakeOrder} from './Order';
import {TResponseOrphanDeposit} from './OrphanTransaction';
import {TResponseMakeWithdrawal} from './Withdrawal';
import {TResponseMakeInvoice} from './Invoice';

export type TNullableString = string | null;

export type TPagination = {
  page?: number;
  limit: number;
  offset?: number;
};

export type TCurrencies = {
  currency: string,
  networks: {name: string, amount: string}[]
}

export type TResponseTestSignature = {
  errors?: string[],
  checkSignatureResult: boolean,
  signature: string,
  receivedBody: string
};

export type TResponseAvailableCurrency = {
  currency: string,
  alias: string,
  allowDeposit: boolean,
  allowWithdrawal: boolean,
  priceUSD: string,
  networks: TResponseNetwork[]
}

export type TResponseNetwork = {
  name: string,
  alias: string,
  contract: TNullableString,
  addressRegex: string,
  tagRegex: TNullableString,
  allowDeposit: boolean,
  allowWithdrawal: boolean,
  allowCrosschainBridge: boolean,
  allowCrosschainSwapFrom: boolean,
  allowCrosschainSwapTo: boolean,
  allowAutoSwapFrom?: boolean,
  allowAutoSwapTo?: boolean,
  withdrawalFee: string,
  withdrawalMin: string,
  confirmations: string,
  underMaintenance: string,
}

export type TResponsePrice = string;

export type TResponseFindTx = {
  type: TResponseFindTxType,
  source: TResponseFindTxSource,
  address: string,
  result: TResponseMakeWithdrawal | TResponseOrphanDeposit | TResponseMakeOrder | TResponseMakeInvoice
}

export type TResponseFindTxType = 'IN' | 'OUT';

export type TResponseFindTxSource = 'ORDER' | 'INVOICE' | 'ORPHAN_DEPOSIT' | 'WITHDRAWAL' | 'DEPOSIT' | 'PERSONAL_DEPOSIT';

export type TResponseValidateAddress = {
  isValid: boolean,
  regex: string
}
