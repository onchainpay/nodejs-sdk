import * as crypto from 'node:crypto';

export type PartialOCPHeaders = {
  'x-api-public-key': string;
  'x-api-signature': string;
};

export class Nonce {
  private innerValue: number;

  constructor() {
    this.innerValue = Date.now();
  }

  public increment(): void {
    this.innerValue++;
  }

  public valueOf(): number {
    return this.innerValue;
  }
}

export class DataBuilder {
  private pair: object | null;
  private nonce: Nonce;
  private data: object;
  private dataString: string;

  constructor(pair: object | null = null) {
    this.pair = pair || {};
    this.nonce = new Nonce();
    this.nonce.increment();
    this.data = { ...this.pair, nonce: this.nonce.valueOf() };
    this.dataString = JSON.stringify(this.data);
  }

  valueOf(): object {
    return this.data;
  }

  toString(): string {
    return this.dataString;
  }
}

export class CustomHeaderBuilder {
  private publicKey: string;
  private privateKey: string;
  private data: DataBuilder | object;

  constructor(publicKey: string, privateKey: string) {
    if (!publicKey) {
      throw new Error('Invalid PublicKey passed to constructor');
    }

    if (!privateKey) {
      throw new Error('Invalid PrivateKey passed to constructor');
    }

    this.publicKey = publicKey;
    this.privateKey = privateKey;
    this.data = {};
  }

  setData(data: DataBuilder): void {
    this.data = data;
  }

  valueOf(): PartialOCPHeaders {
    return {
      'x-api-public-key': this.publicKey,
      'x-api-signature': crypto.createHmac('sha256', this.privateKey).update(this.data.toString()).digest('hex'),
    };
  }
}
