<template>
    <div class="about">
    <h2>החידונים שלך:</h2>
     <v-container v-for="(course,key) in clientCourses">
         <v-row
                 justify="center"
                 align="center"
         >
             <v-col
                     cols="12"

             >
                 <v-card-text
                         class="grey lighten-2 rounded-circle"
                         @click="goToCourse(key)"
                 >
                     {{course.courseName}}
                 </v-card-text>
             </v-col>
         </v-row>
     </v-container>
    </div>
</template>

<script>
    import RtdbFirebase from "../middelware/api/RtdbFirebase";
    import Login from "../components/Login";
    import router from "../router/index";
    export default {
        data: () => ({
            clientCourses: {
                courseName: "",
            },
        }),
        methods:{
            goToCourse(key){
                router.push({ path: `/courses/${key}`})
                location.reload();
            }
        },
        created() {
            const self =this
            const path = RtdbFirebase.pathForClient(self,3)
            this.clientCourses = RtdbFirebase.getData(path)
                .then(result => {
                self.clientCourses = result
                })
        }


    }
</script>