import BaseClass from './BaseClass';

import { 
  TWithdrawalCommissionRequest, 
  TWithdrawalRequest, 
  TResponseRequestFee, 
  TResponseMakeWithdrawal 
} from '../types/Withdrawal';

export default class WithdrawalRequest extends BaseClass {

  getCommissionForMakingWithdrawal(req: TWithdrawalCommissionRequest) {
    return this.core.makeRequest<TResponseRequestFee>('/withdrawal-fee-token', req);
  }

  makeWithdrawal(req: TWithdrawalRequest) {
    return this.core.makeRequest<TResponseMakeWithdrawal>('/make-withdrawal', req);
  }

  makeWithdrawalAsync(req: TWithdrawalRequest) {
    return this.core.makeRequest<TResponseMakeWithdrawal>('/make-withdrawal-async', req);
  }

  getWithdrawal(withdrawalId: string) {
    return this.core.makeRequest<TResponseMakeWithdrawal>('/get-withdrawal', { withdrawalId });
  }
}
