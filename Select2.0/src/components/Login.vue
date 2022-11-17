<template>
    <n-input-group :style="{ width: '300px' }">
        <n-input placeholder="请输入密码" v-model:value="password" :style="{ width: '200px' }" />
        <n-button type="primary" ghost @click="Login">
            登录
        </n-button>
    </n-input-group>
</template>
<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { baseAxios } from '../axiosCon'
import { useMessage } from 'naive-ui'
import { useRouter } from "vue-router";
import { useUsrstore } from "../Store/index";
import { getName } from "../data";
const message = useMessage();
const router = useRouter();
const store = useUsrstore();
let password = ref('');
function Login() {
    if (password.value.length != 0) {
        baseAxios.get('/api/password', {
            params: {
                password: password.value
            }
        }).then((res) => {
            message.success('登录成功');
            store.token = res.data.token
            getName();
            router.push('/shakes/Select');
        }).catch((err) => {
            message.error('密码错误')
        })
    } else {
        message.error('请输入');
    }
}

</script>