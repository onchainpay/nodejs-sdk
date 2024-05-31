import axios, { Axios, AxiosRequestConfig } from 'axios';

import { CustomHeaderBuilder } from './DataBuilder';

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
import PartnersAPIRequest from './request/PartnersAPIRequest';
import WebhookRequest from './request/WebhookRequest';
import OrphanTransactionRequest from './request/OrphanTransactionRequest';

const PRODUCTION_URL: string = 'https://ocp.onchainpay.io';

const defaultAxiosOptions: AxiosRequestConfig = {
  headers: {
    'Cache-Control': 'no-cache',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  validateStatus: function (status: number): boolean {
    return true;
  },
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
  public partnersAPI: PartnersAPIRequest;
  public webhook: WebhookRequest;
  public orphanTransaction: OrphanTransactionRequest;

  constructor(publicKey: string, privateKey: string) {
    if (!publicKey) {
      throw new Error('Invalid PublicKey passed to constructor');
    }

    if (!privateKey) {
      throw new Error('Invalid PrivateKey passed to constructor');
    }

    const headerBuilder: CustomHeaderBuilder = new CustomHeaderBuilder(publicKey, privateKey);
    const axiosInstance: Axios = axios.create(<AxiosRequestConfig>{
      ...defaultAxiosOptions,
      baseURL: PRODUCTION_URL,
    });

    this.base = new BaseRequest(axiosInstance, headerBuilder);
    this.account = new AccountRequest(axiosInstance, headerBuilder);
    this.address = new AddressRequest(axiosInstance, headerBuilder);
    this.blockchainAddress = new BlockchainAddressRequest(axiosInstance, headerBuilder);
    this.personalAddress = new PersonalAddressRequest(axiosInstance, headerBuilder);
    this.order = new OrderRequest(axiosInstance, headerBuilder);
    this.withdrawal = new WithdrawalRequest(axiosInstance, headerBuilder);
    this.invoice = new InvoiceRequest(axiosInstance, headerBuilder);
    this.autoSwap = new AutoSwapRequest(axiosInstance, headerBuilder);
    this.crosschainBridge = new CrosschainBridgeRequest(axiosInstance, headerBuilder);
    this.crosschainSwap = new CrosschainSwapRequest(axiosInstance, headerBuilder);
    this.recurringPayment = new RecurringPaymentRequest(axiosInstance, headerBuilder);
    this.kyt = new KYTRequest(axiosInstance, headerBuilder);
    this.partnersAPI = new PartnersAPIRequest(axiosInstance, headerBuilder);
    this.webhook = new WebhookRequest(axiosInstance, headerBuilder);
    this.orphanTransaction = new OrphanTransactionRequest(axiosInstance, headerBuilder);
  }
}
