<template>
  <v-app id="inspire">
    <v-app-bar
            app
            color="cyan"
            dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{course.courseName}}</v-toolbar-title>


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

  export default {
    name: 'LayoutsDemosBaselineFlipped',
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      course: {
        courseName: ""
      }
    }),

    created() {
      this.$vuetify.rtl = true
      const self = this;
      const autherIdPath = RtdbFirebase.getAutherIdPath(self)
      let quiz = RtdbFirebase.getData(autherIdPath)
              .then(result => {
                quiz = result
                const authorId= quiz['authorId']
                const path = RtdbFirebase.pathFactory(2, self, authorId)
                this.course = RtdbFirebase.getData(path)
                        .then(result => {
                          self.course = result
                        })
              })

    }
  }
</script>
 <style>
   a {
     text-decoration-line: none;
   }
 </style>