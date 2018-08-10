const App = new Vue({
    el: '#app',
    data: {
        search: '',
        lastId: 0,
        item: {},
        allItems: [
            {"id": 1, "baslik": "Masa", "kategori": "Mobilya", "adet": "1", "fiyat": 259, "arsiv": false},
            {"id": 2, "baslik": "Kitaplık", "kategori": "Mobilya", "adet": "2", "fiyat": 159, "arsiv": false},
            {"id": 3, "baslik": "Monitor", "kategori": "Elektronik", "adet": "5", "fiyat": 400, "arsiv": true}
        ],
        filteredItems: []
    },
    created() {
        this.lastId = this.allItems.length;
        this.filteredItems = this.allItems;
    },
    computed: {
        activeItems() {
            return this.filteredItems.filter(i => i.arsiv === false);
        },
        archivedItems() {
            return this.filteredItems.filter(i => i.arsiv === true);
        },
        totalPriceActive() {
            let total = 0;
            this.activeItems.forEach((item) => {
                total += parseFloat(item.fiyat.toString());
            });
            return total.toFixed(2);
        },
        totalItemActive() {
            let total = 0;
            this.activeItems.forEach((item) => {
                total += parseInt(item.adet);
            });
            return total;
        },
        totalPriceArchive() {
            let total = 0;
            this.archivedItems.forEach((item) => {
                total += parseFloat(item.fiyat.toString());
            });
            return total.toFixed(2);
        },
        totalItemArchive() {
            let total = 0;
            this.archivedItems.forEach((item) => {
                total += parseInt(item.adet);
            });
            return total;
        }
    },
    methods: {
        saveItem() {
            Vue.set(this.item, 'id', ++this.lastId);
            Vue.set(this.item, 'arsiv', false);
            this.allItems.push(this.item);
            this.item = {};
        },
        changeItemStatus(item) {
            item.arsiv = !item.arsiv;
        },
        deleteItem(id) {
            let item = this.allItems.find(i => i.id === id);
            if (item != null)
                this.allItems = this.allItems.filter(i => i.id !== id);
        },
        searchItems() {
            this.filteredItems = [];
            if (this.search.length > 0) {
                this.allItems.forEach(i => {
                    if (i.baslik != null && i.baslik.includes(this.search))
                        this.filteredItems.push(i);
                });
            } else {
                this.filteredItems = this.allItems;
            }
        }
    }
});