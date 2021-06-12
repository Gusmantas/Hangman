<template>
  <div>
    <p class="info">Enter your own word:</p>
    <div id="user-entered-word">
      <label for="input-word">Your Word: </label>
      <input
        v-model="enteredWord.word"
        type="text"
        name="input-word"
        placeholder="Enter secret word..."
      />
      <p id="validation-error">{{ validationError }}</p>
      <label for="hint">Hint about the word:</label>
      <textarea
        rows="5"
        v-model="enteredWord.hint"
        type="text"
        placeholder="Enter hint (optional)..."
      />
    </div>
    <p class="info">Or generate a random word:</p>
    <div id="buttons">
      <button id="random-word-btn" @click="getRandomWord">RANDOM WORD</button>
      <button
        id="start-game-btn"
        :disabled="!enteredWord.word && !randomWord.word"
        @click="startGame"
      >
        START GAME!
      </button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    words() {
      return this.$store.state.words;
    },
  },
  data() {
    return {
      enteredWord: {
        word: null,
        hint: null,
      },
      randomWord: {
        word: null,
        hint: null,
      },
      validationError: "",
    };
  },
  methods: {
    getRandomWord() {
      const randomWordIndex = Math.floor(Math.random() * this.words.length);
      this.randomWord = this.words[randomWordIndex];
      this.enteredWord.word = null;
      this.enteredWord.hint = null;
    },

    async startGame() {
      let gameWord = {
        word: "",
        hint: "",
      };

      // Ugly if cases. Tried with ternary, but it was harder to read. Other solutions?
      if (this.enteredWord.word) {
        if (!this.validateInput(this.enteredWord.word)) return;
        this.enteredWord.word = this.enteredWord.word.toLowerCase();
        gameWord = this.enteredWord;
        // Saving the entered word object in database so these words can be randomly
        // used when someone else plays the game.
        await this.postWord(gameWord);
      } else gameWord = this.randomWord;

      this.$store.commit("setGameWord", gameWord);
      this.changeStep();
    },

    changeStep() {
      this.$emit("nextStep", "GameBoard");
    },

    validateInput(word) {
      let letters = /^[a-zäöå]*$/i;
      if (!word.match(letters)) {
        this.validationError = "Only letters are allowed!";
        this.enteredWord.word = null;
        return false;
      }
      return true;
    },

    async postWord(word) {
      let postWord = await fetch("api/v1/words", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(word),
      });
      await postWord.json();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/wordSelection.scss";
</style>