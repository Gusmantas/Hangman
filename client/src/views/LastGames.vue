<template>
  <div>
    <div v-if="scores.length">
      <div id="scoreboard-titles">
        <p>Player</p>
        <p>Date</p>
        <p>Status</p>
      </div>
      <div v-for="(score, i) of scores" :key="i">
        <score-card :score="score" />
      </div>
    </div>
    <div v-else>
      <div id="spinner"></div>
    </div>
  </div>
</template>

<script>
import ScoreCard from "../components/ScoreCard.vue";
export default {
  components: {
    ScoreCard,
  },
  data() {
    return {
      scores: [],
    };
  },
  computed: {
    // scores() {
    //   return this.$store.state.scores;
    // },
  },
  async created() {
    // this.$store.dispatch("getScores");
    let results = await fetch("api/v1/scores");
    this.scores = await results.json();
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/scoreBoard.scss";
</style>