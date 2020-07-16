<template>
    <div class="about">
        <h2>ברוכים הבאים</h2>
        <h2>הגעתם לquizard!!</h2>
        <login v-if="!thereUser" @click="getAccess()" :cid="$route.params.cid"/>
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
                    <v-card-text
                            class="grey lighten-2 cardBtn"
                            @click="check()"
                    >
                        בדוק חיבור
                    </v-card-text>
                </v-col>
                <v-col
                        cols="11"
                        mg="8"
                        xl="8"
                        xs="11"
                        sm="11"
                >
                    <v-card-text
                            class="grey lighten-2 cardBtn"
                            @click="createClient"
                            v-if="thereUser || access"
                    >
                        הוסף חידון
                    </v-card-text>
                </v-col>
                <v-col
                        cols="11"
                        mg="8"
                        xl="8"
                        xs="11"
                        sm="11"
                >
                    <v-card-text
                            class="grey lighten-2 cardBtn rounded-br"
                            @click="goToClient()"
                            v-if="thereUser"
                    >
                        הכנס לאיזור האישי שלך
                    </v-card-text>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import RtdbFirebase from "../middelware/api/RtdbFirebase";
    import Login from "../components/Login";
    import firebaseInstance from '../middelware/firebase';
    import authentication from "../middelware/api/authentication";
    import OnlineCheck from "../components/onlineCheck";

    export default {
        components: {OnlineCheck, Login},
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
                this.$router.push({path: `/clients/${this.client.uid}`})
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
        },


    }
</script>

<style>
    .cardBtn {

    }
</style>