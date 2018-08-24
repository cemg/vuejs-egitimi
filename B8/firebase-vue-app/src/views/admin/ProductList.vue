<template>
    <div class="container">
        <h1>Ürün Yönetimi</h1>

        <div class="card">
            <div class="card-header text-white bg-primary">
                {{ item['.key'] ? 'Düzenle' : 'Yeni' }}
            </div>
            <div class="card-body">
                <form method="post" class="form-inline" @submit.prevent="saveItem">
                    <div class="form-group mr-5">
                        <label for="title" class="mr-1">Başlık</label>
                        <input type="text" id="title" class="form-control" v-model="item.title" required>
                    </div>
                    <div class="form-group mr-5">
                        <label for="description" class="mr-1">Açıklama</label>
                        <input type="text" id="description" class="form-control" v-model="item.description">
                    </div>
                    <div class="form-group mr-5">
                        <label for="price" class="mr-1">Fiyat</label>
                        <input type="text" id="price" class="form-control" v-model="item.price">
                    </div>
                    <input type="submit" class="btn btn-primary" :value="item['.key'] ? 'Güncelle': 'Kaydet'">
                    <input type="button" class="btn btn-default" value="İptal" @click="clearItem">
                </form>
            </div>
        </div>

        <div class="card mt-5">
            <div class="card-header text-white bg-primary">
                Ürün Listesi
            </div>
            <div class="card-body">
                <table class="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th>Başlık</th>
                        <th>Açıklama</th>
                        <th>Fiyat</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="product in products" :key="product['.key']">
                        <td>{{product.title}}</td>
                        <td>{{product.description}}</td>
                        <td>{{product.price}}</td>
                        <td>
                            <a href="#" @click="editItem(product)" class="btn btn-sm btn-primary">
                                <i class="fa fa-edit"></i>
                            </a>
                            <a href="#" @click="deleteItem(product)" class="btn btn-sm btn-primary">
                                <i class="fa fa-trash"></i>
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import { db, productsRef } from '../../firebase'

    export default {
        name: 'products',
        data() {
            return {
                //products: []
                item: { title: '', description: '', price: 0 }
            }
        },
        firebase: {
            products: productsRef
        },
        /*mounted() {
            productsRef.once("value")
                .then(data => {
                    let obj = data.val();
                    for (let key in obj) {
                        this.products.push({
                            id: key,
                            title: obj[key].title,
                            description: obj[key].description,
                            price: obj[key].price
                        })
                    }
                })
        }*/
        methods: {
            saveItem() {
                let key = this.item['.key'];
                if (key) {
                    productsRef.child(key).update({
                        title: this.item.title,
                        description: this.item.description,
                        price: this.item.price
                    });
                    toastr.success('Ürün güncellendi');
                    this.clearItem();
                } else {
                    productsRef.push(this.item);
                    toastr.success('Ürün eklendi');
                    this.clearItem();
                }
            },
            clearItem() {
                this.item = { title: '', description: '', price: 0 };
            },
            editItem(product) {
                this.item = product;
            },
            deleteItem(product) {
                if (confirm('Emin misiniz?')) {
                    let key = product['.key'];
                    productsRef.child(key).remove();
                    toastr.success('Ürün silindi');
                }
            }
        }
    }
</script>