<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="card" style="width: 18rem;" v-if="profilResmi">
                    <img class="card-img-top" :src="profilResmi" alt="Profil Resmi">
                    <div class="card-body">
                        <h5 class="card-title">
                            {{ adSoyad }}
                            <span class="badge badge-success" v-if="populerMi">Popüler</span>
                        </h5>
                        <p class="card-text">{{ $store.state.kullaniciModule.aktifKullanici.Unvan }}</p>
                        <p class="card-text">
                            {{ $store.state.kullaniciModule.aktifKullanici.BegeniSayisi }} beğenisi var
                        </p>
                    </div>
                </div>
            </div>
            <div class="col">
                <profil></profil>
            </div>
            <div class="col">
                <profil></profil>
            </div>
        </div>

        <hr>

        <button @click="KullaniciAyarla" class="btn btn-primary mr-2">Kullanıcı Ayarla</button>
        <button @click="BegeniArtir" class="btn btn-success mr-1">Beğeni Artır</button>
        <button @click="BegeniArtirAsync" class="btn btn-success mr-1">Beğeni Artır (Async)</button>
        <button @click="BegeniAzalt" class="btn btn-danger">Beğeni Azalt</button>

    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import Profil from './components/Profil'

    export default {
        name: 'app',
        components: {Profil},
        created() {
            this.$store.commit('KullaniciAyarla');
        },
        computed: {
            profilResmi() {
                if (this.$store.state.kullaniciModule.aktifKullanici.ProfilResmi)
                    return require('./assets/' + this.$store.state.kullaniciModule.aktifKullanici.ProfilResmi);
            },
            ...mapGetters(['populerMi', 'adSoyad'])
        },
        methods: {
            BegeniArtir() {
                this.$store.dispatch('BegeniArtir', {deger: 1})
            },
            BegeniArtirAsync() {
                this.$store.dispatch('BegeniArtirAsync', {deger: 1})
            },
            ...mapActions([
                'KullaniciAyarla',
                'BegeniAzalt'
            ])
        }
        /*methods: {
            KullaniciAyarla() {
                //this.$store.commit('KullaniciAyarla');
                this.$store.dispatch('KullaniciAyarla').then(() => {});
            },
            BegeniArtir() {
                //this.$store.commit('BegeniArtir', { deger: 1 });
                this.$store.dispatch('BegeniArtir', { deger: 1 })
            },
            BegeniAzalt() {
                //this.$store.commit('BegeniAzalt');
                this.$store.dispatch('BegeniAzalt');
            },
            BegeniArtirAsync() {
                this.$store.dispatch('BegeniArtirAsync', { deger: 1 })
            }
        },*/
    }
</script>

<style>
    @import url(https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css);
</style>