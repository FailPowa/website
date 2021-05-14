<template>
    <v-hover>
        <template v-slot:default="{ hover }">
        <v-card class="mx-auto" max-width="400">
            <v-img :src="image" height="300" position="left"></v-img>
            <v-card-text class="project-name">
                <h1 class="title primary--text" style="width: fit-content;">{{ name }}</h1>
                <v-icon :color="color" class="project-icon" large>mdi-{{ icon }}</v-icon>
            </v-card-text>
            <v-fade-transition>
                <v-overlay v-if="hover" absolute color="#05443D" opacity="0.80">
                    <div class="description-text">
                        <b class="display-1">{{ description }}</b>
                    </div>
                    <div class="project-links">
                        <v-btn v-if="github != ''" absolute left outlined color="white" width="45%" :href="github" target="_blank">
                            <v-icon color="white" large>mdi-github</v-icon> Github
                        </v-btn>
                        <v-btn v-else absolute left outlined color="white" width="45%" disabled>
                            <v-icon color="white">mdi-github</v-icon> Github
                        </v-btn>

                        <v-btn v-if="url != ''" absolute right outlined color="white" width="45%" :href="url" target="_blank">
                            <v-icon color="white" large>mdi-open-in-new</v-icon> Lien direct
                        </v-btn>
                        <v-btn v-else absolute right outlined color="white" width="45%" disabled>
                            <v-icon color="white">mdi-open-in-new</v-icon> Lien direct
                        </v-btn>
                    </div>
                    <v-icon large class="blue-gem" v-if="gem" color="blue" @click="gemFound">mdi-cards-diamond</v-icon>
                </v-overlay>
            </v-fade-transition>
        </v-card>
        </template>
    </v-hover>
</template>
<script>
export default {
    name: 'ProjectCard',
    props: {
        name: String,
        description: String,
        icon: String,
        gem: Boolean,
        color: String,
        github: String,
        url: String,
        image: String,
    },
    methods: {
        gemFound: function() {
            this.$emit('gem-found', 'blue');
        }
    },
    mounted() {
        console.log(this.image);
    }
}
</script>
<style scoped>
.project-name {
    display: inline-flex;
}

.project-icon {
    left: 3vh;
}

.description-text {
    text-align: center;
    margin: 1vh;
}

.project-links {
    margin-top: 3vh;
}

.blue-gem {
    position: absolute;
    right: 0;
    top: 20vh;
}
</style>