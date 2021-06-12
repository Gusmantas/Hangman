<template>
  <main>
    <component @nextStep="changeStep" :is="selectedComponent"> </component>
  </main>
</template>

<script>
import WordSelection from "../components/WordSelection.vue";
import GameBoard from "../components/GameBoard.vue";
import PlayerNameInput from "../components/PlayerNameInput.vue";

export default {
  name: "Home",
  components: {
    WordSelection,
    GameBoard,
    PlayerNameInput,
  },
  data() {
    return {
      selectedComponent: "PlayerNameInput",
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
