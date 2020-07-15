<template>
    <div class="about">
    <h2>החידונים שלך:</h2>
     <v-container>
         <v-row
                 justify="center"
                 align="center"
         >
             <v-col
                     cols="12"
                     rounded="circle"
             >
                 <v-card-text>
                     {{clientCourses.courseName}}
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
    export default {
        components: {Login},
        data: () => ({
            clientCourses: {
                courseName: ""
            },
            thereUser: false
        }),
        created() {
            self =this
            const path = RtdbFirebase.getClientPath()

        }


    }
</script>