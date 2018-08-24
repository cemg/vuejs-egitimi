var app = new Vue({
  el: '#app',
  data: {
    kalkis_noktasi: '',
    varis_noktasi: '',
    gidis_tarihi: '',
	hareket_noktalari: [],
	
    seferler: [],
    bulunan_seferler: [],
    secilen_sefer: {},
    koltuklar: [],
    bulunan_koltuklar: [],
    secilen_koltuklar: [],
    isLoading: true,
  },
  created() {
    fetch('db.json')
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        this.hareket_noktalari = res.hareket_noktalari;
        this.seferler = res.seferler;
        this.koltuklar = res.koltuklar;
        this.isLoading = false;
      })
  },
  computed: {

  },
  methods: {
    sefer_ara() {
      this.bulunan_seferler = this.seferler.filter(x =>
        x.kalkis_noktasi === this.kalkis_noktasi &&
        x.varis_noktasi === this.varis_noktasi &&
        this.getTarih(x.kalkis_tarihi) === this.getTarih(this.gidis_tarihi));
    },
    sefer_sec(sefer_id) {
      this.secilen_sefer = this.bulunan_seferler.find(x => x.id === sefer_id);
      this.bulunan_koltuklar = this.koltuklar.filter(x => x.sefer_id === sefer_id);
    },
    koltuk_sec(koltuk_id) {
      let koltuk = this.bulunan_koltuklar.find(x => x.id === koltuk_id);
      koltuk.durum = koltuk.durum === 0 ? 2 : 0;
      if (koltuk.durum === 0)
        this.secilen_koltuklar = this.secilen_koltuklar.filter(x => x.id !== koltuk.id);
      else
        this.secilen_koltuklar.push(koltuk);
    },
    getKoltukList(tip, konum) {
      return this.bulunan_koltuklar.filter(x => x.tip === tip && x.konum === konum);
    },
    getTarih(val) {
		var tarihsaat = new Date(val);
		var tarih = tarihsaat.getFullYear() + '-' + ('0' + tarihsaat.getMonth()).slice(-2) + '-' + ('0' + tarihsaat.getDate()).slice(-2);
		return tarih;
	},
	getSaat(val) {
		var tarihsaat = new Date(val);
		var saat = ('0' + tarihsaat.getHours()).slice(-2) + ':' + ('0' + tarihsaat.getMinutes()).slice(-2);
		return saat;
	},
    odeme_yap() {
      alert('Ödemeniz alındı.');
    }
  }
})