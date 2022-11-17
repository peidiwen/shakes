import axios from "axios";
import { useUsrstore } from "./Store";
import { useRouter } from "vue-router";
const store = useUsrstore();
const router = useRouter();
const axiosConf = {
    baseURL: "http://43.139.129.150:8088",
    Headers: {
        "Content-type": "application/json",
    },
};

export const baseAxios = axios.create(axiosConf);
baseAxios.interceptors.request.use((conf) => {
    if (conf.url !== "/Login") {
        conf.headers!.Authorization = `Bearer ${store.$state.token}`;
    }
    return conf;
});
baseAxios.interceptors.response.use(
    (conf) => {
        return conf;
    },
    (err) => {
        if (err.response.status === 401) {
            router.push({ path: "/Login" });
        }
        return Promise.reject(err.response.data);
    }
);
