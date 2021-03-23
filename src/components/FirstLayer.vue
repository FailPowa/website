<template>
    <v-container id="first-layer" class="white--text" fluid fill-height>
        <v-layout justify-center align-center column pa-5>
            <div class="display-4 font-weight-black text-xs-center">Florentin Bonnay</div>
            <div class="display-1 font-weight-bold text-xs-center typewriter">
              <p>Développeur indépendant polyvalent</p>
            </div>
            <br/>
            <!-- Call API -> 'active', 'positive', 'intermediary', 'negative'-->
            <div class="status-container">
              <status-indicator id="status-indicator" :status="statusValue" :pulse="true" />
              <p id="status-text">{{ statusText }}</p>
            </div>
            <div id="scroller" class="scroller">
                <a @click="scroll('second-layer')"><span></span><span></span><span></span></a>
            </div>
        </v-layout>
    </v-container>
</template>
<script>
import { StatusIndicator } from 'vue-status-indicator';
import ApiServices from '@/services.js';

export default {
    name: "FirstLayer",
    components: {
        StatusIndicator
    },
    methods: {
      scroll(id) {  
        document.getElementById(id).scrollIntoView({
          behavior: "smooth"
        });
      }
    },
    data() {
        return {
          statusValue: "",
          statusColor: "",
          statusText: ""
        }
    },
    created() {
      ApiServices.getStatus().then(res => {
        this.statusValue = res.data.value;
        this.statusColor = res.data.color;
        this.statusText = res.data.text;
        let text = document.getElementById('status-text');
        text.style.color = this.statusColor;
      })
    }
}
</script>
<style scoped>
.name {
    font-size: 4em;
}
/* Status */
#status-indicator {
    width: 3em;
    height: 3em;
}

.status-container {
  margin-left: 6vh;
  text-align: center;
}

#status-text {
  font-size: 2vh;
}
/* End Status */

/* Scroller */
.scroller a {
  position: absolute;
  margin-top: 3vh;
  left: 50%;
  z-index: 2;
  display: inline-block;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
  color: #fff;
  font : normal 400 20px/1 'Josefin Sans', sans-serif;
  letter-spacing: .1em;
  text-decoration: none;
  transition: opacity .3s;
}
.scroller a:hover {
  opacity: .5;
}
#scroller a span {
  position: absolute;
  /* top: 0; */
  left: 50%;
  width: 48px;
  height: 48px;
  margin-left: 1vh;
  border-left: 1px solid #fff;
  border-bottom: 1px solid #fff;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-animation: sdb07 2s infinite;
  animation: sdb07 2s infinite;
  opacity: 0;
  box-sizing: border-box;
}
#scroller a span:nth-of-type(1) {
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}
#scroller a span:nth-of-type(2) {
  top: 16px;
  -webkit-animation-delay: .15s;
  animation-delay: .15s;
}
#scroller a span:nth-of-type(3) {
  top: 32px;
  -webkit-animation-delay: .3s;
  animation-delay: .3s;
}
@-webkit-keyframes sdb07 {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes sdb07 {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
/* END SCROLLER */

/* TYPEWRITER EFFECT */
.typewriter p {
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
/* END TYPEWRITER EFFECT */
</style>