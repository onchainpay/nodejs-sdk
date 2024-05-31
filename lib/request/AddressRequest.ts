import BaseClass from './BaseClass';

import { TNullableString } from '../types/Base';
import { 
  TNewAddressEntity, 
  TExistingAddressEntity, 
  TAddressPagination, 
  TResponseAddressBookRecord, 
  TResponseGetListOfAddresses 
} from '../types/Address';

export default class AddressRequest extends BaseClass {

  addAddress(req: TNewAddressEntity) {
    return this.core.makeRequest<TResponseAddressBookRecord>('/address-book/add', req);
  }

  deleteAddress(addressId: string) {
    return this.core.makeRequest<null>('/address-book/remove', { addressId });
  }

  updateAddress(req: TExistingAddressEntity) {
    return this.core.makeRequest<null>('/address-book/update', req);
  }

  getListOfAddresses(req: TAddressPagination) {
    return this.core.makeRequest<TResponseGetListOfAddresses>('/address-book/get', req);
  }
}
