<template>
    <div class="terminal white--text" v-on:keyup="handleKey(key)">
        <div class="terminal-header">
            Terminal@website : ~
        </div>
        <div class="terminal-input">
            <div>
                <font color="green">user@florentin-bonnay.website</font>:
                <font color="blue">~</font>$
            </div>
            <b style="padding-left: 2vh;">{{ this.userInput }}</b>
            <div class="typewriter"><b></b></div>
            <div v-if="userInput == ''" class="input-placeholder">Tapez help</div>
        </div>
        <div class="terminal-menu">
            <div class="terminal-menu-item" v-for="item in commands" :key="item.name">
                <v-btn outlined large color="teal" class="menu-btn" @click="userCommand = item.name">
                    <v-icon :color="item.color" x-large>{{ item.icon }}</v-icon>
                    <p v-if="showHelp">{{ item.name }}</p>
                </v-btn>
            </div>
        </div>
        <terminal-response @gem-found="gemFound" @show-help="showHelper" :command="userCommand"></terminal-response>
    </div>
</template>
<script>
import TerminalResponse from './TerminalResponse';

export default {
    name: 'Terminal',
    components: {
        TerminalResponse
    },
    data() {
        return {
            userInput: '',
            showHelp: false,
            userCommand: '',
            commands: [
                {
                    name: 'help',
                    icon: 'mdi-help',
                    color: 'white',
                },
                {
                    name: 'gem',
                    icon: 'mdi-cards-diamond',
                    color: 'red',
                },
                {
                    name: 'whoami',
                    icon: 'mdi-account-circle',
                    color: 'white',
                },
                {
                    name: 'contact',
                    icon: 'mdi-at',
                    color: 'white',
                },
                {
                    name: 'next',
                    icon: 'mdi-arrow-down-circle-outline',
                    color: 'blue',
                }
            ]
        }
    },
    props: {
        isActive: Boolean
    },
    methods: {
        doCommand(e) {
            if(e.keyCode == 8)
                this.userInput = this.userInput.slice(0, -1);
            else if(e.keyCode == 13) {
                this.userCommand = this.userInput;
                this.userInput = '';
            } else if (e.keyCode >= 65 && e.keyCode <= 90)
                this.userInput += String.fromCharCode(e.keyCode).toLowerCase();        
        },
        gemFound(color) {
            this.$emit('gem-found', color);
        },
        showHelper() {
            this.showHelp = !this.showHelp;
            console.log(this.showHelp)
        }
    },
    watch: { 
        isActive: function(newVal) {
            if(newVal)
                window.addEventListener('keyup', this.doCommand);
            else
                window.removeEventListener('keyup', this.doCommand);
        },
    }
}
</script>
<style scoped>
.terminal {
    background: #272935;
    width: 90%;
    height: 90%;
    border-radius: 2vh;
    font-size: 3vh;
}

.terminal-header {
    width: 100%;
    height: 5vh;
    background: lightslategray;
    border-top-left-radius: 2vh;
    border-top-right-radius: 2vh;
    font: bold;
    text-align: center;
}

.terminal-input {
    padding-left: 5vh;
    padding-top: 5vh;
    display: inline-flex;
}

.input-placeholder {
    font-size: 3vh;
    color: grey;
}

.terminal-menu {
    position: absolute;
    right: 20vh;
}

.terminal-menu-item {
    padding: 2vh;
}

.menu-btn {
    height: 7vh !important;
}

/** TYPEWRITER EFFECT */
.typewriter b {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: .10em solid white; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: .15em; /* Adjust as needed */
  animation: 
    typing 2.5s steps(40, end),
    blink-caret .75s step-end infinite;
}

/* The typing effect */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: white; }
}
/** END TYPEWRITER EFFECT */
</style>