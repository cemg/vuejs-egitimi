<template>
    <div class="container">
        <div class="row">
            <form class="col-4 mx-auto" @submit.prevent="login">
                <h3>Giriş</h3>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="email" placeholder="Email" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="password">Şifre</label>
                    <input type="password" id="password" v-model="password" placeholder="Şifre" class="form-control" required>
                </div>
                <button class="btn btn-success">Giriş yap</button>
                <router-link to="/register">Kaydol</router-link>
            </form>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase'

    export default {
        name: 'login',
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            login() {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                    .then(
                        user => {
                            toastr.success('Kullanıcı girişi yapıldı.');
                            this.$router.replace('dashboard');
                        },
                        error => {
                            toastr.error(error.message);
                        }
                    )
            }
        }
    }
</script>