import BaseClass from './BaseClass';

import { TNullableString } from '../types/Base';
import { 
  TInvoiceRequest, 
  TInvoiceFilter, 
  TResponseMakeInvoice, 
  TResponseGetInvoices 
} from '../types/Invoice';

export default class InvoiceRequest extends BaseClass {

  makeInvoice(req: TInvoiceRequest) {
    return this.core.makeRequest<TResponseMakeInvoice>('/make-invoice', req);
  }

  getInvoice(invoiceId: TNullableString = null) {
    return this.core.makeRequest<TResponseMakeInvoice>('/get-invoice', { invoiceId });
  }

  getListOfInvoices(req: TInvoiceFilter) {
    return this.core.makeRequest<TResponseGetInvoices>('/get-invoices', req);
  }
}
