import BaseClass from './BaseClass';

import {
  TResponseTestSignature, 
  TResponsePrice, 
  TResponseAvailableCurrency, 
  TResponseFindTx, 
  TResponseValidateAddress
} from '../types/Base';

export default class BaseRequest extends BaseClass {

  checkSignature() {
    return this.core.makeRequest<TResponseTestSignature>('/test-signature');
  }

  availableCurrencies() {
    return this.core.makeRequest<TResponseAvailableCurrency[]>('/available-currencies');
  }

  priceRate(from: string, to: string) {
    return this.core.makeRequest<TResponsePrice>('/price-rate', { from, to });
  }

  operationsByTXHash(tx: string) {
    return this.core.makeRequest<TResponseFindTx[]>('/find-tx', { tx });
  }

  checkAddressFormat(address: string, network: string) {
    return this.core.makeRequest<TResponseValidateAddress>('/utils/validate-address', { address, network });
  }
}
