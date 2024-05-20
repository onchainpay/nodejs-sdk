import { TNullableString } from './Base'

export type TPartnersAPIIndividualTariffType = 'PERCENT' | 'FIXED';

export type TPartnersAPIIndividualTariffAction =
  | 'INTERNAL_TRANSFER'
  | 'ORDER_DEPOSIT'
  | 'WALLET_DEPOSIT'
  | 'WALLET_WITHDRAWAL'
  | 'PAYOUT_DEPOSIT'
  | 'PAYOUT_WITHDRAWAL'
  | 'PERSONAL_DEPOSIT'
  | 'PERSONAL_WITHDRAWAL'
  | 'RECURRENT_DEPOSIT'
  | 'RECURRENT_WITHDRAWAL'
  | 'BRIDGE_INTERNAL'
  | 'BRIDGE_EXTERNAL'
  | 'EXCHANGE_INTERNAL'
  | 'EXCHANGE_AUTO'
  | 'KYT_TRANSACTION'
  | 'KYT_WITHDRAWAL_ADDRESS'
  | 'KYT_ADDRESS'
  | 'ORPHAN_DEPOSIT_WITHDRAWAL'
  | 'SEPA_WITHDRAWAL'
  | 'SEPA_DEPOSIT'
  | 'FIAT_CRYPTO_EXCHANGE';

export type TPartnersAPIOrganizationListRequest = {
  userId: TNullableString;
  limit: number | null;
  offset: number | null;
};

export type TPartnersAPIReplenishmentOfUserBalanceRequest = {
  userId: string;
  organizationId: string;
  advancedBalanceId: string;
  amount: string;
};

export type TPartnersAPIIndividualTariffEntityRequest = {
  userId: TNullableString;
  organizationId: TNullableString;
  action: TPartnersAPIIndividualTariffAction | null;
  amount: TNullableString;
  type: TPartnersAPIIndividualTariffType | null;
  comment: TNullableString;
  minAmount: TNullableString;
  maxAmount: TNullableString;
};

export type TPartnersAPIKeyRequest = {
  userId: string;
  organizationId: string;
  alias: string;
};

export type TPartnersAPIKeyListRequest = {
  userId: TNullableString;
  organizationId: string;
  limit: number | null;
  offset: number | null;
};

export type TPartnersAPIKeyDeleteRequest = {
  userId: TNullableString;
  organizationId: TNullableString;
  keyId: TNullableString;
};

export type TResponsePartnerUser = {
  id: string,
  email: string,
  password?: TNullableString,
  utm?: TNullableString,
  createdAt: string,
  updatedAt: string,
  confirmedAt: string,
  lastLoginAt?: TNullableString
}

export type TResponseGetPartnerUsers = {
  users: TResponsePartnerUser[],
  total: number
}

export type TResponseCreatedPartnerOrganization = string;

export type TResponseGetPartnerOrganization = {
  id: string,
  name: string,
  createdAt: string
}

export type TResponsePartnerAdvancedBalancesSource = {
  advancedBalanceId: string,
  currency: string,
  blocked: boolean,
  blockReason?: TNullableString,
  balance: string,
  availableCurrenciesForDeposit: string[]
}

export type TResponsePartnerTariff = {
  id: string,
  action: TResponsePartnerTariffAction,
  amount: string,
  type: TResponsePartnerTariffType,
  minAmount?: TNullableString,
  maxAmount?: TNullableString
}

export type TResponsePartnerTariffAction = 'INTERNAL_TRANSFER' | 'ORDER_DEPOSIT' | 'WALLET_DEPOSIT' | 'WALLET_WITHDRAWAL' | 'PAYOUT_DEPOSIT' 
  | 'PAYOUT_WITHDRAWAL' | 'PERSONAL_DEPOSIT' | 'PERSONAL_WITHDRAWAL' | 'RECURRENT_DEPOSIT' | 'RECURRENT_WITHDRAWAL' | 'BRIDGE_INTERNAL' 
  | 'BRIDGE_EXTERNAL' | 'EXCHANGE_INTERNAL' | 'EXCHANGE_AUTO' | 'KYT_TRANSACTION' | 'KYT_WITHDRAWAL_ADDRESS' | 'KYT_ADDRESS' 
  | 'ORPHAN_DEPOSIT_WITHDRAWAL' | 'SEPA_WITHDRAWAL' | 'SEPA_DEPOSIT' | 'FIAT_CRYPTO_EXCHANGE';

export type TResponsePartnerTariffType = 'PERCENT' | 'FIXED';

export type TResponsePartnerCustomTariff = {
  id: string,
  action: TResponsePartnerTariffAction,
  amount: string,
  type: TResponsePartnerTariffType,
  minAmount?: TNullableString,
  maxAmount?: TNullableString,
  comment?: TNullableString,
  createdAt: string,
  updatedAt: string
}

export type TResponsePartnerApiKey = {
  id: string,
  public: string,
  secret: string,
  alias: string,
  createdAt: string
}

export type TResponseGetPartnerApiKeys = {
  total: number,
  keys: TResponsePartnerApiKey[]
}
// deletable type
export type CreatedPartnerOrganizationResponse = {
  result: string,
  code: number,
  success: boolean
};
