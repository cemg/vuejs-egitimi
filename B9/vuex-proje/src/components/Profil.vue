<template>
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">
                {{ adSoyad }}
            </h5>
            <p class="card-text">{{ $store.state.kullaniciModule.aktifKullanici.Unvan }}</p>
            <p class="card-text">
                {{ $store.state.kullaniciModule.aktifKullanici.BegeniSayisi }} beğenisi var
            </p>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        name: 'Profil',
        computed: mapGetters(['adSoyad'])
    }
</script>