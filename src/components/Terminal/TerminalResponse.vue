<template>
    <div class="terminal-response">
        <div v-if="currentCommand == 'gem'" class="animate__animated animate__fadeIn">
            <v-icon color="red" class="animate__animated animate__bounce animate__infinite" x-large>mdi-cards-diamond</v-icon>
            <b>Bravo ! Tu as obtenu le premier cristal !</b>
            <p style="font-size: 2vh; color: lightgrey; margin-top: 2vh;">Passes ta souris sur Navi en bas à droite de l'écran pour suivre ta progression</p>
        </div>
        <div v-if="currentCommand == 'presentation'" class="animate__animated animate__fadeIn">
            <v-list dark color="transparent">
                <template v-for="item in presentationList">
                    <v-card :key="item.id" color="#192227" style="border-bottom: double 0.5vh lightgrey; margin-bottom: 3vh;">
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title style="font-size: 3vh; margin-bottom: 1vh;">
                                    <v-icon large>mdi-{{ item.icon }}</v-icon> {{ item.title }}
                                    </v-list-item-title>
                                <div v-for="text in item.text" :key="text">
                                    <v-list-item-subtitle v-if="!text.isCitation" style="font-size: 2vh;">{{ text.value }}</v-list-item-subtitle>
                                    <v-list-item-subtitle v-else style="color: whitesmoke; font-size: 2vh;">{{ text.value }}</v-list-item-subtitle>
                                </div>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card>
                </template>
            </v-list>
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
                <div style="display: inline-flex; margin-left: 5vh; margin-bottom: 2vh; font-size: 2vh;">
                    <!-- Empêcher l'envoi si tous les champs ne sont pas remplis -->
                    <v-btn outlined color="teal" style="margin-left: 2vh;" @click="fillContactForm('send')">Envoyer</v-btn>
                    <v-btn outlined color="teal" style="margin-left: 2vh;" @click="clearForm">Clear</v-btn>
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
        isActive: Boolean
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
            formSent: false,
            presentationList: [
                {
                    id: 1,
                    icon: "gesture-double-tap",
                    title: "Besoin d'un coup de main ?",
                    text: [
                        { isCitation: false, value: "Vous avez besoin d'une aide rapide et efficace pour l'un de vos projets ?"},
                        { isCitation: false, value: "Fort de mes expériences sur de nombreuses technologies, l'adaptation et la polyvalence sont des valeurs qui me sont chères." },
                        { isCitation: false, value: "Ayant une véritable passion pour l'apprentissage, je saurais me former rapidement afin de répondre à vos besoins dans les temps." }
                    ]
                },
                {
                    id: 2,
                    icon: "lightbulb-on",
                    title: "Une nouvelle idée en tête ?",
                    text: [
                        { isCitation: false, value: "Contactez-moi pour m'exposer votre idée, discutons-en !" },
                        { isCitation: false, value: "Un regard neuf et approfondi sur votre projet permettrait de le faire avancer et évoluer." }
                    ]
                },
                {
                    id: 3,
                    icon: "coffee",
                    title: "Envie d'un café ?",
                    text: [
                        { isCitation: false, value: "Prenons une pause et discutons autour d'un café, à tête reposé." },
                        { isCitation: true, value: "\"L'histoire du commerce est celle de la communication des peuples.\" - Montesquieu" },
                        { isCitation: true, value: "\"Je ne perds jamais. Soit je gagne, soit j’apprends.\" - Nelson Mandela" }
                    ]
                }
            ]
        }  
    },
    watch: {
        command: function(newVal) {
            switch(newVal) {
                case 'presentation':
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
        },
        isActive: function() {
            this.currentCommand = '';
            this.contactForm.forEach(item => {
                item.value = '';
            });
        },
    },
    methods: {
        fillContactForm(valeur) {
            console.log(this.contactForm)
            this.contactForm.every(element => {
                if(element.value == '' && valeur != "send") {
                    element.value = valeur;
                    return false;
                } else {
                    if(element.id == this.contactForm.length && element.value != '' && valeur == "send")
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
    width: 80%;
}

.term-icon-container {
    width: fit-content;
    display: inline-flex;
    font-size: 2vh;
}

.terminal-form {
    border-style: double;
    border-color: #687180;
    width: 100%;
}

.red-gem {
    font-size: 25vh !important;
}
</style>