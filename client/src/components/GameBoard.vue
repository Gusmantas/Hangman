<template>
  <main>
    <h1>Guesses left: {{ guessesLeft }}</h1>
    <div v-if="!playerHasWon && guessesLeft !== 0">
      <div id="secret-word">
        <h1 v-for="(value, i) in gameWordLetters" :key="i">
          {{ value }}
        </h1>
        <button @click="displayHint">Hint</button>
      </div>
      <keyboard @validateLetter="validateLetter" />
    </div>
    <span v-if="playerHasWon">
      <h3>Congrats! You win!</h3>
      <button @click="changeStep">Play Again?</button>
    </span>
    <span v-if="guessesLeft === 0">
      <h1>Oh no! you lost!</h1>
      <h3>Secret word was: {{ gameWord.word.toUpperCase() }}</h3>
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
      guessesLeft: 10,
    };
  },
  computed: {
    gameWord() {
      return this.$store.state.gameWord;
    },
  },
  created() {
    this.gameWordLetters = [...this.gameWord.word].map(() => "_");
  },
  methods: {
    validateLetter(letter) {
      this.playerGuess = letter;
      this.gameWord.word.includes(this.playerGuess)
        ? this.unmaskLetter(this.playerGuess)
        : this.guessesLeft--;
    },
    unmaskLetter(playerGuess) {
      let indices = [];
      for (let i = 0; i < this.gameWord.word.length; i++) {
        if (this.gameWord.word[i] === playerGuess) indices.push(i);
      }
      for (let indice of indices) {
        this.gameWordLetters[indice] = playerGuess.toUpperCase();
      }

      if (!this.gameWordLetters.includes("_")) this.playerHasWon = true;
    },
    displayHint(){
      console.log(this.gameWord.hint);
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