import BaseClass from './BaseClass';

import { 
  TKYTTransactionCheckRequest, 
  TKYTWithdrawalCheckRequest, 
  TKYTWithdrawalForAddressCheckRequest, 
  TResponseCheckTransfer, 
  TResponseWithdrawalAddressScreening 
} from '../types/KYT';

export default class KYTRequest extends BaseClass {
  checkTransactionRisks(req: TKYTTransactionCheckRequest) {
    return this.core.makeRequest<TResponseCheckTransfer>('/kyt/check-transfer', req);
  }

  checkWithdrawalRisks(req: TKYTWithdrawalCheckRequest) {
    return this.core.makeRequest<TResponseCheckTransfer>('/kyt/check-withdrawal-address', req);
  }

  checkWithdrawalRisksForAddress(req: TKYTWithdrawalForAddressCheckRequest) {
    return this.core.makeRequest<TResponseWithdrawalAddressScreening>('/kyt/withdrawal-address-screening', req);
  }
}
