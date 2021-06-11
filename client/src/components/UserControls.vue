<template>
  <div id="content">
    <div id="username-input">
      <label for="username">Pleas enter your player name: </label>
      <input
        v-model="username"
        name="username"
        type="text"
        placeholder="User name..."
      />
    </div>

    <div v-if="username">
      <h3 id="info">Enter your own word or choose a random existing word:</h3>
      <label for="input-word">Your Word: </label>
      <input v-model="enteredWord.word" type="text" name="input-word" />
      <h3>{{ validationError }}</h3>
      <label for="hint">Hint about the word:</label>
      <input
        v-model="enteredWord.hint"
        type="text"
        placeholder="Hint (Optional)"
      />
      <button @click="getRandomWord">Random Word</button>
      <button
        :disabled="!enteredWord.word && !randomWord.word"
        @click="startGame"
      >
        Start Game!
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
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

  computed: {
    words() {
      return this.$store.state.words;
    },
  },
  methods: {
    getRandomWord() {
      const randomWordIndex = Math.floor(Math.random() * this.words.length);
      this.randomWord = this.words[randomWordIndex];
      this.enteredWord.word = null;
      this.enteredWord.hint = null;
    },

    async startGame() {
      this.$store.commit("setUsername", this.username);
      let gameWord = {
        word: "",
        hint: "",
      };

      if (this.enteredWord.word) {
        if (!this.validateInput(this.enteredWord.word)) {
          return;
        }
        gameWord = this.enteredWord;
        // Saving the entered word object in databse so these words can be randomly
        // used when someone plays the game.
        await this.postWord(gameWord);
      } else gameWord = this.randomWord;
      this.$store.commit("setGameWord", gameWord);
      this.changeStep();
    },

    changeStep() {
      this.$emit("nextStep", "GameBoard");
    },

    validateInput(word) {
      let letters = /^[a-z]*$/i;
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
      postWord = await postWord.json();
      console.log(postWord);
    },
  },
};
</script>

<style>
</style>