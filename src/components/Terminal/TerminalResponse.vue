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
            <div class="terminal-form">
                <p style="color: grey; font-size: 2vh; margin-left: 2vh;">N'hésitez pas à me laisser vos coordonnées afin que je vous recontacte dès que possible</p>
                <p style="color: grey; font-size: 2vh; margin-left: 2vh;">Un autre formulaire est disponible plus bas si vous souhaitez me laisser un message avec vos informations</p>
                <div v-for="input in contactForm" :key="input.id" style="display: flex;">
                    <v-text-field 
                        outlined 
                        dark 
                        clearable 
                        dense 
                        style="margin-right: 3vh; margin-left: 3vh;"
                        v-model="input.value"
                        :type="input.type" 
                        :label="input.name"
                        :rules="input.type == 'mail' ? emailRules : nameRules"
                        :placeholder="input.placeholder"
                        @focus="handleFocus"
                        @blur="handleBlur"></v-text-field>
                </div>
                <div style="display: inline-flex; margin-left: 5vh; font-size: 2vh;">
                    <p>Envoyer ?</p>
                    <!-- Empêcher l'envoi si tous les champs ne sont pas remplis -->
                    <v-btn outlined color="teal" style="margin-left: 2vh;" @click="fillContactForm('yes')">Yes</v-btn>
                    <!-- Reset les champs si clic sur non -->
                    <v-btn outlined color="teal" style="margin-left: 2vh;" @click="clearForm">No</v-btn>
                </div>
            </div>
            <div v-if="formSent" style="color: grey; font-size: 2vh; margin-top: 1vh;">
                <p style="color: yellowgreen;">Vos coordonnées ont été transmises</p>
                <p style="display: none;color: red;">Une erreur s'est produite lors de la transmission de vos données</p>
                <p>Merci d'avoir utilisé ce terminal !</p>
                <p>Je vous invite à taper <font color="#2196F3">next</font> afin de continuer votre navigation sur mon site</p>
            </div>
        </div>
    </div>
</template>
<script>
import ApiServices from '../../services';

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
                    type: 'text',
                    value: '',
                },
                {
                    id: 2,
                    name: 'Prénom',
                    placeholder: 'Tapez votre prénom',
                    type: 'text',
                    value: '',
                },
                {
                    id: 3,
                    name: 'Entreprise',
                    placeholder: 'Tapez le nom de votre entreprise',
                    type: 'text',
                    value: '',
                },
                {
                    id: 4,
                    name: 'Mail',
                    placeholder: 'Tapez votre mail',
                    type: 'mail',
                    value: '',
                }
            ],
            nameRules: [
                v => !!v || 'Ce champs est requis',
                v => (v && v.length <= 50) || 'Le nom doit faire moins de 50 caractères !',
            ],
            emailRules: [
                v => !!v || 'Un mail est requis',
                v => /.+@.+\..+/.test(v) || 'Le mail doit être valide !',
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
                if(element.value == '' && valeur != "yes") {
                    element.value = valeur;
                    return false;
                } else {
                    if(element.id == this.contactForm.length && element.value != '' && valeur == "yes")
                        this.sendForm()
                    return true;
                }
            });
        },
        handleFocus() {
            this.$emit('change-listener', false);
        },
        handleBlur() {
            this.$emit('change-listener', true);
        },
        sendForm() {
            let body = {
                "name": this.contactForm[0].value,
                "firstname": this.contactForm[1].value,
                "business": this.contactForm[2].value,
                "mail": this.contactForm[3].value,
                "message": "Hey futur moi, cet utilisateur te contacte via le formulaire du terminal ! Recontacte-le rapidement !"
            };
            ApiServices.submitForm(body);
            this.formSent = true;
            this.$emit('change-listener', true);
        },
        clearForm() {
            this.contactForm.forEach(element => {
                element.value = '';
            })
        },
        handleKey() {
            
        }
    }
}
</script>
<style scoped>
.terminal-response {
    padding: 5vh;
    width: 90%;
}

.term-icon-container {
    width: fit-content;
    display: inline-flex;
    font-size: 2vh;
}

.terminal-form {
    border-style: double;
    border-color: #687180;
    width: 80%;
}

.red-gem {
    font-size: 25vh !important;
}
</style>