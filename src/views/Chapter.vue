<template>
  <div class="about">
    {{questionArray}}
    <Question :qArray="questionArray"></Question>
  </div>
</template>

<script>
  import Question from "../components/Question";
  import firebaseApi from "../middelware/api/RtdbFirebase";
  import util from "../middelware/util";
  export default {
    components: {Question},
    data: () => ({
      chapter: {
        chapterName: ""
      },
      willBeRandom: [],
      questionArray: []
    }),
    created() {
      const self = this;
      const path = firebaseApi.pathFactory(5, self)
      this.chapter = firebaseApi.getData(path)
              .then(result => {
                self.chapter = result
                for (let question in self.chapter) {
                  self.willBeRandom.push(question)
                }
                self.questionArray = util.shuffle(self.willBeRandom)
              })
    },


  }
</script>