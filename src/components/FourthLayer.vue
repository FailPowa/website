<template>
    <v-container id="fourth-layer" justify-center align-center fluid>
        <v-row class="offset-md-3 fourth-title">
            <h1 class="display-2 font-weight-black white--text">Contactez-moi sur les réseaux ou par mail</h1>
        </v-row>
        <v-row>
            <v-col class="offset-md-2 col-md-3">
                <div v-for="c in contacts" :key="c.name" class="contact-icon-container animate__animated animate__fadeInLeft">
                    <v-icon v-if="!c.gem" x-large color="white" class="contact-icon">{{ c.icon }}</v-icon>
                    <v-icon v-else x-large color="green" class="contact-icon" @click="gemFound">{{ c.icon }}</v-icon>                    
                    <p class="white--text contact-icon-text">{{ c.text }}</p>
                </div>
            </v-col>
            <v-col class="offset-md-1 col-md-6">
                <v-form ref="form" class="form" v-model="valid" lazy-validation dark>
                    <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" solo required></v-text-field>
                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" solo required></v-text-field>
                    <v-select v-model="select" :items="items" :rules="[v => !!v || 'Item is required']" label="Item" solo required></v-select>
                    <v-textarea solo name="input-7-4" label="Solo textarea"></v-textarea>
                    <v-btn color="success" class="mr-4">Validate</v-btn>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    name: 'FourthLayer',
    data() {
        return {
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            select: null,
            items: [
                'Item 1',
                'Item 2',
                'Item 3',
                'Item 4',
            ],
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
        }
    },
    methods: {
        gemFound: function() {
            this.$emit('gem-found', 'green');
        }
    },
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
</style>