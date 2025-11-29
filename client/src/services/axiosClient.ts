import axios from 'axios';


const clientConfig = {
  baseURL: "https://fteluhaoexouutmtrcas.supabase.co/rest/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "apiKey": "sb_publishable_NZhEVWBOlhXsHg5LlL-ZRQ_6JoZr82e",
    "Accept": "application/json"
  },
  transformResponse: [(data: string) => {
    if (data) return JSON.parse(data)
  }]
};

export const authorizedClient = axios.create(clientConfig);
