import axios from "axios";

import config from '@/config'
import store from '@/store/login'

export default class BaseService {

    constructor() {
        
    }

    createAPI() {
        const API = axios.create({
            baseURL: config.baseUrl
        })
        return API
    }

    createAPISecured() {
        const API = axios.create({
            baseURL: config.baseUrl
        });
        API.interceptors.request.use(config => {
            if (config.baseURL.match(config.baseUrl)) {
              config.headers['authentication-token'] = store.state.token
            }
            return config
        }, err => Promise.reject(err))
        return API
    }
}