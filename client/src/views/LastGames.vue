<template>
  <div>
    <div v-if="scores.length">
      <span id="scoreboard-titles">
        <p>Player</p>
        <p>Date</p>
        <p>Status</p>
      </span>
      <span v-for="(score, i) of scores" :key="i">
        <score-card :score="score" />
      </span>
    </div>
    <span v-else>
      <div id="spinner"></div>
    </span>
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
  async created() {
    let results = await fetch("api/v1/scores");
    this.scores = await results.json();
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/scoreBoard.scss";
</style>