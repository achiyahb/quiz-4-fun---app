import firebaseInstance from '../firebase';
import database from 'firebase/database'

const db = firebaseInstance.firebase.database();

export default {
    writeData,
    deleteData,
    updateData,
    getData,
    pathFactory,
    getAttemptIndex
}


// the good one
function getData(path) {
    return db.ref(path).once('value')
        .then(res => {
            return res.val();
        })
}

function updateData(data, path){
    db.ref(path).set(data);
}

function writeData(data, path) {
    db.ref(path).push(data);
}

function deleteData(path) {
    db.ref(path).set(null);
}

// need to be generic
function pathFactory(i, self, gameMode, attemptIndex) {
    const user = firebaseInstance.firebase.auth().currentUser;
    let fullPath =[]
    let attIndex = attemptIndex ? attemptIndex : 1
    if (gameMode){
        fullPath = ["users", "tozV3RfSxTXsA3IMPoT6GTQZ4IZ2", "courses", "-MBoyyuLOcId_2rXYadx" ,"users", user.uid ,"chapters",self.$route.params.chaid,"attempts",attIndex,"questions",self.$route.params.qid]
    } else{
        fullPath = ["users", "tozV3RfSxTXsA3IMPoT6GTQZ4IZ2", "courses", "-MBoyyuLOcId_2rXYadx" ,"chapters",self.$route.params.chaid,"questions",self.$route.params.qid]
    }
    const pathArray = fullPath.splice(0,i+2)
    return pathArray.join('/')
}
function getAttemptIndex(self) {
    const path = pathFactory(8, self, 'gameMode')
    return  getData(path)
        .then(result => {
            let attempts = result
            return attempts.index ? attempts.index : 1
            })
}


