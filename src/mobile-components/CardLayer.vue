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
        <v-list dark three-line color="transparent">
          <template v-for="item in presentationList">
            <v-card color="#503177" :key="item.id" elevation="10" width="95%" style="margin-left: 1.5vh; margin-bottom: 4vh; border-radius: 3vh;">
            <v-list-group :value="item.isActive" :id="item.id" :prepend-icon="'mdi-' + item.icon" class="presentation-list-group">
              <template v-slot:activator>
                <v-list-item-title style="color: white; overflow: visible;">{{ item.title }}</v-list-item-title>
              </template>
              <template>
                <v-list-item-content>
                  <div v-for="text in item.text" :key="text">
                    <v-list-item-subtitle style="color: lightgray; white-space: inherit;">{{ text }}</v-list-item-subtitle>
                  </div>
                </v-list-item-content>
              </template>
            </v-list-group>
              <!-- <v-list-item :key="item.id">
                <v-list-item-avatar>
                  <v-icon large>mdi-{{ item.icon }}</v-icon>
                </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title style="font-size: 3vh; margin-bottom: 1vh;">{{ item.title }}</v-list-item-title>
                    <div v-for="text in item.text" :key="text">
                      <v-list-item-subtitle style="font-size: 2vh; white-space: inherit;">{{ text }}</v-list-item-subtitle>
                    </div>
                  </v-list-item-content>
              </v-list-item> -->
            </v-card>
          </template>
        </v-list>
    </div>
    <div v-if="card == 'projets'" class="cardContainer">
      <v-container>
        <v-row v-for="p in projects" :key="p.id" class="projectContainer">
          <v-card width="95%" elevation="10">
            <v-list class="project-data-list" dark>
              <v-list-item>
                <v-list-item-avatar>
                  <v-img :src="p.imageName"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="title">{{ p.name }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn style="margin-bottom: 1vh;" v-if="p.github != ''" icon>
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
        </v-row>
      </v-container>
    </div>
    <div v-if="card == 'contact'" class="cardContainer">
      <v-container>
        <v-row no-gutters>
          <template v-for="(c, index) in contacts">
            <v-col :key="index">
              <v-icon large color="white">{{ c.icon }}</v-icon>
              <p class="white--text" style="font-size: 2vh; font-weight: bolder;">{{ c.text }}</p>
            </v-col>
            <v-responsive v-if="index === 1" :key="`width-${index}`" width="100%"></v-responsive>
          </template>
        </v-row>
        <v-row>
          <v-form ref="form" class="form" v-model="valid" dark data-aos="fade-down-left">
            <v-text-field v-model="formDatas.name" :counter="50" :rules="nameRules" label="Nom" solo dense required></v-text-field>
            <v-text-field v-model="formDatas.firstname" :counter="50" :rules="nameRules" label="Prénom" solo dense required></v-text-field>
            <v-text-field v-model="formDatas.business" :counter="50" :rules="nameRules" label="Entreprise" solo dense required></v-text-field>
            <v-text-field v-model="formDatas.mail" :rules="emailRules" label="E-mail" solo dense required></v-text-field>
            <p v-if="!formSent" class="subtitle" style="color: lightseagreen;">N'hésitez pas à me laisser vos coordonnées afin que je vous recontacte dès que possible</p>
            <v-btn :color="!valid ? 'error' : 'success'" id="formSubmitBtn" class="mr-4">Envoyer</v-btn>
            <p v-if="formSent" class="animate__animated animate__fadeInDown validate-message">Votre message a bien été envoyé !</p>
          </v-form>
        </v-row>
      </v-container>
      <!-- <div>
        
      </div> -->
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
              isActive: true,
              title: "Besoin d'un coup de main ?",
              text: [
                  "Je saurais vous apporter le soutien dont vous avez besoin dans vos projets.",
                  "Fort de mes expériences dans de nombreuses technologies, je saurais me montrer polyvalent et autonome."
              ]
          },
          {
              id: 2,
              icon: "lightbulb-on",
              isActive: false,
              title: "Une nouvelle idée en tête ?",
              text: [
                  "Contactez-moi pour m'exposer votre idée, discutons-en !",
                  "Un regard neuf et approfondi sur votre idée permettrait de la faire évoluer en projet."
              ]
          },
          {
              id: 3,
              icon: "coffee",
              isActive: false,
              title: "Envie d'un café ?",
              text: [
                  "Discutons de sujets, professionnels ou non, autour d'un café, à tête reposée."
              ]
          }
      ],
      projects: [],
      showProjectCard: false,
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

        if (rotation > interactMaxRotation)
          rotation = interactMaxRotation;
        else if (rotation < -interactMaxRotation)
          rotation = -interactMaxRotation;

        this.interactSetPosition({ x, y, rotation });
      },

      onend: () => {
        const { x, y } = this.interactPosition;
        const { interactXThreshold, interactYThreshold } = this.$options.static;
        this.isInteractAnimating = true;

        if (x > interactXThreshold)
          this.playCard(ACCEPT_CARD);
        else if (x < -interactXThreshold)
          this.playCard(REJECT_CARD);
        else if (y > interactYThreshold)
          this.playCard(SKIP_CARD);
        else
          this.resetCardPosition();
      }
    });

    interact("#formSubmitBtn").on('tap', () => {
      if(this.valid)
        this.validateForm();
    });

    interact(".presentation-list-group").on('tap', (event) => {
      this.presentationList.forEach(item => {
        item.isActive = item.id == event.currentTarget.id ? !item.isActive : false;
      });
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
    },

    validateForm() {
      this.formDatas.message = "Hello futur moi, " + this.formDatas.name + " " + this.formDatas.firstname + " te contacte depuis la version mobile. Prends rapidement contact ! Ciao !"
      if(this.$refs.form.validate()) {
        ApiServices.submitForm(this.formDatas).then(res => {
          if(res.status == 200)
            this.formSent = true;
          // Gestion des erreurs à ajouter ( status = 400 || 403 || 401 || 404)
        });
      }
    },
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
  padding-left: 3vh;
}

.form {
  width: 90%;
  margin: 3vh;
}

.validate-message {
    color: #4caf50;
    font-size: 2vh;
    padding-top: 2vh;
}
.project-data-list {
  background-color: #13155f;
}

span.v-ripple__container {
  display: none !important;
}

</style>
