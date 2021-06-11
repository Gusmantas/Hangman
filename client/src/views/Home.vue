<template>
  <main>
    <header>Are you ready to get hanged?</header>
    <hr />
    <component @nextStep="changeStep" :is="selectedComponent"> </component>
  </main>
</template>

<script>
import UserControls from "../components/UserControls.vue";
import GameBoard from "../components/GameBoard.vue";
import PlayerNameInput from "../components/PlayerNameInput.vue";

export default {
  name: "Home",
  components: {
    UserControls,
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

<style lang="scss" scoped>
header {
  font-size: 1.3em;
  font-weight: bold;
}
hr {
  margin-bottom: 30px;
}
</style>