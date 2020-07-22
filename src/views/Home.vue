<template>
    <div class="about">
    <h2>החידונים שלך:</h2>
     <v-container v-for="(course,key) in clientCourses">
         <v-row
                 justify="center"
                 align="center"
         >
             <v-col
                     cols="8"

             >
                 <a style="...">
                 <v-card>
                     <v-hover>

                         <v-card-text


                                 @click="goToCourse(key)"
                                 slot-scope="{hover}"
                                 :class="`${hover ? 'grey lighten-1 text--primary': 'grey lighten-2  text--primary'}`"
                         >
                             {{course.quizName ? course.quizName : lastQuizName}}
                         </v-card-text>

                     </v-hover>
                 </v-card>
                 </a>


             </v-col>

         </v-row>
     </v-container>
        
    </div>
</template>
<!--{{goTo?'נהדר, נרשמת לחידון, המערכת טוענת נתונים ובעוד מספר שניות תוכל לגשת אליו דרך האזור האישי שלך!!':'הרשם לחידון'}}-->

<script>
    import RtdbFirebase from "../middelware/api/RtdbFirebase";
    import Login from "../components/Login";
    import router from "../router/index";
    export default {
        name: 'Home',
        data: () => ({
            clientCourses: {
                courseName: null,
                quizName: null
            },
            lastQuizName: "",

        }),
        methods:{
            goToCourse(key){
                router.push({ path: `/courses/${key}`})
            }
        },
        created() {
            const self =this
            const path = RtdbFirebase.pathForClient(self,3)
            this.clientCourses = RtdbFirebase.getData(path)
                .then(result => {
                self.clientCourses = result
                })
            this.lastQuizName =  JSON.parse(localStorage.getItem('lastQuizName'));
            localStorage.setItem('lastQuizName', JSON.stringify(null));
        }


    }
</script>