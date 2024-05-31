import BaseClass from './BaseClass';

import { TNullableString } from '../types/Base';
import { 
  TMerchantUserEntity, 
  TUserAddressRequest, 
  TPersonalAddressFilter, 
  TResponsePersonalUserSource, 
  TResponsePersonalAddress,
  TResponsePersonalAddresses
} from '../types/PersonalAddress';

export default class PersonalAddressRequest extends BaseClass {

  saveUser(req: TMerchantUserEntity) {
    return this.core.makeRequest<TResponsePersonalUserSource>('/personal-addresses/create-user', req);
  }

  getAddress(req: TUserAddressRequest) {
    return this.core.makeRequest<TResponsePersonalAddress>('/personal-addresses/get-user-address', req);
  }

  getListOfAddresses(req: TPersonalAddressFilter) {
    return this.core.makeRequest<TResponsePersonalAddresses>('/personal-addresses/get-user-addresses', req);
  }

  getUser(id: TNullableString = null, clientId: TNullableString = null) {
    return this.core.makeRequest<TResponsePersonalUserSource>('/personal-addresses/get-user', { id, clientId });
  }
}
