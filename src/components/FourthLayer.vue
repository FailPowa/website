<template>
    <v-container id="fourth-layer" justify-center align-center fluid>
        <v-row class="offset-md-3 fourth-title">
            <h1 class="display-2 font-weight-black white--text">Contactez-moi sur les réseaux ou par mail</h1>
        </v-row>
        <v-row>
            <v-col class="offset-md-2 col-md-3">
                <div v-for="c in contacts" :key="c.name" class="contact-icon-container" data-aos="fade-down-right">
                    <v-icon x-large color="white" class="contact-icon">{{ c.icon }}</v-icon>
                    <p class="white--text contact-icon-text">{{ c.text }}</p>
                </div>
            </v-col>
            <v-col class="offset-md-1 col-md-6">
                <v-form ref="form" class="form" v-model="valid" dark data-aos="fade-down-left">
                    <v-text-field v-model="formDatas.name" :counter="50" :rules="nameRules" label="Nom" solo dense required></v-text-field>
                    <v-text-field v-model="formDatas.firstname" :counter="50" :rules="nameRules" label="Prénom" solo dense required></v-text-field>
                    <v-text-field v-model="formDatas.business" :counter="50" :rules="nameRules" label="Entreprise" solo dense required></v-text-field>
                    <v-text-field v-model="formDatas.mail" :rules="emailRules" label="E-mail" solo dense required></v-text-field>
                    <v-textarea v-model="formDatas.message" label="Laissez moi votre message..." solo></v-textarea>
                    <v-btn :color="!valid ? 'error' : 'success'" @click="validateForm" class="mr-4">Envoyer</v-btn>
                    <v-icon v-if="valid" class="animate__animated animate__fadeInLeft" color="green" @click="gemFound" x-large>mdi-cards-diamond</v-icon>
                    <p v-if="formSent" class="animate__animated animate__fadeInDown validate-message">Votre message a bien été envoyé !</p>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import ApiServices from '../services';

export default {
    name: 'FourthLayer',
    data() {
        return {
            valid: false,
            formSent: false,
            formDatas : {
                name: '',
                firstname: '',
                business: '',
                mail: '',
                message: '',
            },
            nameRules: [
                v => !!v || 'Ce champs est requis',
                v => (v && v.length <= 50) || 'Le nom doit faire moins de 50 caractères !',
            ],
            emailRules: [
                v => !!v || 'Un mail est requis',
                v => /.+@.+\..+/.test(v) || 'Le mail doit être valide !',
            ],
            contacts: [
                {
                    name: 'Discord',
                    icon: 'mdi-discord',
                    text: 'FailPowa#9988',
                    url: '#'
                },
                {
                    name: 'Github',
                    icon: 'mdi-github',
                    text: 'FailPowa',
                    url: '#'
                },
                {
                    name: 'LinkedIn',
                    icon: 'mdi-linkedin',
                    text: 'Florentin Bonnay',
                    url: '#'
                },
                {
                    name: 'Mail',
                    icon: 'mdi-at',
                    text: 'florentinb.pro@gmail.com',
                    url: '#'
                }
            ],
        }
    },
    methods: {
        gemFound: function() {
            this.$emit('gem-found', 'green');
        },
        validateForm: function() {
            if(this.$refs.form.validate()) {
                ApiServices.submitForm(this.formDatas).then(res => {
                    if(res.status == 200)
                        this.formSent = true;
                    // Gestion des erreurs à ajouter ( status = 400 || 403 || 401 || 404)
                });
            }
        }
    }
}
</script>
<style scoped>
.form {
    width: 90vh;
}
.left-icon {
    text-align: right;
}
.contact-icon-container {
    width: 100%;
    margin-top: 5vh;
}
.contact-icon-text {
    display: inline;
    margin: 1vh;
    font-size: x-large;
}
.contact-icon {
    font-size: xxx-large;
}
.fourth-title {
    margin-top: 10vh;
    margin-bottom: 10vh;
}
.validate-message {
    color: #4caf50;
    font-size: 2vh;
    display: inline-flex;
    margin-left: 15px;
}
</style>