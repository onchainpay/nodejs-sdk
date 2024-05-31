import * as crypto from "crypto";
import axios, {AxiosRequestConfig} from 'axios';

import BaseRequest from './request/BaseRequest';
import AccountRequest from './request/AccountRequest';
import AddressRequest from './request/AddressRequest';
import BlockchainAddressRequest from './request/BlockchainAddressRequest';
import PersonalAddressRequest from './request/PersonalAddressRequest';
import OrderRequest from './request/OrderRequest';
import WithdrawalRequest from './request/WithdrawalRequest';
import InvoiceRequest from './request/InvoiceRequest';
import AutoSwapRequest from './request/AutoSwapRequest';
import CrosschainBridgeRequest from './request/CrosschainBridgeRequest';
import CrosschainSwapRequest from './request/CrosschainSwapRequest';
import RecurringPaymentRequest from './request/RecurringPaymentRequest';
import KYTRequest from './request/KYTRequest';
// import PartnersAPIRequest from './request/PartnersAPIRequest';
import WebhookRequest from './request/WebhookRequest';
import OrphanTransactionRequest from './request/OrphanTransactionRequest';
import {OCPResponse} from "./types/response";

const PRODUCTION_URL: string = 'https://ocp.onchainpay.io/api-gateway';

const defaultAxiosOptions: AxiosRequestConfig = {
  baseURL: PRODUCTION_URL,
  headers: {
    'Cache-Control': 'no-cache',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  validateStatus: () => true,
};

export class OnChainPay {
  public base: BaseRequest;
  public account: AccountRequest;
  public address: AddressRequest;
  public blockchainAddress: BlockchainAddressRequest;
  public personalAddress: PersonalAddressRequest;
  public order: OrderRequest;
  public withdrawal: WithdrawalRequest;
  public invoice: InvoiceRequest;
  public autoSwap: AutoSwapRequest;
  public crosschainBridge: CrosschainBridgeRequest;
  public crosschainSwap: CrosschainSwapRequest;
  public recurringPayment: RecurringPaymentRequest;
  public kyt: KYTRequest;
  // public partnersAPI: PartnersAPIRequest;
  public webhook: WebhookRequest;
  public orphanTransaction: OrphanTransactionRequest;

  private axios = axios.create(<AxiosRequestConfig>{
    ...defaultAxiosOptions,
  });

  private nonce = Date.now();

  private advancedBalanceId: Promise<string>;

  constructor(private publicKey: string, private privateKey: string) {
    if (!publicKey) {
      throw new Error('Invalid PublicKey passed to constructor');
    }

    if (!privateKey) {
      throw new Error('Invalid PrivateKey passed to constructor');
    }

    this.base = new BaseRequest(this);
    this.account = new AccountRequest(this);
    this.address = new AddressRequest(this);
    this.blockchainAddress = new BlockchainAddressRequest(this);
    this.personalAddress = new PersonalAddressRequest(this);
    this.order = new OrderRequest(this);
    this.withdrawal = new WithdrawalRequest(this);
    this.invoice = new InvoiceRequest(this);
    this.autoSwap = new AutoSwapRequest(this);
    this.crosschainBridge = new CrosschainBridgeRequest(this);
    this.crosschainSwap = new CrosschainSwapRequest(this);
    this.recurringPayment = new RecurringPaymentRequest(this);
    this.kyt = new KYTRequest(this);
    // this.partnersAPI = new PartnersAPIRequest(this);
    this.webhook = new WebhookRequest(this);
    this.orphanTransaction = new OrphanTransactionRequest(this);

    this.advancedBalanceId = new Promise(async resolve => {
      const advancedBalances = await this.account.getBalances();

      if(!advancedBalances.success) {
        return resolve('');
      }

      resolve(advancedBalances.response[0].advancedBalanceId);
    });
  }

  makeSignature(data: string): string {
    return crypto.createHmac('sha256', this.privateKey).update(data).digest('hex');
  }

  async makeRequest<T = any>(url: string, body: any = {}): OCPResponse<T> {
    body.nonce = this.nonce++;
    body.advancedBalanceId = await this.advancedBalanceId;

    const data = JSON.stringify(body);
    const sign = this.makeSignature(data);

    const response = await this.axios.post(url, data, {
      headers: {
        'x-api-public-key': this.publicKey,
        'x-api-signature': sign,
        'content-type': 'application/json'
      },
    });

    if(typeof response.data !== 'object' || response.data === null) {
      return {
        success: false,
        error: {
          code: -1,
          name: 'UNKNOWN_ERROR',
          message: 'Unknown API response',
        },
      };
    }

    return response.data;
  }
}
