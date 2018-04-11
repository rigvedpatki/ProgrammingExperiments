const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send("Hello From firebase cloud functions ");
});

exports.insertIntoRealtimeDB = functions.https.onRequest((req, res) => {
  const text = req.query.text;
  admin
    .database()
    .ref("/test")
    .push({
      text: text
    })
    .then(snapshot => {
      res.redirect(303, snapshot.ref);
    })
    .catch(error => {
      console.log("Error inserting data at '/test' " + error);
    });
});

exports.convertIntoUpperCase = functions.database
  .ref("/test/{pushId}/text")
  .onCreate((snapshot, context) => {
    const text = snapshot.val();
    console.log("Uppercasing", context.params.pushId, text);
    const upperCaseText = text.toUpperCase();
    return snapshot.ref.parent.child("upperCaseText").set(upperCaseText);
  });
