import { baseAxios } from "./axiosCon";

interface datamsg {
    name: string;
}
export let max: number;
export let data: Array<datamsg> = [];
export function getName() {
    baseAxios.get("/getName").then((res) => {
        data = res.data.name;
        max = res.data.count;
    });
}
