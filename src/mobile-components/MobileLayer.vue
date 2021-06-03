<template>
    <v-container id="first-layer" fluid>
      <card-layer v-for="(card, index) in cards"
                  :key="card" 
                  :card="card"
                  class="cards"
                  :is-current="index === 0" 
                  @cardAccepted="test('cardAccepted');"
                  @cardRejected="test('cardRejected');"
                  @cardSkipped="test('cardSkipped');">
      </card-layer>
    </v-container>
</template>
<script>
import CardLayer from './CardLayer';

export default {
    name: "MobileLayer",
    components: {
      CardLayer
    },
    methods: {
      test(value) {
        console.log(value);
        let first = this.cards.shift();
        this.cards.push(first);
      },
    },
    props: {
      cards: {
        type: Array,
        required: true
      }
    },
    componentDidUpdate(prevCards) {
      console.log(prevCards);
    } 
}
</script>
<style lang="scss" scoped>
.cards {
  position: absolute;
  display: flex;
  width: 100%;
  margin-top: 1vh;
}
.container {
  padding: 0;
}
#first-layer {
  background-color: black;
}
</style>