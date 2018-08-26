import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let storeObj = {
    state: {
        aktifKullanici: {
            Ad: 'Cem',
            Soyad: 'Gündüzoğlu',
            BegeniSayisi: 25
        }
    },
    getters: {
        adSoyad: state => state.aktifKullanici.Ad + ' ' + state.aktifKullanici.Soyad,
        populerMi: state => state.aktifKullanici.BegeniSayisi > 20
    }
};
export default new Vuex.Store(storeObj);