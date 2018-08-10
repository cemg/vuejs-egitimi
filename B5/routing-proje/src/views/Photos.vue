<template>
    <div class="container">
        <h1>Photos</h1>
        <div class="card" style="width: 18rem" v-if="photo">
            <img :src="photo.url" class="card-img-top">
            <div class="card-body">
                <p class="card-text">{{ photo.title }}</p>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                photo: null
            }
        },
        created() {
            this.fetchData();
        },
        watch: {
            $route: "fetchData"
        },
        methods: {
            fetchData() {
                fetch('http://jsonplaceholder.typicode.com/photos/' + this.$route.params.id)
                    .then(response => response.json())
                    .then(json => {
                        this.photo = json;
                    });
            }
        }

    }
</script>