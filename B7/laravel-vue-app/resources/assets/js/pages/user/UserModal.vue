<template>
    <div class="modal fade" tabindex="-1" role="dialog" id="userModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-text="item.id>0?'Kullanıcı Düzenle':'Yeni Kullanıcı'"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div v-if="errorMessage" class="alert alert-danger" v-html="errorMessage"></div>
                    <form @submit.prevent="true">
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">kullanıcı adı</label>
                            <div class="col-sm-9">
                                <input type="text" v-model="item.name" class="form-control">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">şifre</label>
                            <div class="col-sm-9">
                                <input type="password" v-model="item.password" class="form-control">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">email</label>
                            <div class="col-sm-9">
                                <input type="email" v-model="item.email" class="form-control">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" v-text="item.id>0?'Güncelle':'Kaydet'" @click="saveItem"></button>
                    <button class="btn btn-secondary" data-dismiss="modal">Kapat</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['item'],
        data() {
            return {
                errorMessage: ''
            }
        },
        methods: {
            saveItem() {
                if (this.item.id>0) {
                    axios.put('/users/' + this.item.id, this.item)
                        .then(response => {
                            if (response.data.success) {
                                this.$emit('onSaved', this.item);
                                $('#userModal').modal('hide');
                                toastr.success('Kayıt güncellendi', 'Kullanıcı');
                            }
                        })
                        .catch(error => {
                            this.errorMessage = error.response.data.message;
                            if (error.response.data.errors) {
                                this.errorMessage += "<ul>";
                                Object.keys(error.response.data.errors).forEach((key) => {
                                    this.errorMessage += "<li>" + error.response.data.errors[key][0] + "</li>";
                                });
                                this.errorMessage += "</ul>";
                            }
                        });
                } else {
                    axios.post('/users', this.item)
                        .then(response => {
                            if (response.data.success) {
                                this.$emit('onSaved', this.item);
                                $('#userModal').modal('hide');
                                toastr.success('Kayıt eklendi', 'Kullanıcı');
                            }
                        })
                        .catch(error => {
                            this.errorMessage = error.response.data.message;
                            if (error.response.data.errors) {
                                this.errorMessage += "<ul>";
                                Object.keys(error.response.data.errors).forEach((key) => {
                                    this.errorMessage += "<li>" + error.response.data.errors[key][0] + "</li>";
                                });
                                this.errorMessage += "</ul>";
                            }
                        });
                }
            }
        }
    };
</script>
