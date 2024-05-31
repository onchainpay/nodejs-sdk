import BaseClass from './BaseClass';

import { 
  TCrosschainTransferCommissionToken, 
  TCrosschainTransferRequest, 
  TResponseCrosschainBridgeLimit, 
  TResponseCrosschainBridge, 
  TResponseCrosschainBridgeFeeToken 
} from '../types/CrosschainBridge';

export default class CrosschainBridgeRequest extends BaseClass {

  getCrosschainTransferLimits() {
    return this.core.makeRequest<TResponseCrosschainBridgeLimit>('/bridge/limit');
  }

  getCrosschainTransferInfo(id: string) {
    return this.core.makeRequest<TResponseCrosschainBridge>('/bridge/get', { id });
  }

  getCrosschainTransferCommissionToken(req: TCrosschainTransferCommissionToken) {
    return this.core.makeRequest<TResponseCrosschainBridgeFeeToken>('/bridge/fee-token', req);
  }

  createCrosschainTransfer(req: TCrosschainTransferRequest) {
    return this.core.makeRequest<TResponseCrosschainBridge>('/bridge/create', req);
  }
}
