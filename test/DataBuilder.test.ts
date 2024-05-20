import * as crypto from 'node:crypto';
import {config} from 'dotenv';
import {Nonce, PartialOCPHeaders, DataBuilder, CustomHeaderBuilder} from '../lib/DataBuilder';
//import supertest from 'supertest';

describe('DataBuilder:Nonce tests', ():void => {
  it('Nonce', ():void => {
    const nonce:Nonce = new Nonce();
    const timestamp = nonce.valueOf();

    expect(nonce).toBeInstanceOf(Nonce);
    expect(timestamp).toBe(timestamp);

    nonce.increment();

    expect(nonce.valueOf()).toBe(timestamp + 1);
  });
});

describe('DataBuilder:DataBuilder tests', ():void => {

  it('DataBuilder:empty', ():void => {
    const db:DataBuilder = new DataBuilder();

    expect(db).toBeInstanceOf(DataBuilder);
    expect(db.valueOf()).toHaveProperty('nonce');
    expect(db.toString()).toMatch(/\{\"nonce\"\:\s?\d+\}/);
  });

  it('DataBuilder:several types of data pair', ():void => {
    const db:DataBuilder = new DataBuilder({prop1: 'lorem ipsum del si amet!', prop2: 9293273283823, prop3: true, prop4: null, prop5: undefined});
    const defaultValue: object = db.valueOf();
    expect(db).toBeInstanceOf(DataBuilder);
    expect(defaultValue).toHaveProperty('nonce');
    expect(defaultValue).toHaveProperty('prop1', 'lorem ipsum del si amet!');
    expect(defaultValue).toHaveProperty('prop2', 9293273283823);
    expect(defaultValue).toHaveProperty('prop3', true);
    expect(defaultValue).toHaveProperty('prop4', null);
    expect(defaultValue).toHaveProperty('prop5', undefined);
    expect(db.toString()).toMatch(/\{\"prop1\"\:\s?\"|\'lorem ipsum del si amet!\"|\'\,\s?\"prop2\"\:\s?9293273283823\s?\,\s?\"prop3\"\:\s?true\s?\,\s?\"prop4\"\:\s?null\s?\,\s?\"prop5\"\:\s?undefined\s?\,\s?\"nonce\"\:\s?\d+\s?\,\}/);
  });
});

describe('DataBuilder:CustomHeaderBuilder tests', ():void => {
  config();
  const publicKey: string = process.env.PUBLIC_KEY || '';
  const privateKey: string = process.env.PRIVATE_KEY || '';

  it('CustomHeaderBuilder:without keys', ():void => {    
    try {
      const headerBuilder:CustomHeaderBuilder = new CustomHeaderBuilder('', '');
    } catch(exp: any) {
      expect(exp).toBeInstanceOf(Error);
      expect(exp).toHaveProperty('message', 'Invalid PublicKey passed to constructor');
    }

    try {
      const headerBuilder:CustomHeaderBuilder = new CustomHeaderBuilder(publicKey, '');
    } catch(exp: any) {
      expect(exp).toBeInstanceOf(Error);
      expect(exp).toHaveProperty('message', 'Invalid PrivateKey passed to constructor');
    }
  });

  it('CustomHeaderBuilder:with keys', ():void => {
    const headerBuilder:CustomHeaderBuilder = new CustomHeaderBuilder(publicKey, privateKey);
    const db: DataBuilder = new DataBuilder({prop1: 'lorem ipsum del si amet!', prop2: 9293273283823, prop3: true, prop4: null, prop5: undefined, prop6: 'bla-bla'});
    headerBuilder.setData(db);
    const partialHeaders: PartialOCPHeaders = headerBuilder.valueOf();
    const hash = crypto.createHmac('sha256', privateKey).update(db.toString()).digest('hex');

    expect(headerBuilder).toBeInstanceOf(CustomHeaderBuilder);
    expect(partialHeaders).toHaveProperty('x-api-public-key', publicKey);
    expect(partialHeaders).toHaveProperty('x-api-signature', hash);
  });
});
