<template>
  <div class="home">
    <header id="header">Are you ready to get hanged?</header>
    <navbar />
    <router-view />
  </div>
</template>
<script>
import Navbar from "./components/Navbar.vue"
export default {
  components: {
    Navbar,
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Patua+One&display=swap');
@import "./scss/home.scss";
#app {
  font-family: Patua One, Helvetica, Arial, sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 1px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  background-color: rgb(218, 221, 247);
  margin: 10px 0 0 0 ;
  box-sizing: border-box;
}
</style>
