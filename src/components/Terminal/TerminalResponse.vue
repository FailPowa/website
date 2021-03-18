<template>
    <div class="terminal-response">
        <div v-if="currentCommand == 'gem'" class="animate__animated animate__fadeIn">
            <v-icon color="red" class="animate__animated animate__bounce animate__infinite" x-large>mdi-cards-diamond</v-icon>
            <b>Bravo ! Tu as obtenu le premier cristal !</b>
        </div>
        <div v-if="currentCommand == 'whoami'" class="animate__animated animate__fadeIn">
            <p>Florentin Bonnay</p>
            <p>4 ans d'études & 3 ans d'expériences pro</p>
            <p>Travaillé sur de différentes technos</p>
            <p>Curieux, autonome, passioné</p>
            <p>Capacité d'apprendre et de s'adapter</p>
        </div>
        <div v-if="currentCommand == 'contact'" class="animate__animated animate__fadeIn">
            <div v-for="c in contacts" :key="c.name" class="term-icon-container">
                <v-icon large color="white" style="margin-left: 4vh; margin-right: 1vh;">{{ c.icon }}</v-icon>               
                <p class="white--text" style="margin-top: 1vh;">{{ c.text }}</p>
            </div>
            <p style="color: grey; font-size: 2vh; margin-top: 3vh;">N'hésitez pas à me laisser vos coordonnées afin que je vous recontacte dès que possible</p>
            <div v-for="input in contactForm" :key="input.id" style="display: flex;">
                <b v-if="input.enable" style="color: lightgrey;">{{ input.name }} :</b><p style="margin-left: 1vh;">{{ input.value }}</p>
            </div>
            <div v-if="formSent" style="color: grey; font-size: 2vh; margin-top: 3vh;">
                <p style="color: yellowgreen;">Vos coordonnées ont été transmises</p>
                <p style="display: none;color: red;">Une erreur s'est produite lors de la transmission de vos données</p>
                <p>Merci d'avoir utilisé ce terminal !</p>
                <p>Je vous invites à taper <font color="#2196F3">next</font> afin de continuer votre navigation sur mon site</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'TerminalResponse',
    props: {
        command: String,
    },
    data() {
        return {
            contacts: [
                {
                    name: 'Discord',
                    icon: 'mdi-discord',
                    text: 'FailPowa#9988',
                    gem: true,
                    url: '#'
                },
                {
                    name: 'Github',
                    icon: 'mdi-github',
                    text: 'FailPowa',
                    gem: false,
                    url: '#'
                },
                {
                    name: 'LinkedIn',
                    icon: 'mdi-linkedin',
                    text: 'Florentin Bonnay',
                    gem: false,
                    url: '#'
                },
                {
                    name: 'Mail',
                    icon: 'mdi-at',
                    text: 'florentinb.pro@gmail.com',
                    gem: false,
                    url: '#'
                }
            ],
            currentCommand: '',
            contactForm : [
                {
                    id: 1,
                    name: 'Nom',
                    placeholder: 'Tapez votre nom',
                    value: '',
                    enable: true
                },
                {
                    id: 2,
                    name: 'Prénom',
                    placeholder: 'Tapez votre prénom',
                    value: '',
                    enable: false
                },
                {
                    id: 3,
                    name: 'Mail',
                    placeholder: 'Tapez votre mail',
                    value: '',
                    enable: false
                }
            ],
            formSent: false
        }  
    },
    watch: {
        command: function(newVal) {
            switch(newVal) {
                case 'whoami':
                    this.currentCommand = newVal;
                    break;
                case 'contact':
                    this.currentCommand = newVal;
                    if(!this.formSent)
                        this.$emit('change-placeholder', this.contactForm[0].placeholder)
                    break;
                case 'gem':
                    this.currentCommand = newVal;
                    this.$emit('gem-found', 'red');
                    break;
                case 'next':
                    document.getElementById('third-layer').scrollIntoView({
                        behavior: "smooth"
                    });
                    break;
                case 'help':
                    this.$emit('show-help');
                    break;
                default:
                    if(this.currentCommand == 'contact' && this.formSent == false) {
                        this.fillContactForm(newVal);
                    }
            }
        }
    },
    methods: {
        fillContactForm(valeur) {
            this.contactForm.every(element => {
                if(element.value == '') {
                    element.value = valeur;
                    if(element.id != 3) {
                        this.contactForm[element.id].enable = true;
                        this.$emit('change-placeholder', this.contactForm[element.id].placeholder);
                    } else {
                        this.$emit('change-placeholder', false);
                    }
                    return false;
                } else {
                    return true;
                }
            });
            if(this.contactForm[this.contactForm.length - 1].value != '')
                this.sendForm()
        },
        sendForm() {
            console.log(this.contactForm);
            this.formSent = true;
        }
    }
}
</script>
<style scoped>
.terminal-response {
    padding: 5vh;
    width: 80%;
}

.term-icon-container {
    width: fit-content;
    display: inline-flex;
    font-size: 2vh;
}

.red-gem {
    font-size: 25vh !important;
}
</style>