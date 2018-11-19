<template>
        <div class="navigationList">
            <router-link class="navigationItem down" to="/momentsWithStatus/dislike">
                <font-awesome-icon icon="thumbs-down" />
            </router-link>
            <router-link class="navigationItem all" to="/momentsList">
                <font-awesome-icon icon="fire" />
            </router-link>
            <router-link class="navigationItem up" to="/momentsWithStatus/like">
                <font-awesome-icon icon="thumbs-up" />
            </router-link>
        </div>
</template>

<script>
    export default {
        name: "navigation"
    }
</script>

<style scoped>

</style>