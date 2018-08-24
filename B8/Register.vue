<div class="container">
    <div class="row">
        <form class="col-4 mx-auto" @submit.prevent="register">
            <h3>Kaydol</h3>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" placeholder="Email" class="form-control">
            </div>
            <div class="form-group">
                <label for="password">Şifre</label>
                <input type="password" id="password" v-model="password" placeholder="Şifre" class="form-control">
            </div>
            <div class="form-group">
                <label for="password2">Şifre Tekrarı</label>
                <input type="password" id="password2" v-model="password2" placeholder="Şifre Tekrarı" class="form-control">
            </div>
            <button type="submit" class="btn btn-success">Kaydol</button>
            <router-link to="/login">Giriş yap</router-link>
        </form>
    </div>
</div>