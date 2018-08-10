<template>
    <div>
        <user-modal :item="item" v-on:onSaved="refreshData" ref="userModal"></user-modal>

        <div class="btn-group float-right">
            <button @click="fetchData" class="btn btn-info">Yenile</button>
            <button @click="createData" class="btn btn-success">Yeni Kullanıcı</button>
        </div>

        <h1>Kullanıcılar</h1>
        <div v-if="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
        </div>

        <table class="table table-borderd table-hover" v-if="list && list.length">
            <tr>
                <th>Id</th>
                <th>İsim</th>
                <th>Email</th>
                <th>İşlem</th>
            </tr>
            <tr v-for="{ id, name, email } in list">
                <td>{{ id }}</td>
                <td>{{ name }}</td>
                <td>{{ email }}</td>
                <td>
                    <button @click="editData(id)" class="btn btn-success">Düzenle</button>
                    <button @click="deleteData(id)" class="btn btn-danger">Sil</button>
                </td>
            </tr>
        </table>
        <p v-else>Kayıt bulunamadı</p>
        <pagination :meta="meta" v-on:pageChange="fetchData"/>
    </div>
</template>

<script>
    import Pagination from '../../components/Pagination';
    import UserModal from './UserModal';

    export default {
        components: {Pagination, UserModal},
        data() {
            return {
                item: {},
                list: null,
                errorMessage: null,
                meta: {}
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData(page = 1) {
                this.errorMessage = null;
                this.list = null;
                axios.get("/users", {params: {page}})
                    .then(response => {
                        this.list = response.data.data;
                        this.meta = response.data.meta;
                    })
                    .catch(error => {
                        if (error.response != null)
                            this.errorMessage = error.response.data.message;
                        else
                            this.errorMessage = error.message;
                    });
            },
            createData() {
                this.item = {};
                this.$refs.userModal.errorMessage = '';
                $('#userModal').modal('show');
            },
            refreshData(item) {
                this.fetchData();
            },
            editData(id) {
                axios.get("/users/" + id)
                    .then(response => {
                        this.$refs.userModal.errorMessage = '';
                        this.item = response.data;
                        $('#userModal').modal('show');
                    })
                    .catch(error => {
                        if (error.response != null)
                            this.errorMessage = error.response.data.message;
                        else
                            this.errorMessage = error.message;
                    });
            },
            deleteData(id) {
                swal({
                    title: 'Emin misiniz?',
                    text: 'Silmek istediğinize emin misiniz?',
                    type: 'warning',
                    showCancelButton: 'true',
                    cancelButtonText: 'İptal',
                    confirmButtonText: 'Sil'
                }).then(result => {
                    if (result.value) {
                        axios.delete("/users/" + id)
                            .then(response => {
                                this.fetchData();
                                toastr.success('Kayıt silindi', 'Kullanıcı');
                            })
                            .catch(error => {
                                if (error.response != null)
                                    this.errorMessage = error.response.data.message;
                                else
                                    this.errorMessage = error.message;
                            });
                    }
                });
            }
        }
    }
</script>