import { createStore } from "vuex";

export default createStore({
  state: {
    words: [],
    scores: [],
    playerName: '',
    gameWord: ''
  },
  mutations: {
    setWords(state, words) {
      state.words = words
    },
    setScores(state, scores) {
      state.scores = scores
    },
    setPlayerName(state, name) {
      state.playerName = name
    },
    setGameWord(state, word) {
      state.gameWord = word
    }
  },
  actions: {
    async getWords(context) {
      let words = await fetch("api/v1/words");
      words = await words.json();
      context.commit("setWords", words);
    },
  },
  modules: {},
});
