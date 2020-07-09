import firebaseInstance from '../firebase';
import database from 'firebase/database'

const db = firebaseInstance.firebase.database();

export default {
    writeData,
    deleteData,
    updateData,
    getData,
    pathFactory
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
function pathFactory(i, self, id) {
    const user = firebaseInstance.firebase.auth().currentUser;
    const fullPath = ["users", "GRtBTMCkV2aCQpq400Js3S70seL2", "courses", "-MBdJeQdKYUUb_3hBtOa" ,"chapters",self.$route.params.chaid,"questions",self.$route.params.qid]
    const pathArray = fullPath.splice(0,i+2)
    if (id){
        pathArray.push(id)
    }
    return pathArray.join('/')
}



