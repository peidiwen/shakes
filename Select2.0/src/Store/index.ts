import { defineStore, createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const useUsrstore = defineStore("usr", {
    state: () => {
        return {
            token: "" as string,
        };
    },
    persist: {
        storage: localStorage,
        paths: ["token"],
    },
});
export { pinia, useUsrstore };
