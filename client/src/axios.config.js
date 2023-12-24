import axios from "axios";
import { CiLineHeight } from "react-icons/ci";
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
})
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent 
    let localStorageData = window.localStorage.getItem('persist:auth') 
    if (localStorageData) {

      const persist = JSON.parse(localStorageData)
      const token = JSON.parse(persist?.token)  
      config.headers = {
        authorization: `Bearer ${token?.access_token}`
      }
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});
export default instance