import { createRouter, createWebHistory } from "vue-router";
const routes = [
    {
        name: "Login",
        path: "/shakes",
        component: () => import("../components/Login.vue"),
    },
    {
        name: "Select",
        path: "/shakes/Select",
        component: () => import("../components/Select.vue"),
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});
export default router;
