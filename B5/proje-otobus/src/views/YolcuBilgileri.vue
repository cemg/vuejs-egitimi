<template>
    <div class="container">
        <h2>Yolcu Bilgileri</h2>
        <form method="post" action="#" @submit.prevent="odeme_bilgileri">
            <div v-for="item in secilen_koltuklar" class="form-inline mb-2">
                <label class="mr-2" for="koltuk">Koltuk Numarası</label>
                <input type="text" class="form-control col-1 mr-3" v-model="item.numara" id="koltuk" readonly>
                <label class="mr-2" for="fiyat">Fiyat</label>
                <input type="text" class="form-control col-1 mr-3" v-model="secilen_sefer.bilet_fiyati" id="fiyat" readonly>
                <label class="mr-2" for="tck">TCK</label>
                <input type="text" class="form-control col-2 mr-3" name="tck" id="tck">
                <label class="mr-2" for="adsoyad">Ad Soyad</label>
                <input type="text" class="form-control col-2 mr-3" name="adsoyad" id="adsoyad">
                <label class="mr-2" for="cinsiyet">Cinsiyet</label>
                <input type="text" class="form-control col-1" name="cinsiyet" id="cinsiyet">
            </div>
            <button class="btn btn-success float-right">
                Ödeme Bilgilerini Gir
            </button>
        </form>
    </div>
</template>

<script>
    import {GlobalData} from '../main';

    export default {
        data() {
            return {
                secilen_sefer: {},
                secilen_koltuklar: []
            }
        },
        created() {
            if (GlobalData.secilen_sefer == null)
                this.$router.push({name: 'seferara'});

            this.secilen_sefer = GlobalData.secilen_sefer;
            this.secilen_koltuklar = GlobalData.secilen_koltuklar;
        },
        methods: {
            odeme_bilgileri() {
                this.$router.push({name: 'odemebilgileri'});
            }
        }
    }
</script>