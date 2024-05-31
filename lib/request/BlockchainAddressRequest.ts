import BaseClass from './BaseClass';

import { 
  TBlockchainTrxByAddressFilter, 
  TBusinessWalletAddress, 
  TResponseBlockchainAddress, 
  TResponseTrackedAddress, 
  TResponseAddressTransactions, 
  TResponsePayInAddresses, 
  TResponseBusinessAddresses, 
  TResponseRecurrentAddresses, 
  TResponsePayOutAddresses,
  TResponseExtendedAddress
} from '../types/BlockchainAddress';

export default class BlockchainAddressRequest extends BaseClass {
  searchById(id: string) {
    return this.core.makeRequest<TResponseBlockchainAddress | null>('/addresses/find-by-id', { id });
  }

  addTrackingAddress(address: string, webhookUrl: string) {
    return this.core.makeRequest<TResponseTrackedAddress>('/track-addresses/add-address', { address, webhookUrl });
  }

  searchByAddress(address: string) {
    return this.core.makeRequest<TResponseBlockchainAddress[]>('/addresses/find-by-address', { address });
  }

  setMetaData(id: string, meta: Object | String | null) {
    return this.core.makeRequest<null>('/addresses/set-meta', { id, meta });
  }

  getAddressTransactions(req: TBlockchainTrxByAddressFilter) {
    return this.core.makeRequest<TResponseAddressTransactions>('/addresses/transactions', req);
  }

  getListOfPayInAddresses() {
    return this.core.makeRequest<TResponsePayInAddresses>('/account-addresses');
  }

  getListOfBusinessAddresses() {
    return this.core.makeRequest<TResponseBusinessAddresses>('/business-addresses');
  }

  getListOfRecurrentAddresses() {
    return this.core.makeRequest<TResponseRecurrentAddresses>('/recurrent-addresses');
  }

  getListOfPayOutAddresses() {
    return this.core.makeRequest<TResponsePayOutAddresses>('/payout-balances');
  }

  createBusinessWalletAddress(req: TBusinessWalletAddress) {
    return this.core.makeRequest<TResponseBusinessAddresses|TResponseExtendedAddress>('/business-address', req);
  }

  createPayOutWalletAddress(currency: string, network: string) {
    return this.core.makeRequest<TResponsePayOutAddresses|TResponseExtendedAddress>('/payout-address', { currency, network });
  }
}
