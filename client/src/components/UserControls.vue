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
      <label for="hint">Hint about the word:</label>
      <input v-model="enteredWord.hint" type="text" placeholder="hint">
      <button @click="getRandomWord">Random Word</button>
      <button :disabled="!enteredWord.word && !randomWord.word" @click="startGame">Start Game!</button>
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
        hint: null
      },
      randomWord:{
        word: null,
        hint: null
      },
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

    startGame() {
      this.$store.commit("setUsername", this.username);
      let gameWord = {
        word: '',
        hint: '',
      };
      this.enteredWord.word ? (gameWord = this.enteredWord) : (gameWord = this.randomWord);
      this.$store.commit("setGameWord", gameWord);
      console.log(gameWord);
      this.changeStep();
    },

    changeStep() {
      this.$emit("nextStep", "GameBoard");
    },
  },
};
</script>

<style>
</style>