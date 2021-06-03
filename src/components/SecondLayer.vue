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
    props: {
        active: Boolean
    },
    data() {
        return {
            scrollPosition: null,
            isActive: false
        }
    },
    methods: {
        gemFound(color) {
            this.$emit('gem-found', color);
        }
    },
    watch: {
        active: function(newVal) {
            this.isActive = newVal;
        }
    }
}
</script>