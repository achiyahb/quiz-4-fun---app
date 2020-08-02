<template>
    <div>

            <v-container>
                <v-row justify="center" align="start">
                      <v-col
                              cols="12"
                      >
                          <v-row>

                          <a style="cursor: pointer">
                        <v-responsive
                                class="text-center try light-blue darken-3 white--text mr-4 rounded
                       d-inline-flex align-center "
                                height="45"
                                width="45"
                        >
                            {{numQuestion}} / {{thisNum}}
                        </v-responsive>
                    </a>
                    <v-spacer></v-spacer>
                    <a style="cursor: pointer">
                        <router-link :to="`/courses/${$route.params.cid}`">
                            <v-icon @click="deleteData()" class="fas fa-times ml-4 mt-2"></v-icon>
                        </router-link>
                    </a>
                </v-row>
                </v-col>

            <v-col
                    cols="12"
            >
            <div
                    class="pa-5 text-center rounded-lg light-blue darken-3 white--text"
                    v-text="`${question}`"
            ></div>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col
                    v-for="answer of answerArr"
                    :key="answer"
                    cols="12"
                    md="6"
                    xs="12"
                    sm="12"
                    xl="6"
                    lg="6"
            >
                <a style="cursor: pointer">
                    <div
                            v-if=""
                            :class="(answer===answers.correctAnswer && answered)?'pa-3 rounded-lg text-center green lighten-2 black--text' :(answer===userAnswer && answered)?'pa-3 rounded-lg text-center red lighten-2 black--text':'pa-3 rounded-lg text-center blue lighten-2 black--text'"
                            v-text="`${answer}`"
                            @click="checkTheAnswer(answer)"
                    ></div>
                </a>
            </v-col>
        </v-row>
    </v-container>
    </div>
</template>

<script>
    import firebaseApi from "../middelware/api/RtdbFirebase";
    import StorageDriver from "../middelware/api/StorageDriver";
    import util from "../middelware/util";
    import router from "../router";
    import RtdbFirebase from "../middelware/api/RtdbFirebase";

    export default {
        name: "question",
        data: () => ({
            answers: {
                correctAnswer: "",
            },
            answerArr: [],
            question: "",
            randomKeys: [],
            deleteTheFirst: [],
            authorId: "",
            answered: false,
            userAnswer: "",
            thisNum: undefined,
            numQuestion: undefined
        }),
        methods: {
            checkTheAnswer(answer){
                //define user's answer values
                this.answered =true
                let userAnswer = {
                    userChoice: answer,
                    question: this.question,
                    correctAnswer: this.answers.correctAnswer
                }
                if(answer === this.answers.correctAnswer){
                    console.log('right answer');
                    userAnswer.itIsCorrect = true;
                } else {
                    console.log('wrong answer');
                    userAnswer.itIsCorrect = false;
                    this.userAnswer = answer
                }

                // push user's answer values to data base
                // const self = this
                // const path = firebaseApi.pathFactory(9, self, this.authorId,'itGameMode')
                // console.log(userAnswer)
                // console.log(path)
                // firebaseApi.updateData(userAnswer, path)
                StorageDriver.insertToStorage('userAnswers',userAnswer)
                // move to the next page
                if(!this.randomKeys[0]){


                    setTimeout(()=>this.$router.push({ path: `/courses/${this.$route.params.cid}/chapters/${this.$route.params.chaid}/score`}),1000)
                } else {
                   this.$router.push({ path: `/courses/${this.$route.params.cid}/chapters/${this.$route.params.chaid}/questions/${this.randomKeys[0]}`})
                    location.reload()
                }
            },
                deleteData() {
                 StorageDriver.updateAllStorageTable('userAnswers',null)
                    // const self=this
                    // const path = firebaseApi.pathFactory(7, self, this.authorId,'gameMode')
                    // RtdbFirebase.deleteData(path)
                }
        },
        created() {
            const self = this;
            const chapterQuestions =  JSON.parse(localStorage.getItem('chapterQuestions'));
            this.answers = chapterQuestions[this.$route.params.qid]
            this.question = this.answers.question
            delete this.answers.question
            for (let prop in this.answers) {
                self.answerArr.push(this.answers[prop]);
            }
            util.shuffle(self.answerArr)
           this.numQuestion = Object.size(chapterQuestions)
            const autherIdPath = RtdbFirebase.getAutherIdPath(self)
            let quiz = RtdbFirebase.getData(autherIdPath)
                .then(result => {
                    quiz = result
                    self.authorId = quiz['authorId']
                })
            //         const path = firebaseApi.pathFactory(6, self, self.authorId)
            //         this.answers = firebaseApi.getData(path)
            //             .then(result => {
            //                 self.answers = result
            //                 self.question = self.answers.question
            //                 delete self.answers.question;
            //                 for (let prop in self.answers) {
            //                     self.answerArr.push(self.answers[prop]);
            //                 }
            //                 util.shuffle(self.answerArr)
            //             })
            //     })
            this.deleteTheFirst = StorageDriver.getFromStorage('randomKeys')
            this.deleteTheFirst.shift();
            this.thisNum = this.numQuestion - this.deleteTheFirst.length

            this.randomKeys = this.deleteTheFirst;
            StorageDriver.updateAllStorageTable('randomKeys', this.randomKeys)
        }
    }

</script>

<style scoped>

</style>