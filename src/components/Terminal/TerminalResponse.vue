<template>
    <div class="terminal-response">
        <div v-if="command == 'gem'">
            <v-icon color="red" class="animate__animated animate__bounce animate__infinite" x-large>mdi-cards-diamond</v-icon>
            <b>Bravo ! Tu as obtenu le premier cristal !</b>
        </div>
        <div v-if="command == 'whoami'">
            <b>whoami</b>
        </div>
        <div v-if="command == 'contact'">
            <b>contact</b>
        </div>
    </div>
</template>
<script>
export default {
    name: 'TerminalResponse',
    props: {
        command: String,
    },
    watch: {
        command: function(newVal) {
            switch(newVal) {
                case 'gem':
                    this.$emit('gem-found', 'red');
                    break;
                case 'next':
                    document.getElementById('third-layer').scrollIntoView({
                        behavior: "smooth"
                    });
                    break;
                case 'help':
                    this.$emit('show-help');
            }
        }
    }
}
</script>
<style scoped>
.terminal-response {
    padding: 5vh;
}
.red-gem {
    font-size: 30vh;
}
</style>