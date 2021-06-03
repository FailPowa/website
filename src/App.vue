<template>
  <v-app v-if="!isMobile()">
    <v-app-bar color="transparent" fixed class="main-content">
      <v-btn v-for="item in menuItems" :key="item.name" @click="scroll(item.goTo)" class="btn-menu animate__animated animate__fadeInDown" text x-large dark>{{ item.name }}</v-btn>
    </v-app-bar>
    <v-main>
      <back-to-top-btn :active="showBtn"></back-to-top-btn>
      <first-layer class="main-content"></first-layer>
      <second-layer @gem-found="gemFound" :active="terminalIsActive" class="main-content"></second-layer>
      <third-layer @gem-found="gemFound" class="main-content"></third-layer>
      <fourth-layer @gem-found="gemFound" class="main-content"></fourth-layer>
      <navi :red-gem="redGem" :green-gem="greenGem" :blue-gem="blueGem" :nbGems="nbGems"></navi>
      <v-footer dark>
        <v-row justify="left" no-gutters>
          <v-btn color="white" text rounded>CGU</v-btn>
          <v-btn color="white" text rounded>CGV</v-btn>
        </v-row>
          <p><strong>Florentin Bonnay </strong> {{ new Date().getFullYear() }}</p>
      </v-footer>
    </v-main>
  </v-app>
  <v-app class="mobile-app" v-else>
    <mobile-layer :cards="mobileCards" class="main-mobile-content"></mobile-layer>
    <v-footer color="#503177" fixed style="bottom: 0; z-index: 5;">
      <v-btn v-for="item in menuItems" :key="item.name" class="btn-menu animate__animated animate__fadeInDown" text small dark>{{ item.name }}</v-btn>
    </v-footer>
  </v-app>
</template>

<script>
// Components for PC
import FirstLayer from './components/FirstLayer'
import SecondLayer from './components/SecondLayer'
import ThirdLayer from './components/ThirdLayer'
import FourthLayer from './components/FourthLayer'
import Navi from './components/Navi'
import BackToTopBtn from './components/BackToTopBtn'
// Components for Mobile
import MobileLayer from './mobile-components/MobileLayer'
// Plugin
import detectMobile from './plugins/detectMobile'

export default {
  name: 'App',
  components: {
    FirstLayer,
    SecondLayer,
    ThirdLayer,
    FourthLayer,
    Navi,
    BackToTopBtn,
    MobileLayer,
  },
  data() {    
    return {
      menuItems: [
          { name: "Accueil", goTo: "first-layer" },
          { name: "Présentation", goTo: "second-layer" },
          { name: "Projets", goTo: "third-layer" },
          { name: "Contact", goTo: "fourth-layer" }
        ],
      redGem: false,
      blueGem: false,
      greenGem: false,
      nbGems: 0,
      showBtn: false,
      terminalIsActive: false,
      mobileCards: ["accueil", "presentation", "projets", "contact"],
    }
  },
  methods: {
    gemFound(color) {
      switch(color) {
        case 'red':
          if(!this.redGem)
            this.nbGems++;
          this.redGem = true;
          break;
        case 'blue':
          if(!this.blueGem)
            this.nbGems++;
          this.blueGem = true;
          break;
        case 'green':
          if(!this.greenGem)
            this.nbGems++;
          this.greenGem = true;
      }
    },
    updateScroll() {
        this.scrollPosition = window.scrollY;
        this.terminalIsActive = this.scrollPosition >= 500 && this.scrollPosition <= 1200 ? true : false;
        this.showBtn = this.scrollPosition >= 500 ? true : false;
    },
    scroll(id) {
      document.getElementById(id).scrollIntoView({
        behavior: "smooth"
      });
    }
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
  },
  mixins: [detectMobile],
};
</script>
<style scoped>
/* main content for pc */
.main-content {
  background: url('https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=2000') no-repeat center center fixed;
  background-size: cover;
  font-weight: bold;
  width: 100%;
  height: 100%;
  max-height: 100vh;
}

.main-mobile-content {
  width: 100%;
  height: 100%;
}

.btn-menu {
  width: 25%;
}
</style>
