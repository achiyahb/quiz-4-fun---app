<template>
  <v-app id="inspire">
    <v-app-bar
            app
            color="cyan"
            dark
    >
      <v-toolbar-title>{{quizDetails.quizName ? quizDetails.quizName : 'quiz 4 fun'}}</v-toolbar-title>
<v-spacer></v-spacer>
      <logout v-if="userId"></logout>

    </v-app-bar>

    <v-main>
      <v-container
              class="fill-height"
              fluid
      >
        <v-row
                align="center"
                justify="center"
        >

          <v-col class="text-center">
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <div>
                  <router-view/>
                </div>
              </template>

              <span>Source</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer
            color="cyan"
            app
    >
      <v-spacer></v-spacer>

      <span class="white--text">&copy; פותח ע"י אחיה חביב</span>

    </v-footer>
  </v-app>
</template>

<script>
  import RtdbFirebase from "./middelware/api/RtdbFirebase";
  import Logout from "./components/logOut";

  export default {
    name: 'LayoutsDemosBaselineFlipped',
    components: {Logout},
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      quizDetails: {
        quizName: ""
      },
      userId: ""
    }),

    created() {
      this.$vuetify.rtl = true
        this.userId =  JSON.parse(localStorage.getItem('UserId'));
        // const self =this
        // const path = RtdbFirebase.pathForQuiz(self,3)
        // this.quizDetails = RtdbFirebase.getData(path)
        //     .then(result => {
        //         self.quizDetails = result
        //     })

    }
  }
</script>
 <style>
   a {
     text-decoration-line: none;
   }
 </style>