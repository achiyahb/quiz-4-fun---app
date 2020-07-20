<template>
    <div class="about">
        <h2>ברוכים הבאים</h2>
        <h2>הגעתם ל- quizz for fun!!</h2>
        <login/>
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
                                        class="grey lighten-2 cardBtn"
                                        @click="check()"
                                        slot-scope="{hover}"
                                        :class="`${hover ? 'grey lighten-1 text--primary': 'grey lighten-3 text--primary'}`"
                                >
                                    {{thereUser?'התחברת בהצלחה':'בדוק חיבור'}}
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
                                        @click="createClient"
                                        v-if="thereUser || access"
                                        slot-scope="{hover}"
                                        :class="`${hover ? 'grey lighten-1 text--primary': 'grey lighten-3 text--primary'}`"
                                >
                                    {{goTo?'נהדר, נרשמת לחידון, המערכת טוענת נתונים ובעוד מספר שניות תוכל לגשת אליו דרך
                                    האזור האישי שלך!!':'הרשם לחידון'}}
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
                                        @click="goToClient()"
                                        v-if="thereUser"
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
            course: {
                courseName: ""
            },
            thereUser: false,
            client: "",
            goTo: false,
            access: false
        }),
        methods: {
            createClient() {
                const self = this
                this.client = firebaseInstance.firebase.auth().currentUser;
                if (!this.client) {
                    alert("you need to login first")
                    return
                }
                authentication.createClient(self, this.client.uid)
                this.goTo = true
            },
            getAccess() {
                this.access = true
                this.client = firebaseInstance.firebase.auth().currentUser;
                if (this.client) {
                    this.thereUser = true
                }
            },
            goToClient() {
                this.$router.push({path: `/`})
            },
            check() {
                this.client = firebaseInstance.firebase.auth().currentUser;
                if (this.client) {
                    this.thereUser = true
                }
            }
        },
        created() {
            this.client = firebaseInstance.firebase.auth().currentUser;
            if (this.client) {
                this.thereUser = true
            }
            this.goTo = false
        },


    }
</script>

<style>

</style>