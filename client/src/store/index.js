import { createStore } from "vuex";

export default createStore({
  state: {
    words: [],
    scores: [],
    username: '',
    gameWord: ''
  },
  mutations: {
    setWords(state, words){
      state.words = words
    },
    setScores(state, scores){
      state.scores = scores
    },
    setUsername(state, username){
      state.username = username
    },
    setGameWord(state, word){
      state.gameWord = word
    }
  },
  actions: {},
  modules: {},
});
