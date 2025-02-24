<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

const name = ref("");
const password = ref("");
const token = ref("");

async function submit() {
    console.log(name, password);
    token.value = await login(name.value, password.value);
}

async function login(name: string, password: string): Promise<string> {
    try {
        const response = await axios.post('http://localhost:8081/login', { name, password });
        console.log('login response:', response);
        return response.data.token;
    } catch (error) {
        console.error(error);
        return '';
    }
}
</script>

<template>
    <div>
        <div>
            Name:
            <input type="text" name="name" v-model="name" />
        </div>
        <div>
            Password:
            <input type="password" name="password" v-model="password" />
        </div>
        <div>
            Token:{{ token }}
        </div>
        <input type="button" @click="submit" />
    </div>
</template>