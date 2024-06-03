import BaseClass from './BaseClass';

import { TNullableString } from '../types/Base';
import { 
  TOrderEntity, 
  TOrderFilter, 
  TResponseMakeOrder, 
  TResponseGetOrder, 
  TResponseGetOrders 
} from '../types/Order';

export default class OrderRequest extends BaseClass {
  makeOrder(req: TOrderEntity) {
    if(!req.lifetime) {

      switch(req.network) {
        case 'ripple':
        case 'bsc':
        case 'tron':
        case 'ethereum':
        case 'fantom':
          req.lifetime = 1800;
          break
        case 'litecoin':
          req.lifetime = 3600;
          break
        case 'bitcoin':
        case 'bitcoincash':
          req.lifetime = 7200;
          break
      }
    }

    return this.core.makeRequest<TResponseMakeOrder>('/make-order', req);
  }

  getOrder(orderId: TNullableString = null) {
    return this.core.makeRequest<TResponseGetOrder>('/order', { orderId });
  }

  getListOfOrders(req: TOrderFilter) {
    return this.core.makeRequest<TResponseGetOrders>('/orders', req);
  }
}
