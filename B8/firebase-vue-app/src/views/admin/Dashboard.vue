<template>
    <div class="container">
        <h1>Dashboard</h1>
        <p v-if="currentUser">{{ currentUser.email }} olarak giriş yaptınız...</p>
    </div>
</template>

<script>
    import firebase from 'firebase'

    export default {
        name: 'dashboard',
        data() {
            return {
                currentUser: {}
            }
        },
        mounted() {
            this.currentUser = firebase.auth().currentUser;
        }
    }
</script>