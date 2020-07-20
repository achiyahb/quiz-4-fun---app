const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.madeRootOfCourses = functions.database.ref('/users/{uId}/courses/{cid}')
    .onCreate((snapshot, context) => {
        let cid = context.params.cid
        let uid = context.params.uId
        const quiz = {}
        quiz.quizName = snapshot.child('courseName').val()
        quiz.quizGoal = snapshot.child('goal').val()
        quiz.quizDetails = snapshot.child('courseDetails').val()
        quiz.authorId = uid
        quiz.authorName = snapshot.child('founderName').val()
        quiz.authorDetails = snapshot.child('founderDetails').val()


        return snapshot.ref.root.child(`quizzes/${cid}/quizDetails`).set(quiz);
    });


// exports.addAuthorToClient = functions.database.ref('/clients/{cluid}/quizzes/{quid}')
//     .onCreate((snapshot, context) => {
//         let quid = context.params.quid
//         let authorid = snapshot.ref.root.child(`quizzes/${quid}/authorId`).once('value')
//             .then(dataSnapshot => {
//                 authorid = dataSnapshot.val();
//                 return snapshot.ref.child(`authorId`).set(authorid)
//
//             })
//         console.log(authorid)
//     });

exports.addCourseNameToClient = functions.database.ref('/clients/{cluid}/quizzes/{quid}')
    .onCreate((snapshot, context) => {
        let quid = context.params.quid
        let authorid = snapshot.ref.root.child(`quizzes/${quid}/authorId`).once('value')
            .then(dataSnapshot => {
                authorid = dataSnapshot.val();
                let courseName = snapshot.ref.root.child(`users/${authorid}/courses/${quid}/courseName`).once('value')
                    .then(dataSnapshot => {
                        courseName = dataSnapshot.val();
                        return snapshot.ref.child(`courseName`).set(courseName)
                    })
            })
        console.log(authorid)
    });

// exports.addCourseNameToClient = functions.database.ref('/clients/{cluid}/quizzes/{quid}/authorId')
//     .onCreate((snapshot, context) => {
//         let quid = context.params.quid
//         let authorId = snapshot.val()
//         let courseName = snapshot.ref.root.child(`users/${authorId}/courses/${quid}/courseName`).once('value')
//             .then(dataSnapshot => {
//                 courseName = dataSnapshot.val();
//                 return snapshot.ref.parent.child(`courseName`).set(courseName)
//             })
//         console.log(authorid)
//     });



exports.deleteFromRootOfCourses = functions.database.ref('/users/{uId}/courses/{cid}')
    .onDelete((snapshot, context) => {
        let quizId = context.params.cid
        return snapshot.ref.parent.parent.parent.parent.child(`quizzes/${quizId}`).set(null);
    });