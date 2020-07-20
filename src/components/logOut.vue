<template>
    <div>
        <v-container class="logoutBtn">
            <v-btn @click="signOut()">
                התנתק
            </v-btn>
        </v-container>
    </div>
</template>


<script>
    import firebase from 'firebase'
    import firebaseInstance from "../middelware/firebase"

    export default{
        name: "Logout",
        methods: {
            signOut() {
                const provider = new firebaseInstance.firebase.auth.GoogleAuthProvider()
                const self = this;
                firebase.auth().signOut().then(function() {
                    // Sign-out successful.
                }).catch(function(error) {
                    // An error happened.
                });
            }
        }
    }
</script>

<style>

</style>