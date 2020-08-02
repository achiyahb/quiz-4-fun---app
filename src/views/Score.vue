<template>
  <div class="about">

    <h2 v-for="(massage,key) of massages" v-if="conditions[key]">{{ massage.text }} <br> {{ massage.text2 }}</h2>

    <v-btn
        v-text="showTable?'הסתר ציון ותשובות':'בדוק ציון ותשובות'"
        @click="showTable = !showTable"
    ></v-btn>
    <h1 v-if="showTable">ציון</h1>
    <h1 v-if="showTable">{{ score }}</h1>
    <v-container>
      <v-simple-table
          v-if="showTable"
      >
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-right" v-for="header of headers">{{ header.value }}</th>
            <th class="text-right">ציון</th>
          </tr>
          </thead>
          <tbody class="text-right">
          <tr v-for="(item,key) of userAnswers1" :key="item.name">
            <td v-for="header in headers">{{ item[header.name] }}
            </td>
            <td v-if="item.itIsCorrect"><i class="fas fa-check"></i></td>
            <td v-else><i class="fas fa-times"></i></td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
    <v-container>
      <v-row
          justify="center"
      >
        <router-link :to="`/courses/${$route.params.cid}`">
          <v-btn @click="deleteData()" class="mr-4">בחזרה לחידון</v-btn>
        </router-link>
        <router-link :to="`/`">
          <v-btn @click="deleteData()" class="mr-4">בחזרה לאזור האישי</v-btn>
        </router-link>
      </v-row>
    </v-container>
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
      {name: "correctAnswer", value: "התשובה הנכונה", onMobile: false},
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
    clientId: "",
    showTable: false,
    massages: [],
    conditions: [],
    default: true
  }),
  methods: {
    defineTheNotification() {
      if (this.default) {
        this.conditions = [
          (this.score === 100),
          (this.score > 50 && this.score < 100),
          (this.score <= 50 && this.score > 0),
          (this.score === 0)
        ]
        this.massages = [
          {text: 'כל הכבוד!!', text2: 'צדקת בכל התשובות!!'},
          {text: 'אתם טובים!', text2: ' אבל תמיד יש עוד מה ללמוד'},
          {text: 'לא כלכך הצלחת..', text2: 'לא נורא, אולי בפעם הבאה'},
          {text: 'ממממ..', text2: 'אולי כדאי לך, לעבור לתחום אחר'}
        ]
      }
    }
  },
  created() {
    let answersArray = []
    answersArray = StorageDriver.getFromStorage('userAnswers')
    this.userAnswers1 = answersArray
    let i = 0
    let j = 0
    for (let prop of answersArray) {

      if (prop.itIsCorrect) {
        j++
      }
      i++
    }
    this.scorePerAns = 100 / i
    let num = this.scorePerAns * j
    this.score = Math.floor(num);
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
    // this.clientId=user.uid;
    this.defineTheNotification()
    }



}
</script>