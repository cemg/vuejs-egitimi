<template>
    <div class="container">
        <h2>Koltuk Seçimi</h2>
        <table class="table table-bordered text-center">
            <tr>
                <td v-for="item in getKoltukList('Çiftli', 'Cam Kenarı')">
                    <button :class="{'koltuk': item.durum === 0, 'koltuk koltuk-dolu': item.durum === 1, 'koltuk koltuk-rez': item.durum === 2}"
                            :disabled="item.durum === 1"
                            @click="koltuk_sec(item.id)">
                        {{ item.numara }}
                    </button>
                </td>
            </tr>
            <tr>
                <td v-for="item in getKoltukList('Çiftli', 'Koridor')">
                    <button :class="{'koltuk': item.durum === 0, 'koltuk koltuk-dolu': item.durum === 1, 'koltuk koltuk-rez': item.durum === 2}"
                            :disabled="item.durum === 1"
                            @click="koltuk_sec(item.id)">
                        {{ item.numara }}
                    </button>
                </td>
            </tr>
            <tr>
                <td colspan="20"></td>
            </tr>
            <tr>
                <td v-for="item in getKoltukList('Tekli', 'Cam Kenarı')">
                    <button :class="{'koltuk': item.durum === 0, 'koltuk koltuk-dolu': item.durum === 1, 'koltuk koltuk-rez': item.durum === 2}"
                            :disabled="item.durum === 1"
                            @click="koltuk_sec(item.id)">
                        {{ item.numara }}
                    </button>
                </td>
            </tr>
        </table>

        <button class="btn btn-success float-right"
                @click="yolcu_bilgileri_gir" v-if="secilen_koltuklar.length>0">
            Yolcu Bilgilerini Gir
        </button>
    </div>
</template>

<script>
    import db from '../assets/db.json';
    import {GlobalData} from '../main';

    export default {
        data() {
            return {
                seferler: [],
                koltuklar: [],
                bulunan_koltuklar: [],
                secilen_koltuklar: [],
                secilen_sefer: {}
            }
        },
        created() {
            this.seferler = db.seferler;
            this.koltuklar = db.koltuklar;

            this.fetchKoltuklar();
        },
        methods: {
            fetchKoltuklar() {
                let sefer_id;
                if (this.$route.params.sefer_id)
                    sefer_id = parseInt(this.$route.params.sefer_id);
                else if (GlobalData.secilen_sefer!=null && GlobalData.secilen_sefer.id)
                    sefer_id = parseInt(GlobalData.secilen_sefer.id);
                else
                    this.$router.push({name: 'seferara'});

                this.secilen_sefer = this.seferler.find(x=>x.id === sefer_id);
                this.bulunan_koltuklar = this.koltuklar.filter(k=>k.sefer_id === sefer_id);
            },
            getKoltukList(tip, konum) {
                return this.bulunan_koltuklar.filter(k => k.tip === tip && k.konum === konum);
            },
            koltuk_sec(koltuk_id) {
                let koltuk = this.bulunan_koltuklar.find(k=>k.id === koltuk_id);
                koltuk.durum = koltuk.durum === 0 ? 2 : 0;
                if (koltuk.durum === 0)
                    this.secilen_koltuklar = this.secilen_koltuklar.filter(k=>k.id !== koltuk_id);
                else
                    this.secilen_koltuklar.push(koltuk);
            },
            yolcu_bilgileri_gir() {
                GlobalData.secilen_sefer = this.secilen_sefer;
                GlobalData.secilen_koltuklar = this.secilen_koltuklar;
                this.$router.push({name: 'yolcubilgileri'});
            }
        }
    }
</script>

<style>
    .koltuk {
        background: url(../assets/img/koltuk-bos.svg) no-repeat;
        background-size: contain !important;
        display: inline-block;
        width: 56px;
        height: 70px;
        line-height: 70px;
        font-weight: bold;
        text-align: center;
        color: #555;
        border: 0;
        text-decoration: none !important;
        cursor: pointer;
        font-size: 20px;
        padding-right: 5px;
        margin: 5px 5px 5px 3px;
    }

    .koltuk-rez {
        background: url(../assets/img/koltuk-rez.svg) no-repeat;
        color: #fff !important;
    }

    .koltuk-dolu {
        background: url(../assets/img/koltuk-dolu.svg) no-repeat;
        color: #fff !important;
    }
</style>