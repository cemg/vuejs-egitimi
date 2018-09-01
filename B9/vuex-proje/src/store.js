import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let storeObj = {
    state: {
        aktifKullanici: {}
    },
    getters: {
        adSoyad: state => state.aktifKullanici.Ad + ' ' + state.aktifKullanici.Soyad,
        populerMi: state => state.aktifKullanici.BegeniSayisi > 20
    },
    mutations: {
        KullaniciAyarla(state) {
            state.aktifKullanici = {
                Ad: 'Cem',
                Soyad: 'Gündüzoğlu',
                Unvan: 'Yazılım Geliştirme Uzmanı',
                BegeniSayisi: 25,
                ProfilResmi: 'profile-cem.jpg'
            };
        },
        BegeniArtir(state, payload) {
            state.aktifKullanici.BegeniSayisi += payload.deger;
        },
        BegeniAzalt(state) {
            state.aktifKullanici.BegeniSayisi--;
        }
    },
    actions: {
        KullaniciAyarla(context) {
            context.commit('KullaniciAyarla');
        },
        BegeniArtir: ({commit}, payload) => commit('BegeniArtir', payload),
        BegeniAzalt({commit, state}) {
            if (state.aktifKullanici.BegeniSayisi > 0)
                commit('BegeniAzalt');
        },
        BegeniArtirAsync({ commit }, payload) {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                commit('BegeniArtir', payload);
                resolve();
              }, 3000);
            })
        }
    }
};
export default new Vuex.Store({
    modules: {
        kullaniciModule: storeObj
    }
});