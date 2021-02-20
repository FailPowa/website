<template>
    <v-container id="second-layer" fluid fill-height>
        <v-layout justify-center align-center column pa-5>
            <terminal @gem-found="gemFound" :is-active="isActive"></terminal>
        </v-layout>
    </v-container>
</template>
<script>
import Terminal from './Terminal/Terminal'

export default {
    name: 'SecondLayer',
    components: {
        Terminal
    },
    data() {
        return {
            scrollPosition: null,
            isActive: false
        }
    },
    methods: {
        updateScroll() {
            this.scrollPosition = window.scrollY;
            if(this.scrollPosition >= 500 && this.scrollPosition <= 1200)
                this.isActive = true;
            else
                this.isActive = false;
        },
        gemFound(color) {
            this.$emit('gem-found', color);
        }
    },
    mounted() {
        window.addEventListener('scroll', this.updateScroll);
    }
}
</script>
<style scoped>
</style>