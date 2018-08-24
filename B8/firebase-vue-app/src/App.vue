<template>
    <div id="app">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-2">
            <div class="container">
                <a class="navbar-brand" href="#">Laravel Vue App</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link to="/home" class="nav-link">Anasayfa</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/dashboard" class="nav-link">Gösterge Paneli</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/users" class="nav-link">Kullanıcılar</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/products" class="nav-link">Ürünler</router-link>
                        </li>
                    </ul>

                    <ul class="navbar-nav ml-auto" v-if="!currentUser">
                        <li class="nav-item">
                            <router-link to="/login" class="nav-link">Giriş</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/register" class="nav-link">Kaydol</router-link>
                        </li>
                    </ul>
                    <ul class="navbar-nav ml-auto" v-if="currentUser">
                        <li class="nav-item">
                            <a href="#" class="nav-link">{{ currentUser.email }}</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" @click="logout" class="nav-link">Çıkış yap</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <router-view/>
    </div>
</template>

<script>
    import firebase from 'firebase'

    export default {
        name: 'App',
        data() {
            return {
                currentUser: {}
            }
        },
        mounted() {
            this.currentUser = firebase.auth().currentUser;
        },
        methods: {
            logout() {
                firebase.auth().signOut()
                    .then(() => {
                        this.$router.replace('login');
                        this.currentUser = null;
                    })
            }
        }
    }
</script>

<style lang="scss">
    @import '~bootstrap/scss/bootstrap.scss';
    @import '~toastr/toastr.scss';
    @import url("https://fonts.googleapis.com/css?family=Raleway:300,400,600");
    @import url("https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

    html, body {
        font-family: 'Raleway', sans-serif;
    }
    nav {
        margin-bottom: 20px;
    }
</style>
