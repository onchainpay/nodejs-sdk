import BaseClass from './BaseClass';

import {
  TPaymentAddressFilter, 
  TResponseAccount, 
  TResponseAdvDeposit
} from '../types/Account';

export default class AccountRequest extends BaseClass {

  getBalances() {
    return this.core.makeRequest<TResponseAccount[]>('/advanced-balances');
  }

  getBalance() {
    return this.core.makeRequest<TResponseAccount | null>('/advanced-balance');
  }

  getPaymentAddressForBalanceTopUp(req: TPaymentAddressFilter) {
    return this.core.makeRequest<TResponseAdvDeposit>('/advanced-balance-deposit-address', req);
  }
}

// return this.core.makeRequest<TResponseAccount>('/advanced', req);
