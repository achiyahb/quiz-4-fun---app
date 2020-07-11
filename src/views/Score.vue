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
                        </thead>
                        <tbody>
                        <tr v-for="(item,key) in userAnswers" :key="item.name">
                            <td v-for="header in headers">{{item[header.name]}}
                            </td>
                            <td v-if="item.itIsCorrect">{{scorePerAns}}</td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-container>
        <router-link to="/">
            <v-btn class="mr-4">חזור</v-btn>
        </router-link>
    </div>
</template>

<script>
    import firebaseApi from "../middelware/api/RtdbFirebase";
    import util from "../middelware/util";
    import StorageDriver from "../middelware/api/StorageDriver";

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
            scorePerAns: undefined,
            score: undefined
        }),
        created() {
                const self = this;
                const path = firebaseApi.pathFactory(8, self, 'gameMode')
                this.userAnswers = firebaseApi.getData(path)
                    .then(result => {
                        self.userAnswers = result
                        let i = 0
                        let j = 0
                        for (let prop in self.userAnswers){
                            i++
                            if (self.userAnswers[prop].itIsCorrect){
                               j++
                            }
                        }
                        self.scorePerAns = 100 / i
                        self.score = (self.scorePerAns * j);
                    })
        },


    }
</script>