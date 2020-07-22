import firebaseInstance from '../firebase';
import database from 'firebase/database'

const db = firebaseInstance.firebase.database();

export default {
    writeData,
    deleteData,
    updateData,
    getData,
    pathFactory,
    getAttemptIndex,
    pathForAtt,
    pathForClient,
    getAutherIdPath,
    pathForQuiz
}



// the good one
function getData(path) {
    return db.ref(path).once('value')
        .then(res => {
            return res.val();
        })
}

function updateData(data, path){
   db.ref(path).set(data)
}

function writeData(data, path) {
    db.ref(path).push(data);
}

function deleteData(path) {
    db.ref(path).set(null);
}

// need to be generic
function pathFactory(i, self,authorId, gameMode, attemptIndex,chaid) {
    const client = firebaseInstance.firebase.auth().currentUser;
    let fullPath =[]
    let attIndex = attemptIndex ? attemptIndex : 1
    if (!chaid && i>3 && !gameMode){
        chaid = self.$route.params.chaid
    }
    if (gameMode){
        fullPath = ["users", authorId, "courses", self.$route.params.cid ,"users", client.uid ,"chapters",self.$route.params.chaid,"attempts",attIndex,self.$route.params.qid]
    } else{
        fullPath = ["users", authorId, "courses", self.$route.params.cid ,"chapters",chaid,"questions",self.$route.params.qid]
    }
    const pathArray = fullPath.splice(0,i+2)
    return pathArray.join('/')
}
function getAttemptIndex(self) {
    const path = pathForAtt(self)
    return  getData(path)
        .then(result => {
            let attIndex = result ? result : {}
            return attIndex.index ? attIndex.index : 1
            })
}

function pathForAtt(self) {
    const user = firebaseInstance.firebase.auth().currentUser;
    const pathArray = ["users", "tozV3RfSxTXsA3IMPoT6GTQZ4IZ2", "courses", "-MBoyyuLOcId_2rXYadx" ,"users", user.uid ,"chapters",self.$route.params.chaid,"attempts","attIndex"]
    return pathArray.join('/')
}

function pathForClient(self,i, clid){
    if (!clid){
        const client = firebaseInstance.firebase.auth().currentUser;
        clid =client.uid
    }
    const fullPath = ["clients",clid,"quizzes",self.$route.params.cid]
    const pathArray = fullPath.splice(0,i)
    return pathArray.join('/')
}

function getAutherIdPath(self) {
    const pathArray = ["quizzes",self.$route.params.cid]
    return pathArray.join('/')
}

function pathForQuiz(self) {
    const pathArray = ["quizzes",self.$route.params.cid,"quizDetails"]
    return pathArray.join('/')
}
