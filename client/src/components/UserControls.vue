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
      <input v-model="word" type="text" name="input-word" />
      <button @click="getRandomWord">Random Word</button>
      <button :disabled="!word && !randomWord" @click="startGame">Start Game!</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      word: null,
      randomWord: null,
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
      this.randomWord = this.words[randomWordIndex].word;
      this.word = null;
    },

    startGame() {
      this.$store.commit("setUsername", this.username);
      let gameWord = "";
      this.word ? (gameWord = this.word) : (gameWord = this.randomWord);
      this.$store.commit("setGameWord", gameWord.toLowerCase());
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