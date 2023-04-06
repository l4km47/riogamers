import axios from "axios";

const instance = axios.create({
  baseURL: "http://146.190.104.163:3000/",
});
export default instance;
