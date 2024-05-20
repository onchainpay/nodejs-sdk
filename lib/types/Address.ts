import { TNullableString } from './Base'

export type TAddressEntity = {
  address: TNullableString;
  addressId: TNullableString;
  networks: string[] | null;
  alias: TNullableString;
  comment: TNullableString;
};

export type TNewAddressEntity = {
  address: TNullableString;
  networks: string[] | null;
  alias: TNullableString;
  comment: TNullableString;
};

export type TExistingAddressEntity = {
  addressId: TNullableString;
  alias: TNullableString;
  comment: TNullableString;
};

export type TAddressPagination = {
  page: number;
  limit: number;
  networks: string[] | null;
};

export type TResponseAddressBookRecord = {
  id: string,
  networks: string[],
  address: string,
  alias: string,
  comment: string
}

export type TResponseGetListOfAddresses = {
  addresses: TResponseAddressBookRecord[],
  count: number,
  countPages: number,
  limit: number,
  page: number
}
