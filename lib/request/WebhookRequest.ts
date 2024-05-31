import BaseClass from './BaseClass';

import { TWebhookFields, TResponseWebhook, TResponseWebhookGetVerbose } from '../types/Webhook';

export default class WebhookRequest extends BaseClass {

  getWebhook(webhookId: string) {
    return this.core.makeRequest<TResponseWebhook>('/webhooks/get', { webhookId });
  }

  getWebhookExt(webhookId: string, fields: TWebhookFields[] | undefined = undefined) {
    return this.core.makeRequest<TResponseWebhookGetVerbose>('/webhooks/get-verbose', { webhookId, fields });
  }
}
