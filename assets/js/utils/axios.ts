import React from 'react';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://telemedi_recruitment_symfony.test/api/v1',
});

apiClient.interceptors.request.use(
  (config) => {
    config.headers['x-api-key'] = '2Ii3oFObje5m8208nDygIVJh0pSn3eq4ay5dDuRHl5A0ETLJ6r';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
