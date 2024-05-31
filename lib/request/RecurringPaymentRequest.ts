import BaseClass from './BaseClass';

import { 
  TPaymentLinkRequest, 
  TPaymentLinksByUserRequest, 
  TSubscriptionRequest, 
  TPaymentRequest, 
  TResponseBillingLink, 
  TResponseSubscriptionBillingLink, 
  TResponseDisableSubscriptionBillingLink,
  TResponseSubscription, 
  TResponseRecurrentPayment 
} from '../types/RecurringPayment';

export default class RecurringPaymentRequest extends BaseClass {
  createPaymentLink(req: TPaymentLinkRequest) {
    return this.core.makeRequest<TResponseBillingLink>('/recurrents/create-subscriber-billing-link', req);
  }

  getPaymentLink(id: string, merchantId: string) {
    return this.core.makeRequest<TResponseSubscriptionBillingLink>('/recurrents/get-billing-link', { id, merchantId });
  }

  getPaymentLinksByUser(req: TPaymentLinksByUserRequest) {
    return this.core.makeRequest<TResponseSubscriptionBillingLink[]>('/recurrents/get-billing-links-by-subscriber', req);
  }

  disablePaymentLink(id: string, merchantId: string) {
    return this.core.makeRequest<TResponseDisableSubscriptionBillingLink>('/recurrents/disable-subscriber-billing-link', { id, merchantId });
  }

  createSubscription(req: TSubscriptionRequest) {
    return this.core.makeRequest<TResponseSubscription>('/recurrents/create-subscription', req);
  }
 
  getSubscription(id: string, merchantId: string) {
    return this.core.makeRequest<TResponseSubscription>('/recurrents/get-subscription', { id, merchantId });
  }

  cancelSubscription(id: string, merchantId: string) {
    return this.core.makeRequest<TResponseSubscription>('/recurrents/cancel-subscription', { id, merchantId });
  }

  createPayment(req: TPaymentRequest) {
    return this.core.makeRequest<TResponseRecurrentPayment>('/recurrents/make-payment', req);
  }
}
