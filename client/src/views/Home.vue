<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  async created() {
    await this.getData();
  },
  methods: {
    async getData(){
      let data = await fetch('api/v1/words')
      data = await data.json();
      console.log(data);
    }
  }
};
</script>
