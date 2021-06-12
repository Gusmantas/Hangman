<template>
  <div id="score-card">
    <p id="playername">{{ score.username }}</p>
    <p id="score-date">{{ new Date(score.timestamp).toLocaleDateString() }}</p>
    <p
      id="lost-won"
      :style="[
        score.last_game_score === 'WON' ? { color: 'green' } : { color: 'red' },
      ]"
    >
      {{ score.last_game_score }}
    </p>
  </div>
</template>

<script>
export default {
  props: ["score"],
};
</script>

<style lang="scss" scoped>
@import "../scss/scoreBoard.scss";
</style>