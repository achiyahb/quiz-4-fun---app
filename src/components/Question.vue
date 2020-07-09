<template>
    <v-container>
        {{$route.params}}
        <br><br>
        {{questionArray}}
    </v-container>
</template>

<script>
    import firebaseApi from "../middelware/api/RtdbFirebase";

    export default {
        name: "question",
        props: ['qArray'],
        data: () => ({
            question: {
                chapterName: ""
            },
            questionArray: []
        }),
        created() {
            const self = this;
            const path = firebaseApi.pathFactory(5, self)
            this.chapters = firebaseApi.getData(path)
                .then(result => {
                    self.chapters = result
                })
            this.questionArray = this.qArray
        }
    }

</script>

<style scoped>

</style>