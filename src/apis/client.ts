/*xử lý các yêu cầu mạng (network requests). Nó bao gồm việc thiết lập và quản lý token xác thực, 
đặt các thiết lập mặc định cho axios (thư viện HTTP client), và cung cấp các phương thức để thực 
hiện các yêu cầu GET, POST, PUT, DELETE và upload.
*/

import AsyncStorage from '@react-native-community/async-storage';
import axios, {AxiosRequestConfig} from 'axios';

export const setToken = async (accessToken: any) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  await AsyncStorage.setItem('access_token', `${accessToken}`);
};

export const clearToken = async () => {
  axios.defaults.headers.common['Authorization'] = '';
  await AsyncStorage.removeItem('accessToken');

  // ONLY WHEN SINGLE SCHOOL
};
export const setDomain = (domain: string) => {
  console.log('domain = ', domain);
  axios.defaults.baseURL = domain;
};

const requestAbordCode = 'ECONNABORTED';

axios.defaults.baseURL = '';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 30000;

const RequestClient = class {
  constructor() {
    this.init();
  }

  async init() {
    axios.defaults.headers.common['Authorization'] = await AsyncStorage.getItem(
      'accessToken',
    );
  }
  async headers(params: any) {
    let keys = Object.keys(params);
    keys.map(key => {
      axios.defaults.headers.common[key] = params[key];
    });
  }
  async get(endpoint: string, params = {}) {
    console.log('get = ', endpoint);
    try {
      const response = await axios.get(endpoint, {params: params});
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }
  async upload(endpoint: string, bodyParam: any) {
    console.log('upload = ', endpoint);
    try {
      let axiosConfig: AxiosRequestConfig = {
        headers: new Headers({
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'PUT, GET, POST',
          'Access-Control-Allow-Headers':
            'Origin, X-Requested-With, Content-Type, Accept',
        }),
      };
      const response = await axios.post(endpoint, bodyParam, axiosConfig);
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }
  async login(endpoint: string, bodyData: any) {
    console.log('login = ', endpoint);
    let response = await fetch(endpoint, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(bodyData),
    });
    return response;
  }
  async post(endpoint: string, body: {}, params = {}) {
    console.log('post = ', endpoint);
    try {
      const response = await axios.post(endpoint, body, params);
      return response;
    } catch (error) {
      this.handleError(error, axios.defaults.url);
    }
  }
  async put(endpoint: string, body: {}, params = {}) {
    console.log('put = ', endpoint);
    try {
      const response = await axios.put(endpoint, body, params);
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }
  async delete(endpoint: string, body: any,params:any) {
    console.log('delete = ', endpoint);
    try {
      const response = await axios.delete(endpoint, {data: body , params : params});
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }
  handleError(error: any, url?: string) {
    console.warn(error);
    if (error.response && error.response.status === 401) {
      //  store.dispatch({
      //      type:Actio
      //  });
    }
    if (
      error.code === requestAbordCode ||
      ('response' in error && error.response === undefined)
    ) {
      // delay(1000);
      error.recall = true;
    }
    throw error;
  }
};

const client = new RequestClient();

export {client};
