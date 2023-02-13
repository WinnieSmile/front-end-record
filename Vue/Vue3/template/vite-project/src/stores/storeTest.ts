// 定义store，在pinia中已经去除了mutaions
import { defineStore } from "pinia"
const useStore = defineStore("storeTest", {
    state: () => ({
        count: 0,
        msg: "hello world",
    }),
    getters: {},
    actions: {},
})
export default useStore

