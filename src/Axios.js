import axios from "axios";
import { BasrUrl } from "./Constant/constant";
const instance = axios.create({
    baseURL: BasrUrl,
});

 export default instance

