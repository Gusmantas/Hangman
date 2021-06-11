<template>
  <main class="home">
    <h3>Welcome To Hangman! Ready to play?</h3>
    <component @nextStep="changeStep" :is="selectedComponent"> </component>
  </main>
</template>

<script>
import UserControls from "../components/UserControls.vue";
import GameBoard from "../components/GameBoard.vue";

export default {
  name: "Home",
  components: {
    UserControls,
    GameBoard,
  },
  data() {
    return {
      selectedComponent: "UserControls",
    };
  },
  created() {
    this.$store.dispatch("getWords");
  },
  methods: {
    changeStep(component) {
      this.selectedComponent = component;
    },
  },
};
</script>
