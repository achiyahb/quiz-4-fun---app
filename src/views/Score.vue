<template>
    <div class="about">
        <h1>ציון</h1>
        <h1>{{score}}</h1>
            <v-container>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-right" v-for="header of headers">{{header.value}}</th>
                            <th class="text-right">ציון</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,key) of userAnswers1" :key="item.name">
                            <td v-for="header in headers">{{item[header.name]}}
                            </td>
                            <td v-if="item.itIsCorrect">V</td>
                            <td v-else>X</td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-container>
        <router-link :to="`/courses/${$route.params.cid}`">
            <v-btn @click="deleteData()" class="mr-4">בחזרה לחידון</v-btn>
        </router-link>
        <v-spacer></v-spacer>
        <router-link :to="`/`">
            <v-btn @click="deleteData()" class="mr-4">בחזרה לאזור האישי</v-btn>
        </router-link>
    </div>
</template>

<script>
    import firebaseApi from "../middelware/api/RtdbFirebase";
    import util from "../middelware/util";
    import StorageDriver from "../middelware/api/StorageDriver";
    import RtdbFirebase from "../middelware/api/RtdbFirebase";
    import firebaseInstance from "../middelware/firebase";

    export default {

        data: () => ({
            headers: [
                {name: "question", value: "השאלה"},
                {name: "userChoice", value: "התשובה שלך"},
            ],
            userAnswers: {
                question: "",
                userChoice: "",
                itIsCorrect: true,
                correctAnswer: 0,
            },
            userAnswers1: [],

            scorePerAns: undefined,
            score: undefined,
            clientId: ""
        }),
        methods:{
          deleteData() {
              StorageDriver.updateAllStorageTable('userAnswers',null)
              // self=this
              // const path = firebaseApi.pathFactory(7, self, self.authorId,'gameMode')
              // RtdbFirebase.deleteData(path)
              }
        },
        created() {
            let answersArray = []
            answersArray = StorageDriver.getFromStorage('userAnswers')
            this.userAnswers1 = answersArray
            let i = 0
            let j = 0
            for (let prop of answersArray){

                if (prop.itIsCorrect){
                    j++
                }
                i++
            }
            this.scorePerAns = 100 / i
            this.score = (this.scorePerAns * j);
            //     const self = this;
            // const authorIdPath = RtdbFirebase.getAutherIdPath(self)
            // let quiz = RtdbFirebase.getData(authorIdPath)
            //     .then(result => {
            //         quiz = result
            //         self.authorId = quiz['authorId']
            //         const path = firebaseApi.pathFactory(8, self, self.authorId,'gameMode')
            //         this.userAnswers = firebaseApi.getData(path)
            //             .then(result => {
            //                 self.userAnswers = result
            //                 let i = 0
            //                 let j = 0
            //                 for (let prop in self.userAnswers){
            //                     i++
            //                     if (self.userAnswers[prop].itIsCorrect){
            //                         j++
            //                     }
            //                 }
            //                 self.scorePerAns = 100 / i
            //                 self.score = (self.scorePerAns * j);
            //             })
            //     })
            const user = firebaseInstance.firebase.auth().currentUser;
            this.clientId=user.uid;

        },


    }
</script>