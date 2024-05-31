import { TNullableString } from './Base'

export type TCrosschainTransferRequest = {
  clientId: TNullableString;
  addressFromId: string;
  addressToId: string;
  feeToken: string;
  webhookUrl: TNullableString;
};

export type TCrosschainTransferCommissionToken = {
  currency: string;
  networkFrom: string;
  networkTo: string;
  amount: string;
};

export type TResponseCrosschainBridgeLimit = {
  min: string,
  max: string
}

export type TResponseCrosschainBridge = {
  id: string,
  clientId: string,
  advancedBalanceId: string,
  currency: string,
  networkFrom: string,
  networkTo: string,
  status: TResponseCrosschainBridgeStatus,
  rejectMessage?: TNullableString,
  amount: string,
  amountUSD: string,
  blockchainFee: string,
  blockchainFeeUSD: string,
  serviceFeeUSD: string,
  webhookUrl: string,
  createdAt: string
};

export type TResponseCrosschainBridgeStatus = 'CREATED' | 'PENDING' | 'ERROR' | 'REJECTED' | 'PROCESSED';

export type TResponseCrosschainBridgeFeeToken = {
  advancedBalanceId: string,
  blockchainFee: string,
  blockchainFeeUSD: string,
  serviceFeeUSD: string,
  amount: string,
  amountUSD: string,
  token: string,
  expiresAt: string
}
