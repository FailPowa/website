<template>
  <v-app>
    <v-app-bar app color="transparent" class="main-content">
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
</template>

<script>
import FirstLayer from './components/FirstLayer'
import SecondLayer from './components/SecondLayer'
import ThirdLayer from './components/ThirdLayer'
import FourthLayer from './components/FourthLayer'
import Navi from './components/Navi'
import BackToTopBtn from './components/BackToTopBtn'

export default {
  name: 'App',
  components: {
    FirstLayer,
    SecondLayer,
    ThirdLayer,
    FourthLayer,
    Navi,
    BackToTopBtn
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
      terminalIsActive: false
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
        if(this.scrollPosition >= 500) {
          this.showBtn = true;
          if(this.scrollPosition <= 1200)
            this.terminalIsActive = true;
        } else {
          console.log(this.terminalIsActive);
          this.showBtn = false;
          this.terminalIsActive = false;
        }
    },
    scroll(id) {
      document.getElementById(id).scrollIntoView({
        behavior: "smooth"
      });
    }
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
  }
};
</script>
<style scoped>
.main-content {
  background: url('https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=2000') no-repeat center center fixed;
  background-size: cover;
  font-weight: bold;
  width: 100%;
  height: 100%;
  max-height: 100vh;
}

.btn-menu {
  width: 25%;
}
</style>
