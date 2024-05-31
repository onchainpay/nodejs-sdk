import BaseClass from './BaseClass';

import { 
  TOrphanTrxListRequest, 
  TOrphanTrxCommissionToken, 
  TResponseOrphanDeposit, 
  TResponseOrphanWithdrawalToken, 
  TResponseOrphan 
} from '../types/OrphanTransaction';

export default class OrphanTransactionRequest extends BaseClass {

  getTransaction(id: string) {
    return this.core.makeRequest<TResponseOrphanDeposit>('/orphan-deposits/get-deposit', { id });
  }

  getListOfTransaction(req: TOrphanTrxListRequest) {
    return this.core.makeRequest<TResponseOrphanDeposit[]>('/orphan-deposits/get-deposits', req);
  }

  getCommissionToken(id: string) {
    return this.core.makeRequest<TResponseOrphanWithdrawalToken>('/orphan-deposits/withdrawal-token', { id });
  }

  withdrawal(req: TOrphanTrxCommissionToken) {
    return this.core.makeRequest<TResponseOrphan>('/orphan-deposits/withdrawal', req);
  }
}
