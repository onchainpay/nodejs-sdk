import BaseClass from './BaseClass';

import { 
  TCrosschainExchangeCommissionToken, 
  TCrosschainExchangeRequest, 
  TResponseCrosschainExchangeLimit, 
  TResponseCrosschainExchange, 
  TResponseCrosschainExchangeFeeToken 
} from '../types/CrosschainSwap';

export default class CrosschainSwapRequest extends BaseClass {

  getCrosschainExchangeLimits() {
    return this.core.makeRequest<TResponseCrosschainExchangeLimit>('/swaps/limit');
  }

  getCrosschainExchangeInfo(id: string) {
    return this.core.makeRequest<TResponseCrosschainExchange>('/swaps/get', { id });
  }

  getCrosschainExchangeCommissionToken(req: TCrosschainExchangeCommissionToken) {
    return this.core.makeRequest<TResponseCrosschainExchangeFeeToken>('/swaps/fee-token', req);
  }

  createCrosschainExchange(req: TCrosschainExchangeRequest) {
    return this.core.makeRequest<TResponseCrosschainExchange>('/swaps/create', req);
  }
}
