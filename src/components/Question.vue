<template>
    <v-container>
        <v-row justify="center">
            <v-col
                    cols="12"
                    md="2"

            >
            <div
                    :class="'rounded-lg'"
                    class="pa-6 text-center light-blue darken-3 white--text"
                    v-text="`${question}`"
            ></div>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col
                    v-for="answer of answerArr"
                    :key="answer"
                    cols="12"
                    md="2"
            >
                    <div
                            :class="'rounded-lg'"
                            class="pa-6 text-center blue lighten-2 black--text"
                            v-text="`${answer}`"
                            @click="checkTheAnswer(answer)"
                    ></div>
            </v-col>
        </v-row>
    </v-container>
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
            checkTheAnswer(answer){
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
                debugger
                const path = firebaseApi.pathFactory(8, self, this.authorId,'itGameMode')
                firebaseApi.writeData(userAnswer, path);

                // move to the next page
                if(!this.randomKeys[0]){

                    let attIndex = {}
                    const self = this
                    attIndex.index = RtdbFirebase.getAttemptIndex(self)
                        .then(result => {
                            attIndex.index = result
                            attIndex.index ++
                            const path = RtdbFirebase.pathForAtt(self)
                            firebaseApi.updateData(attIndex, path);
                        })
                    router.push({ path: `/courses/${this.$route.params.cid}/chapters/${this.$route.params.chaid}/score`})
                } else {
                    router.push({ path: `/courses/${this.$route.params.cid}/chapters/${this.$route.params.chaid}/questions/${this.randomKeys[0]}`})
                    location.reload();
                }
            }
        },
        created() {
            const self = this;
            const autherIdPath = RtdbFirebase.getAutherIdPath(self)
            let quiz = RtdbFirebase.getData(autherIdPath)
                .then(result => {
                    quiz = result
                    self.authorId = quiz['authorId']
                    const path = firebaseApi.pathFactory(6, self, self.authorId)
                    this.answers = firebaseApi.getData(path)
                        .then(result => {
                            self.answers = result
                            self.question = self.answers.question
                            delete self.answers.question;
                            for (let prop in self.answers) {
                                self.answerArr.push(self.answers[prop]);
                            }
                            util.shuffle(self.answerArr)
                        })
                })
            this.deleteTheFirst = StorageDriver.getFromStorage('randomKeys')
            this.deleteTheFirst.shift();
            this.randomKeys = this.deleteTheFirst;
            StorageDriver.updateAllStorageTable('randomKeys', this.randomKeys)
        }
    }

</script>

<style scoped>

</style>