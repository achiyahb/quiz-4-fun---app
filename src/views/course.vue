<template>
  <div>
  <v-row>
    <v-spacer></v-spacer>
    <a style="cursor: pointer">
    <router-link :to="`/`">
      <v-icon  class="fas fa-times ml-8 mt-2"></v-icon>
    </router-link>
    </a>
  </v-row>
  <div class="home">
    <Chapters/>

  </div>
  </div>
</template>

<script>
import Chapters from "../components/Chapters";
import Login from "../components/Login";

export default {
  name: 'course',
  components: {
    Login,
    Chapters,
  }
}
</script>
