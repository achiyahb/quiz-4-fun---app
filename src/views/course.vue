<template>
    <div class="about">
        <h2>ברוכים הבאים</h2>
        <h2>הגעתם לquizard!!</h2>
        <login v-if="!thereUser" :cid="$route.params.cid"/>

    </div>
</template>

<script>
    import RtdbFirebase from "../middelware/api/RtdbFirebase";
    import Login from "../components/Login";
    import firebaseInstance from '../middelware/firebase';
    export default {
        components: {Login},
        data: () => ({
            course: {
                courseName: ""
            },
            thereUser: false
        }),
        created() {
            const user = firebaseInstance.firebase.auth().currentUser;
            if (user){
                this.thereUser = true
            }
    }


    }
</script>