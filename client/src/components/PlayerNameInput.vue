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

<style lang="scss" scoped>
button {
  margin-left: 10px;
  padding: 5px;
}
#username-input {
  label {
    font-weight: 900px;
  }
  input {
    width: 15%;
    padding: 5px;
  }
}
</style>