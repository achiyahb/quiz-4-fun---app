<template>
    <v-container >
        <v-row class="text-center" align="start">
            <v-container
                    v-for="(chapter,key) of chapters" class="text-center"
                    :class="`justify-'space-around' mb-6`"
                    color="grey lighten-2"
            >

                <v-responsive @click="randomArray(key)"
                        class="text-center try grey lighten-2 rounded-circle d-inline-flex align-center justify-center"
                        height="90"
                        width="90"
                >
                        {{chapter.chapterName}}
                </v-responsive>
            </v-container>
        </v-row>
    </v-container>
</template>

<script>
  import util from "../middelware/util";
  import StorageDriver from "../middelware/api/StorageDriver";
  import router from "../router";
  import RtdbFirebase from "../middelware/api/RtdbFirebase";
  import firebaseApi from "../middelware/api/RtdbFirebase";
  export default {
    name: 'chapters',

    data: () => ({
      chapters: {
        chapterName: ""
      },

    }),
      methods: {
          randomArray(chaid) {
              // random the chapter's answers
              const randomArray = []
              const array = this.chapters[chaid][`questions`]
              for (let question in array) {
                  randomArray.push(question)
              }
              util.shuffle(randomArray)

              // set random answers to local storage
              StorageDriver.updateAllStorageTable('randomKeys', randomArray)

              //create an index of attempts


              // navigation to the first question
              this.$router.push({path: `/courses/${this.$route.params.cid}/chapters/${chaid}/questions/${randomArray[0]}`})
          }
      },
        created() {
          const self = this;
          const autherIdPath = RtdbFirebase.getAutherIdPath(self)
           let quiz = RtdbFirebase.getData(autherIdPath)
                .then(result => {
                    quiz = result
                    const authorId= quiz['authorId']
                    const path = RtdbFirebase.pathFactory(3, self, authorId)
                    this.chapters = RtdbFirebase.getData(path)
                        .then(result => {
                            self.chapters = result
                        })
                })

      }
  }
</script>

<style scoped>
    .try {
        padding-top: 0;
        padding-bottom: 0;
        margin-bottom: 0;
    }
</style>