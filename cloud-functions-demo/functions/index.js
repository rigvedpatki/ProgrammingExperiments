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

exports.createUser = functions.https.onRequest((req, res) => {
  if (req.method != "POST") {
    return res.status(400).send("Invalid request");
  } else {
    if (req.body.user) {
      const user = req.body.user;

      const db = admin.firestore();

      db
        .collection("user")
        .add({
          name: user.name,
          email: user.email,
          company: user.companyName,
          consultant: user.consultantName,
          type: user.type
        })
        .then(docRef => {
          return res
            .status(200)
            .send("Document \n" + JSON.stringify(docRef) + " \nhas been added");
        })
        .catch(error => {
          return res.status(400).send("Error in creating the document");
        });
    } else {
      return res.status(400).send("Invalid post parameter, shoud be user");
    }
  }
});

exports.createCompany = functions.firestore
  .document("user/{userId}")
  .onCreate((snap, context) => {
    const user = snap.data();
    console.log(user);
    let name;
    if (user.type == "company") {
      name = user.company;
    } else if (user.type == "consultant") {
      name = user.consultant;
    }
    const db = admin.firestore();
    const docRef = db.collection(user.type).doc(name);
    const userRef = db.collection("user").doc(context.params.userId);
    return db
      .collection(user.type)
      .doc(name)
      .get()
      .then(doc => {
        if (doc.exists) {
          db
            .runTransaction(transaction => {
              return transaction.get(docRef).then(doc => {
                if (!doc.data().employees) {
                  transaction.set({
                    employees: [userRef],
                    name: name
                  });
                } else {
                  const employees = doc.data().employees;
                  employees.push(userRef);
                  transaction.update(docRef, {
                    employees: employees,
                    name: name
                  });
                }
              });
            })
            .then(() => {
              console.log("Transaction sucessfully created");
            });
        } else {
          db
            .collection(user.type)
            .doc(name)
            .set({ name: name, employees: [userRef] })
            .then(() => {
              console.log(user.type + " " + name + "successfully created");
            });
        }
      })
      .catch(error => {
        console.log("Error in creating the " + user.type + ": " + error);
      });
  });

exports.deleteUser = functions.https.onRequest((req, res) => {
  const userId = req.query.userId;
  const db = admin.firestore();
  db
    .collection("user")
    .doc(userId)
    .get()
    .then(doc => {
      if (doc.exists) {
        db
          .collection("user")
          .doc(userId)
          .delete()
          .then(() => {
            return res
              .status(200)
              .send("user with " + userId + "has been deleted");
          });
      } else {
        return res.status(200).send("user with " + userId + "does not exist");
      }
    });
});

exports.deleteUserForm = functions.firestore
  .document("user/{userId}")
  .onDelete((snap, context) => {
    const db = admin.firestore();
    const user = snap.data();
    let name;
    const userId = context.params.userId;
    const userRef = db.collection("user").doc(userId);
    if (user.type == "company") {
      name = user.company;
    } else if (user.type == "consultant") {
      name = user.consultant;
    }
    const docRef = db.collection(user.type).doc(name);
    return userRef
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log("Delete the user with " + userId + "first");
        } else {
          console.log("user with " + userId + "deleted from users collection");
          db
            .runTransaction(transaction => {
              return transaction.get(docRef).then(doc => {
                if (doc.data().employees) {
                  let employees = doc.data().employees;
                  const employeeIndex = employees.indexOf(userRef);
                  employees.splice(employeeIndex, 1);
                  transaction.update(docRef, {
                    employees: employees,
                    name: name
                  });
                } else {
                  console.log(
                    "No employees exist for this " + user.type + ", " + name
                  );
                }
              });
            })
            .then(() => {
              console.log("Transaction sucessfully created");
            });
        }
      })
      .catch(error => {
        console.log("Error: " + error);
      });
  });
