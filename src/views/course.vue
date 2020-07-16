<template>
  <div class="home">
    <Chapters/>

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
