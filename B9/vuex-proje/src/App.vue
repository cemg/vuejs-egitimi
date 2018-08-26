<template>
    <div class="container">
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="./assets/profile-cem.jpg" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">
                    {{ adSoyad }}
                    <span class="badge badge-success" v-if="populerMi">Popüler</span>
                </h5>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'app',
        computed: {
            adSoyad() {
                return this.$store.getters.adSoyad
            },
            populerMi() {
                return this.$store.getters.populerMi
            }
        }
    }
</script>

<style>
@import url(https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css);
</style>