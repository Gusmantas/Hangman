<template>
  <div id="username-input">
    <label for="username">Please enter player name: </label>
    <input
      v-model="playerName"
      name="username"
      type="text"
      placeholder="Player name..."
    />
    <button @click="submitPlayerName">Submit</button>
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
      this.$emit("nextStep", "UserControls");
    },
  },
};
</script>

<style>
button {
  margin-left: 10px;
}
</style>