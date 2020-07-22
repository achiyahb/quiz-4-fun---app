<template>
    <div>
<v-row>
    <v-spacer></v-spacer>
    <a style="cursor: pointer">
    <router-link :to="`/courses/${$route.params.cid}`">
        <v-icon @click="deleteData()" class="fas fa-times ml-8 mt-2"></v-icon>
    </router-link>
    </a>

</v-row>
            <v-container>
        <v-row justify="center" align="start">
            <v-col
                    cols="12"
                    md="12"
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
                    md="12"
                    xs="11"
                    sm="5"
            >
                <a style="cursor: pointer">
                    <div
                            :class="'rounded-lg'"
                            class="pa-3 text-center blue lighten-2 black--text"
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
            authorId: ""
        }),
        methods: {
            async checkTheAnswer(answer){
                //define user's answer values
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
                }

                // push user's answer values to data base
                const self = this
                const path = firebaseApi.pathFactory(9, self, this.authorId,'itGameMode')
                console.log(userAnswer)
                console.log(path)
                await firebaseApi.updateData(userAnswer, path)

                // move to the next page
                if(!this.randomKeys[0]){
                    await this.$router.push({ path: `/courses/${this.$route.params.cid}/chapters/${this.$route.params.chaid}/score`})
                } else {
                  await this.$router.push({ path: `/courses/${this.$route.params.cid}/chapters/${this.$route.params.chaid}/questions/${this.randomKeys[0]}`})
                    await location.reload()
                }
            },
                deleteData() {
                    const self=this
                    const path = firebaseApi.pathFactory(7, self, this.authorId,'gameMode')
                    RtdbFirebase.deleteData(path)
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
            this.randomKeys = this.deleteTheFirst;
            StorageDriver.updateAllStorageTable('randomKeys', this.randomKeys)
        }
    }

</script>

<style scoped>

</style>