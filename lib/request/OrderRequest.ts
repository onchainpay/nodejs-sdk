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
    return this.core.makeRequest<TResponseMakeOrder>('/make-order', req);
  }

  getOrder(orderId: TNullableString = null) {
    return this.core.makeRequest<TResponseGetOrder>('/order', { orderId });
  }

  getListOfOrders(req: TOrderFilter) {
    return this.core.makeRequest<TResponseGetOrders>('/orders', req);
  }
}
