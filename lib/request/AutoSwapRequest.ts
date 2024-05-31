import BaseClass from './BaseClass';

import { TAutoSwapRequest, TResponseAutoSwap } from '../types/AutoSwap';

export default class AutoSwapRequest extends BaseClass {
  createAutoSwaps(req: TAutoSwapRequest) {
    return this.core.makeRequest<TResponseAutoSwap>('/auto-swaps/create', req);
  }

  findAutoSwapById(id: string) {
    return this.core.makeRequest<TResponseAutoSwap>('/auto-swaps/get', { id });
  }
}
