<script setup>
defineProps ({
    to : String,
    label: String})
</script>

<template>
    <router-link :to="to" class="nav-link">
        {{ label }}
    </router-link>
</template>

<style scoped>
.nav-link {
    text-decoration: none;
    padding: 10px;
    color : blue;
    transition: 0.4s;
    position: relative;
}

.nav-link:hover {
    color:yellow;
}
</style>