<template>
  <div>
    <p id="guesses-left">Guesses left: {{ guessesLeft }}</p>
    <div v-if="!playerHasWon && guessesLeft !== 0">
      <div id="secret-word">
        <h1 v-for="(underscore, i) in maskedLetters" :key="i">
          {{ underscore }}
        </h1>
      </div>
      <keyboard @validateLetter="validateLetter" />
    </div>
    <span id="game-won" v-if="playerHasWon">
      <h3>Congrats! You win!</h3>
      <p>Secret word was: {{ gameWord.word.toUpperCase() }}</p>
      <button class="play-again-btn" @click="changeStep">Play Again?</button>
    </span>
    <span id="game-lost" v-if="guessesLeft === 0" @change="console.log('runs')">
      <h3>Oh no! you lost!</h3>
      <p>Secret word was: {{ gameWord.word.toUpperCase() }}</p>
      <button class="play-again-btn" @click="changeStep">Play Again?</button>
    </span>
    <span id="hint" v-if="!playerHasWon && guessesLeft !== 0">
      <button id="hint-btn" v-if="gameWord.hint" @click="displayHint">
        Hint
      </button>
      <p v-if="hintDisplayed" id="hint-text">"{{ hint }}"</p>
    </span>
  </div>
</template>

<script>
import Keyboard from "./Keyboard.vue";

export default {
  components: {
    Keyboard,
  },
  computed: {
    gameWord() {
      return this.$store.state.gameWord;
    },

    playerName() {
      return this.$store.state.playerName;
    },
  },
  data() {
    return {
      playerGuess: "",
      maskedLetters: [],
      playerHasWon: false,
      guessesLeft: 10,
      hint: "",
      hintDisplayed: false,
    };
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

      if (!this.maskedLetters.includes("_")) {
        this.playerHasWon = true;
        this.postScore("WON");
      }
    },
    displayHint() {
      this.hintDisplayed = !this.hintDisplayed;
      this.hint = this.gameWord.hint;
    },

    async postScore(status) {
      const newScore = {
        username: this.playerName,
        last_game_score: status,
      };
      let score = await fetch("api/v1/scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newScore),
      });
      await score.json();
    },
    changeStep() {
      this.$emit("nextStep", "WordSelection");
    },
  },
  // Is it wise to use watchers in this case? They are quite "expensive"...
  // I needed it to determine if user has lost. There was no other way to do it.
  watch: {
    guessesLeft: function () {
      if (this.guessesLeft === 0) {
        this.postScore("LOST");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/gameBoard.scss";
</style>