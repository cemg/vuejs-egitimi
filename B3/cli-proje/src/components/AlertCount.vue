<template>
    <div class="alert alert-success">
        Merhaba
        <button @click="count++" class="btn btn-sm btn-primary">
            {{ count }} kez tıkladın
        </button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                count: 0
            }
        }
    }
</script>