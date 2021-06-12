<template>
  <div id="username-input">
    <label for="username">Please enter player name: </label>
    <input
      @keyup.enter="submitPlayerName"
      v-model="playerName"
      name="username"
      type="text"
      placeholder="Player name..."
    />
    <button :disabled="!playerName" @click="submitPlayerName">Submit</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playerName: "",
    };
  },

  methods: {
    submitPlayerName() {
      this.$store.commit("setPlayerName", this.playerName);
      this.changeStep();
    },
    changeStep() {
      this.$emit("nextStep", "WordSelection");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/playerNameInput.scss";
</style>