import axios from "axios";

const instance = axios.create({
  //   baseURL: "http://134.209.242.76/api/"
  baseURL: "http://f6e92091.ngrok.io/api/"
});

export default instance;
