<template>
    <v-container id="third-layer" fluid fill-height>
        <v-layout v-for="p in projects" class="project-card" :key="p.id" justify-center align-center>
            <project-card 
                class="project-card"
                @gem-found="gemFound"
                :name="p.name" 
                :description="p.description" 
                :icon="p.icon"
                :gem="p.gem"
                :color="p.color"
                :github="p.github"
                :url="p.url"
                :image="p.imageName"
                data-aos="zoom-in-down"
            ></project-card>
        </v-layout>
        <v-layout justify-center align-center>
            <div class="scroller">
                <a @click="scroll('fourth-layer')"><span></span></a>
            </div>
        </v-layout>
    </v-container>
</template>
<script>
import ProjectCard from './Project/ProjectCard';
import ApiServices from '@/services.js';

export default {
    name: 'ThirdLayer',
    components: {
        ProjectCard
    },
    data() {
        return {
            projects: []
        }
    },
    methods: {
        gemFound: function() {
            this.$emit('gem-found', 'blue');
        },
        scroll(id) {  
          document.getElementById(id).scrollIntoView({
            behavior: "smooth"
          });
        }
    },
    created() {
      ApiServices.getProjects().then(res => {
        res.data.forEach(p => {
          p.imageName = require(`@/images/${p.imageName}`);
          this.projects.push(p);
        });
      })
    }
}
</script>
<style scoped>
.project-card {
    left: 10vh;
}

/** Scroller */
.scroller a span {
  position: absolute;
  margin-top: 30vh;
  left: 50%;
  width: 36px;
  height: 36px;
  margin-left: -12px;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #fff;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-animation: sdb04 2s infinite;
  animation: sdb04 2s infinite;
  box-sizing: border-box;
}
@-webkit-keyframes sdb04 {
  0% {
    -webkit-transform: rotate(-45deg) translate(0, 0);
  }
  20% {
    -webkit-transform: rotate(-45deg) translate(-10px, 10px);
  }
  40% {
    -webkit-transform: rotate(-45deg) translate(0, 0);
  }
}
@keyframes sdb04 {
  0% {
    transform: rotate(-45deg) translate(0, 0);
  }
  20% {
    transform: rotate(-45deg) translate(-10px, 10px);
  }
  40% {
    transform: rotate(-45deg) translate(0, 0);
  }
}
/** END SCROLLER */
</style>