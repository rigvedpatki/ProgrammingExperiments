const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const expressValidator = require("express-validator");
const mongojs = require("mongojs");
const db = mongojs("customerapp", ["users"]);
const ObjectId = mongojs.ObjectId;
const app = express();

/* const logger = (req, res, next) => {
    console.log("Logging ... ")
    next();
};

app.use(logger); */
//view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Set static path
app.use(express.static(path.join(__dirname, "public")));

//set express validator
app.use(
  expressValidator({
    errorFormatter: function(param, msg, value) {
      const namespace = param.split("."),
        root = namespace.shift(),
        fromParam = root;

      while (namespace.length) {
        fromParam += "[" + namespace.shift() + "]";
      }
      return {
        param: fromParam,
        msg: msg,
        value: value
      };
    }
  })
);

/* const person = {
  name: "Jeff",
  age: 30
};
const people = [{ name: "Sara", age: 20 }, { name: "John", age: 45 }];
people.push(person); */

app.get("/", (req, res) => {
  //res.json(people);
  //res.send("Hello World");
  db.users.find(function(err, docs) {
    // docs is an array of all the documents in mycollection
    //console.log(docs);
    res.render("index", { title: "Customers", users: docs, errors: null });
  });
});

app.post("/user/add", (req, res) => {
  req.checkBody("firstName", "First Name is required").notEmpty();
  req.checkBody("lastName", "Last Name is required").notEmpty();
  req.checkBody("email", "Email is required").notEmpty();

  const errors = req.validationErrors();
  let newUser = null;
  if (errors) {
    console.log("Error");
    res.render("index", { title: "Customers", users: users, errors: errors });
  } else {
    newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    };
    db.users.insert(newUser, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log("user added");
    });
    console.log("Success");
    res.redirect("/");
  }
  //console.log(newUser);
});

app.delete("/users/delete/:id", (req, res) => {
  db.users.remove({ _id: ObjectId(req.params.id) }, (err, result) => {
    if (err) {
      consle.log(err);
    }
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
