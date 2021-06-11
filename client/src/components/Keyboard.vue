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
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
#letters {
  display: flex;
  justify-content: center;
  button {
    margin: 0 5px;
    padding: 15px;
    border: none;
    border-radius: 5px;

    &:hover {
      background-color: rgb(197, 209, 22);
    }
  }
}
</style>