import axios from "axios";

const instance = axios.create({
  baseURL: "https://gogota.duckdns.org:3000/",
});
export default instance;
