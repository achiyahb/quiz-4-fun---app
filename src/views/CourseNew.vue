<template>
    <div class="about">
        <h2 v-if="!thereUser">ברוכים הבאים</h2>
        <h2 v-if="!thereUser">הגעתם ל- quiz 4 fun!!</h2>
        <h3 v-if="!thereUser"> זהו דף ההרשמה ל- "{{quizDetails.quizName}}"</h3>
          <br>
        <h4 v-if="!thereUser">כדי שתוכלו להרשם לחידון, ראשית עליכם להרשם לאפליקציה</h4>
        <h2 v-if="thereUser">נהדר, אתם רשומים לאפליקציה</h2>
        <h2 v-if="thereUser" > quiz 4 fun!!</h2>
        <h4 v-if="thereUser">כעת על מנת להרשם לחידון: "{{quizDetails.quizName}}" לחצו על הכפתור, הרשם לחידון</h4>
        <h4 v-if="thereUser">אם נרשמתם כבר לחידון המבוקש תוכלו לעבור מיד לאזור האישי שלכם</h4>
        <v-container>
            <v-row
                    justify="center"
            >
                <v-col
                        cols="11"
                        mg="8"
                        xl="8"
                        xs="11"
                        sm="11"
                >
                    <a style="...">
                        <v-card>
                            <v-hover>
                                <v-card-text
                                        v-if="!thereUser"
                                        @click="goToLoginPage"
                                        slot-scope="{hover}"
                                        :class="`${hover ? 'grey lighten-1 text--primary': 'grey lighten-3 text--primary'}`"
                                >
                                הכנס לכאן כדי להתחבר לאפליקציה
                                </v-card-text>
                            </v-hover>
                        </v-card>
                    </a>
                </v-col>
                <v-col
                        cols="11"
                        mg="8"
                        xl="8"
                        xs="11"
                        sm="11"
                >
                    <a style="...">
                        <v-card>
                            <v-hover>
                                <v-card-text
                                        v-if="thereUser"
                                        @click="createClient"
                                        slot-scope="{hover}"
                                        :class="`${hover ? 'grey lighten-1 text--primary': 'grey lighten-3 text--primary'}`"
                                >
                                    {{goTo? `נרשמת לחידון "${quizDetails.quizName}" בהצלחה, מייד תועבר לאזור האישי שלך`:`הרשם לחידון`}}
                                </v-card-text>
                            </v-hover>
                        </v-card>
                    </a>
                </v-col>
                <v-col
                        cols="11"
                        mg="8"
                        xl="8"
                        xs="11"
                        sm="11"
                >
                    <a style="...">
                        <v-card>
                            <v-hover>

                                <v-card-text
                                        v-if="thereUser &&  !goTo"
                                        @click="goToClient()"
                                        slot-scope="{hover}"
                                        :class="`${hover ? 'grey lighten-1 text--primary': 'grey lighten-3 text--primary'}`"
                                >
                                    הכנס לאיזור האישי שלך
                                </v-card-text>

                            </v-hover>
                        </v-card>
                    </a>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import RtdbFirebase from "../middelware/api/RtdbFirebase";
    import firebaseInstance from '../middelware/firebase';
    import authentication from "../middelware/api/authentication";
    import OnlineCheck from "../components/onlineCheck";
    import Login from "../components/Login";

    export default {
        components: {Login, OnlineCheck},
        data: () => ({
            quizDetails: {
                quizName: ""
            },
            thereUser: false,
            client: "",
            goTo: false,
            access: false
        }),
        methods: {
            createClient() {
                const self = this
                authentication.createClient(self, this.client.uid)
                localStorage.setItem('lastQuizName', JSON.stringify(this.quizDetails.quizName));
                this.goTo = true
                setTimeout( () => this.$router.push({ path: `/`}), 3000);
            },
            goToClient() {
                this.$router.push({path: `/`})
            },
            goToLoginPage() {
              this.$router.push('/login')
            }
        },
        created() {
            this.client = JSON.parse(localStorage.getItem('UserId'));
            if (this.client) {
                this.thereUser = true
            }
            this.goTo = false
            const self =this
            const path = RtdbFirebase.pathForQuiz(self,3)
            this.quizDetails = RtdbFirebase.getData(path)
                .then(result => {
                    self.quizDetails = result
                })
        },


    }
</script>

<style>

</style>