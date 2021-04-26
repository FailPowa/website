import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://192.168.1.14:8080/',
  headers: {
    "Accept-Language": "fr",
  },
});

export default instance;