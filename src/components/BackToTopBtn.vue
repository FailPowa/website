<template>
    <div v-if="active" class="back-top-button animate__animated animate__fadeInDown">
        <v-btn @click="scroll('first-layer')" fab outlined large color="grey lighten-4">
            <v-icon large color="blue-grey lighten-3">mdi-arrow-up-drop-circle</v-icon>
        </v-btn>
    </div>
</template>
<script>
export default {
    name: 'BackToTopBtn',
    props: {
        active: Boolean
    },
    methods: {
        scroll(id) {
            document.getElementById(id).scrollIntoView({
            behavior: "smooth"
            });
        }
    }
}
</script>
<style scoped>
.back-top-button {
    width: fit-content;
    height: fit-content;
    position: fixed;
    right: 2vh;
    top: 10vh;
}
</style>