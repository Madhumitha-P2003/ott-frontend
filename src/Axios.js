import axios from "axios";
import { BaseUrl } from "./Constant/constant";
const instance = axios.create({
    baseURL: BaseUrl,
});

 export default instance

