import { TNullableString } from './Base'
import { TResponseOrphanDepositInTransaction, TResponseOrphanDepositOutTransaction } from './OrphanTransaction'

export type TWebhookFields =
  | 'id'
  | 'event'
  | 'eventId'
  | 'requestUrl'
  | 'requestHeaders'
  | 'requestBody'
  | 'responseCode'
  | 'responseStatus'
  | 'responseBody'
  | 'sentAt'
  | 'signature'
  | 'apiKey'
  | 'apiKeyAlias'
  | 'createdAt'
  | 'updatedAt';

  export type TResponseWebhook = {
    id: string,
    advancedBalanceId?: string,
    organizationId: string,
    stage: string,
    webhookId: string,
    currency?: string,
    network?: string,
    amount?: string,
    status: string,
    order?: TNullableString,
    description?: TNullableString,
    address?: string,
    canWithdrawal: boolean,
    message?: TNullableString,
    orderId?: TNullableString,
    inTransaction?: TResponseOrphanDepositInTransaction | null,
    outTransaction?: TResponseOrphanDepositOutTransaction | null,
    createdAt: string,
  }

  export type TResponseWebhookGetVerbose = {
    id: string,
    event: TResponseWebhookGetVerboseEvent,
    eventId: string,
    requestUrl: string,
    requestHeaders: object,
    requestBody: string,
    responseCode: number,
    responseStatus: TResponseWebhookGetVerboseResponseStatus,
    responseBody: string,
    sentAt: string,
    signature: string,
    apiKey: string,
    apiKeyAlias: string,
    createdAt: string,
    updatedAt: string
  }

  export type TResponseWebhookGetVerboseEvent = 'ORDER' | 'WITHDRAWAL' | 'DEPOSIT_PERSONAL' | 'DEPOSIT_ORPHAN' | 'CROSSCHAIN_TRANSFER' | 'CROSSCHAIN_SWAP' | 'REC_BILLING_LINK' | 'REC_SUBSCRIPTION' | 'REC_FREE_PAYMENT' | 'FIAT_DEPOSIT';

  export type TResponseWebhookGetVerboseResponseStatus = 'ERROR' | 'SUCCESS';
