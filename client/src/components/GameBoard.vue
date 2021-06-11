<template>
  <main>
    <h1>Guesses left: {{ guessesLeft }}</h1>
    <div id="content-wrapper" v-if="!playerHasWon && guessesLeft !== 0">
      <div id="secret-word">
        <h1 v-for="(underscore, i) in maskedLetters" :key="i">
          {{ underscore }}
        </h1>
      </div>
        <button v-if="gameWord.hint" @click="displayHint">Hint</button>
        <h3>{{hint}}</h3>
      <keyboard @validateLetter="validateLetter" />
    </div>
    <span v-if="playerHasWon">
      <h3>Congrats! You win!</h3>
      <h3>Secret word was: {{ gameWord.word.toUpperCase() }}</h3>
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
      maskedLetters: [],
      playerHasWon: false,
      guessesLeft: 10,
      hint: '',
    };
  },
  computed: {
    gameWord() {
      return this.$store.state.gameWord;
    },
  },
  created() {
    this.maskedLetters = [...this.gameWord.word].map(() => "_");
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
        this.maskedLetters[indice] = playerGuess.toUpperCase();
      }

      if (!this.maskedLetters.includes("_")) this.playerHasWon = true;
    },
    displayHint() {
      this.hint = this.gameWord.hint;
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