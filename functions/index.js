const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.madeRootOfCourses = functions.database.ref('/users/{uId}/courses/{cid}')
    .onCreate((snapshot, context) => {
        let cid = context.params.cid
        let uid = context.params.uId
        return snapshot.ref.root.child(`quizzes/${cid}/authorId`).set(uid);
    });

exports.addAuthorToClient = functions.database.ref('/clients/{cluid}/quizzes/{quid}')
    .onCreate((snapshot, context) => {
        let quid = context.params.quid
        let authorid = snapshot.ref.root.child(`quizzes/${quid}/authorId`).once('value')
            .then(dataSnapshot => {
                authorid = dataSnapshot.val();
                return snapshot.ref.child(`authorId`).set(authorid)

            })
        console.log(authorid)
    });


exports.addCourseNameToClient = functions.database.ref('/clients/{cluid}/quizzes/{quid}/authorId')
    .onCreate((snapshot, context) => {
        let quid = context.params.quid
        let authorId = snapshot.val()
        let courseName = snapshot.ref.root.child(`users/${authorId}/courses/${quid}/courseName`).once('value')
            .then(dataSnapshot => {
                courseName = dataSnapshot.val();
                return snapshot.ref.parent.child(`courseName`).set(courseName)
            })
        console.log(authorid)
    });



exports.deleteFromRootOfCourses = functions.database.ref('/users/{uId}/courses/{cid}')
    .onDelete((snapshot, context) => {
        let quizId = context.params.cid
        return snapshot.ref.parent.parent.parent.parent.child(`quizzes/${quizId}`).set(null);
    });