import axios from "axios";

const instance = axios.create({
  //   baseURL: "http://134.209.242.76/api/"
  baseURL: "http://6bd12e5d.ngrok.io/api/"
});

export default instance;
