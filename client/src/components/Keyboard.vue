<template>
  <div id="letters">
    <button
      @click="validateLetter($event, letter)"
      v-for="letter in alphabet"
      :key="letter"
    >
      {{ letter.toUpperCase() }}
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    validateLetter(event, letter) {
      event.target.disabled = true;
      this.$emit("validateLetter", letter);
    },
  },
  data() {
    return {
      alphabet: [
        "q",
        "w",
        "e",
        "r",
        "t",
        "y",
        "u",
        "i",
        "o",
        "p",
        "å",
        "a",
        "s",
        "d",
        "f",
        "g",
        "h",
        "j",
        "k",
        "l",
        "ö",
        "ä",
        "z",
        "x",
        "c",
        "v",
        "b",
        "n",
        "m",
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/keyboard.scss";
</style>