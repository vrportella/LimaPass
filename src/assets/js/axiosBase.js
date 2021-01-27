import axios from "axios";
import router from "@/router";
import store from "@/store";
import Vue from "vue";

export const baseInstanceAxios = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
});

const isAxiosHandlerEnabled = (config = {}) => {
    // eslint-disable-next-line
    return config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled ?
        false :
        true;
};

const requestAxiosHandler = (request) => {
    if (isAxiosHandlerEnabled(request)) {
        request.headers["Content-Type"] = "application/json";
        request.headers["Authorization"] = "Bearer " + store.state.auth_token;
    }
    return request;
};

const successAxiosHandler = (response) => {
    if (isAxiosHandlerEnabled(response.config)) {
        // Handle responses
    }
    return response;
};

const errorAxiosHandler = error => {
        Vue.prototype.$snotify.error
        Promise.reject(error);
    }
  
baseInstanceAxios.interceptors.request.use((request) =>
    requestAxiosHandler(request)
);

baseInstanceAxios.interceptors.response.use(
    (response) => successAxiosHandler(response),
    (error) => errorAxiosHandler(error)
);