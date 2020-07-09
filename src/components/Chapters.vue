<template>
    <v-container>
        <v-row class="text-center">
            <v-container
                    v-for="(chapter,key) of chapters" class="text-center"
                    :class="`justify-'space-around' mb-6`"
                    color="grey lighten-2"
            >

                <v-responsive @click="randomArray(key)"
                        class="text-center grey lighten-2 rounded-circle d-inline-flex align-center justify-center ma-3"
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
  import firebaseApi from "../middelware/api/RtdbFirebase";
  import util from "../middelware/util";
  import StorageDriver from "../middelware/api/StorageDriver";
  import router from "../router";
  export default {
    name: 'chapters',

    data: () => ({
      chapters: {
        chapterName: ""
      },

    }),
      methods: {
        randomArray(chaid){

            const randomArray = []
            const array = this.chapters[chaid][`questions`]
            for (let question in array) {
                randomArray.push(question)
            }
            util.shuffle(randomArray)
            StorageDriver.updateAllStorageTable('randomArray', randomArray)
            router.push({ path: `/chapters/${chaid}/questions/${randomArray[0]}`})
        }
      },
        created() {
          const self = this;
          const path = firebaseApi.pathFactory(3, self)
            this.chapters = firebaseApi.getData(path)
                  .then(result => {
                    self.chapters = result
                  })
      }
  }
</script>
