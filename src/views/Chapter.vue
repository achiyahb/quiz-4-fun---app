<template>
  <div class="about">
    <h1>{{chapter.chapterName}}</h1>
    <Question></Question>
  </div>
</template>

<script>
  import Question from "../components/Question";
  import firebaseApi from "../middelware/api/RtdbFirebase";
  import util from "../middelware/util";
  import RtdbFirebase from "../middelware/api/RtdbFirebase";
  export default {
    components: {Question},
    data: () => ({
      chapter: {
        chapterName: ""
      },
    }),
    created() {
      const self = this;
      const path = RtdbFirebase.pathFactory(4, self)
      this.chapter = RtdbFirebase.getData(path)
              .then(result => {
                self.chapter = result
              })
    }


  }
</script>