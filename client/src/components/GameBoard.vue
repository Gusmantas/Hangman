<template>
  <main>
    <div v-if="!playerHasWon">
      <h1>GameBoard</h1>
      <div id="secret-word">
        <h1 v-for="(value, i) in gameWordLetters" :key="i">
          {{ value }}
        </h1>
      </div>
      <keyboard @validateLetter="validateLetter" />
    </div>
    <span v-if="playerHasWon">
      <h3>Congrats! You win!</h3>
      <button @click="changeStep">Play Again?</button>
    </span>
  </main>
</template>

<script>
import Keyboard from "./Keyboard.vue";

export default {
  components: {
    Keyboard,
  },
  data() {
    return {
      playerGuess: "",
      gameWordLetters: [],
      playerHasWon: false,
    };
  },
  computed: {
    gameWord() {
      return this.$store.state.gameWord;
    },
  },
  created() {
    console.log(this.gameWord);
    this.gameWordLetters = [...this.gameWord].map(() => "_");
  },
  methods: {
    validateLetter(letter) {
      this.playerGuess = letter;
      this.gameWord.includes(this.playerGuess)
        ? this.unmaskLetter(this.playerGuess)
        : this.decreaseChances();
    },
    unmaskLetter(playerGuess) {
      let indices = [];
      for (let i = 0; i < this.gameWord.length; i++) {
        if (this.gameWord[i] === playerGuess) indices.push(i);
      }

      for (let indice of indices) {
        this.gameWordLetters[indice] = playerGuess.toUpperCase();
      }

      if (!this.gameWordLetters.includes("_")) this.playerHasWon = true;
    },

    decreaseChances() {
      console.log("fail");
    },
     changeStep() {
      this.$emit("nextStep", "UserControls");
    },
  },
};
</script>

<style lang="scss" scoped>
#secret-word {
  display: flex;
  justify-content: center;
  h1 {
    padding: 15px;
  }
}
</style>