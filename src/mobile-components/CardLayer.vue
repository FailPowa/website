<template>
  <div v-if="isShowing" 
        ref="interactElement" 
        :class="{ isAnimating: isInteractAnimating, isCurrent: isCurrent }" 
        class="card" 
        :style="{ transform: transformString }">
    <div v-if="card == 'accueil'" class="cardContainer">
      <div class="display-1 font-weight-black">Florentin Bonnay</div>
      <div class="typewriter">
        <p>Développeur indépendant polyvalent</p>
      </div>
      <br>
      <div>
        <status-indicator id="status-indicator" :status="statusValue" :pulse="true" />
        <p id="status-text">{{ statusText }}</p>
        <br>
        <v-icon color="white" x-large class="animate__animated animate__swing animate__delay-3s">mdi-gesture-swipe</v-icon>
      </div>
    </div>
    <div v-if="card == 'presentation'" class="cardContainer">
      <v-list dark color="transparent">
        <template v-for="item in presentationList">
            <v-list-item :key="item.id">
                <v-list-item-content style="border-bottom: double 0.5vh lightgrey; margin-bottom: 2vh;">
                    <v-list-item-title style="font-size: 3vh; margin-bottom: 1vh;">
                        <v-icon large>mdi-{{ item.icon }}</v-icon> {{ item.title }}
                        </v-list-item-title>
                    <div v-for="text in item.text" :key="text">
                        <v-list-item-subtitle style="font-size: 2vh; white-space: inherit;">{{ text }}</v-list-item-subtitle>
                    </div>
                </v-list-item-content>
            </v-list-item>
        </template>
      </v-list>
    </div>
    <div v-if="card == 'projets'" class="cardContainer">
      <div v-for="p in projects" :key="p.id" class="projectContainer">
        <v-card width="300" height="150">
          <v-list dark>
            <v-list-item>
              <v-list-item-avatar>
                <v-img :src="p.imageName"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="title">{{ p.name }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn v-if="p.github != ''" icon>
                  <v-icon large>mdi-github</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon :color="p.color" large>mdi-{{ p.icon }}</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-subtitle style="white-space: inherit;">{{ p.description }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </div>
    </div>
    <div v-if="card == 'contact'">
      <p class="cardTitle">{{ card }}</p>
    </div>
  </div>
</template>

<script>
import interact from "interact.js";
import { StatusIndicator } from 'vue-status-indicator';
import ApiServices from '../services';

const ACCEPT_CARD = "cardAccepted";
const REJECT_CARD = "cardRejected";
const SKIP_CARD = "cardSkipped";

export default {
  static: {
    interactMaxRotation: 15,
    interactOutOfSightXCoordinate: 500,
    interactOutOfSightYCoordinate: 600,
    interactYThreshold: 150,
    interactXThreshold: 100
  },

  components: {
    StatusIndicator
  },

  props: {
    card: {
      type: String,
      required: true
    },
    isCurrent: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      isShowing: true,
      isInteractAnimating: true,
      isInteractDragged: null,
      interactPosition: {
        x: 0,
        y: 0,
        rotation: 0
      },
      statusValue : '',
      statusText : '',
      statusColor: '',
      presentationList: [
          {
              id: 1,
              icon: "gesture-double-tap",
              title: "Besoin d'un coup de main ?",
              text: [
                  "Je saurais vous apporter le soutien dont vous avez besoin dans vos projets.",
                  "Fort de mes expériences dans de nombreuses technologies, je saurais me montrer polyvalent et autonome."
              ]
          },
          {
              id: 2,
              icon: "lightbulb-on",
              title: "Une nouvelle idée en tête ?",
              text: [
                  "Contactez-moi pour m'exposer votre idée, discutons-en !",
                  "Un regard neuf et approfondi sur votre idée permettrait de la faire évoluer en projet."
              ]
          },
          {
              id: 3,
              icon: "coffee",
              title: "Envie d'un café ?",
              text: [
                  "Discutons de sujets, professionnels ou non, autour d'un café, à tête reposée."
              ]
          }
      ],
      projects: [],
      showProjectCard: false,
    };
  },

  computed: {
    transformString() {
      if (!this.isInteractAnimating || this.isInteractDragged) {
        const { x, y, rotation } = this.interactPosition;
        return `translate3D(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
      }

      return null;
    }
  },

  mounted() {
    const element = this.$refs.interactElement;

    interact(element).draggable({
      onstart: () => {
        this.isInteractAnimating = false;
      },

      onmove: event => {
        const {
          interactMaxRotation,
          interactXThreshold
        } = this.$options.static;
        const x = this.interactPosition.x + event.dx;
        const y = this.interactPosition.y + event.dy;

        let rotation = interactMaxRotation * (x / interactXThreshold);

        if (rotation > interactMaxRotation) rotation = interactMaxRotation;
        else if (rotation < -interactMaxRotation)
          rotation = -interactMaxRotation;

        this.interactSetPosition({ x, y, rotation });
      },

      onend: () => {
        const { x, y } = this.interactPosition;
        const { interactXThreshold, interactYThreshold } = this.$options.static;
        this.isInteractAnimating = true;

        if (x > interactXThreshold) this.playCard(ACCEPT_CARD);
        else if (x < -interactXThreshold) this.playCard(REJECT_CARD);
        else if (y > interactYThreshold) this.playCard(SKIP_CARD);
        else this.resetCardPosition();
      }
    });
  },

  beforeDestroy() {
    interact(this.$refs.interactElement).unset();
  },

  created() {
    ApiServices.getStatus().then(res => {
      this.statusValue = res.data.value;
      this.statusColor = res.data.color;
      this.statusText = res.data.text;
      let text = document.getElementById('status-text');
      text.style.color = this.statusColor;
    });
    ApiServices.getProjects().then(res => {
      res.data.forEach(p => {
        p.imageName = require(`@/images/${p.imageName}`);
        this.projects.push(p);
      });
    });
  },

  methods: {
    hideCard() {
      setTimeout(() => {
        this.isShowing = false;
        this.$emit("hideCard", this.card);
      }, 300);
    },

    playCard(interaction) {
      const {
        interactOutOfSightXCoordinate,
        interactOutOfSightYCoordinate,
        interactMaxRotation
      } = this.$options.static;

      this.interactUnsetElement();

      switch (interaction) {
        case ACCEPT_CARD:
          this.interactSetPosition({
            x: interactOutOfSightXCoordinate,
            rotation: interactMaxRotation
          });
          this.$emit(ACCEPT_CARD);
          break;
        case REJECT_CARD:
          this.interactSetPosition({
            x: -interactOutOfSightXCoordinate,
            rotation: -interactMaxRotation
          });
          this.$emit(REJECT_CARD);
          break;
        case SKIP_CARD:
          this.interactSetPosition({
            y: interactOutOfSightYCoordinate
          });
          this.$emit(SKIP_CARD);
          break;
      }

      this.hideCard();
    },

    interactSetPosition(coordinates) {
      const { x = 0, y = 0, rotation = 0 } = coordinates;
      this.interactPosition = { x, y, rotation };
    },

    interactUnsetElement() {
      interact(this.$refs.interactElement).unset();
      this.isInteractDragged = true;
    },

    resetCardPosition() {
      this.interactSetPosition({ x: 0, y: 0, rotation: 0 });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/index.scss";

$cardsTotal: 4;
$cardsWidth: 250px;
$cardsPositionOffset: 90% * 0.06;
$cardsScaleOffset: 0.08;
$defaultTranslation: $cardsPositionOffset * $cardsTotal;
$defaultScale: 1 - ($cardsScaleOffset * $cardsTotal);
$fs-card-title: 1.125em;

.card {
  @include card();
  @include absolute(0);
  @include sizing(100% 80vw);
  @include flex-center();

  @include after() {
    @include sizing(21px 3px);
    @include absolute(right 0 bottom 11px left 0);

    margin: auto;
    border-radius: 100px;
    background: rgba($c-black, 0.3);
  }

  display: flex;
  max-height: 95%;
  margin-top: 0.5vh;
  font-size: $fs-h2;
  font-weight: $fw-bold;
  color: $c-white;
  background-image: linear-gradient(
        -180deg,
        $primary-gradient-start 2%,
        $primary-gradient-end 100%
    );
  opacity: 0;
  transform: translateY($defaultTranslation) scale($defaultScale);
  transform-origin: 50%, 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  user-select: none;
  pointer-events: none;
  will-change: transform, opacity;
  height: 85%;

  &.isCurrent {
    pointer-events: auto;
  }

  &.isAnimating {
    transition: transform 0.7s $ease-out-back;
  }
}

.cardTitle {
  margin: 0 0 15px;
  font-size: $fs-card-title;
}

.cardContainer {
  text-align: center;
  width: 100%;
}

/* Status */
#status-indicator {
    width: 2em;
    height: 2em;
}

#status-text {
  font-size: 2vh;
  color: rgb(75, 210, 143);
}
/* End Status */

@for $i from 1 through $cardsTotal {
  $index: $i - 1;
  $translation: $cardsPositionOffset * $index;
  $scale: 1 - ($cardsScaleOffset * $index);

  .card:nth-child(#{$i}) {
    z-index: $cardsTotal - $index;
    opacity: 1;
    transform: translateY($translation) scale($scale);

    @if $i == 3 {
      color: $c-red-25;
      background-color: $c-red-25;
    } @else if $i == 2 {
      color: $c-red-50;
      background-color: $c-red-50;
    }

    @if $i != 1 {
      background-image: none;

      @include after() {
        @include sizing(0 0);
      }
    }
  }
}

/* TYPEWRITER EFFECT */
.typewriter p {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: .10em solid white; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  font-size: 3vh;
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

.projectContainer {
  margin-bottom: 3vh;
  margin-left: 5vh;
}
</style>
