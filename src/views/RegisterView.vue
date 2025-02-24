<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

const name = ref("");
const password = ref("");

function submit() {
    console.log(name.value, password.value);
    register(name.value, password.value);
}

async function register(name: string, password: string) {
    try {
        const response = await axios.post('http://localhost:8081/register', { name, password });
        console.log('register response:', response);
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
    <div class="auth-page">
        <div>
            Name:
            <input type="text" name="name" v-model="name" />
        </div>
        <div>
            Password:
            <input type="password" name="password" v-model="password" />
        </div>
        <input type="button" @click="submit" value="submit" />
    </div>
</template>