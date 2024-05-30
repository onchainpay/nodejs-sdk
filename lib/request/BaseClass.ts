import { Axios } from 'axios';

import { CustomHeaderBuilder } from '../DataBuilder';

import { TNullableString } from '../types/Base';

export type OCPAPIResponse = {
  errors?: TNullableString,
  error?: TNullableString,
  //[key: string]: string | number | boolean | object
}

export type OCPAPIReturnType = Promise<OCPAPIResponse | string | boolean>;

export default class BaseClass {
  protected headerBuilder: CustomHeaderBuilder;
  protected axiosInstance: Axios;

  constructor(axiosInstance: Axios, headerBuilder: CustomHeaderBuilder) {
    this.headerBuilder = headerBuilder;
    this.axiosInstance = axiosInstance;
  }

  protected async exceptionWrapper(cb: Function): OCPAPIReturnType {
    try {
      return await cb();
    } catch (exp: any) {
      //console.log('Error occured', exp.message);
      throw new Error(exp.message);
    }
  }
}
