import $ from "jquery";

const elem = document.querySelector(".datepicker");
const instance = M.Datepicker.init(elem);

const url = "https://jsonplaceholder.typicode.com/users";

$(document).ready(() => {
  $.getJSON(url, data => {
    $("#tablePrint").html(
      "<table><th><td> Id </td><td> Name </td><td> Username </td>  <td>Email</td> <td> Phone Number<td></th></table>"
    );

    $.each(data, (index, element) => {
      console.log(element)
      $("#tablePrint table").append("<tr><td></td><td>" + element.id + "</td><td>" + element.name + "</td><td>" + element.username + "</td><td>" + element.email + "</td><td>" + element.phone + "</td></tr>");
    });
  });
});

document.getElementById("display").onclick = function () {
  console.log("button clicked");
  let genderValue;
  if (document.getElementById("male").checked) {
    genderValue = document.getElementById("male").value;
  } else if (document.getElementById("female").checked) {
    genderValue = document.getElementById("female").value;
  }

  let details = {
    fname: document.getElementById("fname").value,
    lname: document.getElementById("lname").value,
    mobile: document.getElementById("mobile").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    gender: genderValue,
    bdate: document.getElementById("date").value
  };

  const check_name = /^[A-Za-z0-9 ]{3,20}$/;
  const check_mobile = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
  const check_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const check_password = /^[A-Za-z0-9!@#$%^&*()_]{8,20}$/;

  const errors = [];

  if (!check_name.test(details.fname)) {
    errors[errors.length] = "enter a vaild first name";
  }
  if (!check_name.test(details.lname)) {
    errors[errors.length] = "enter a vaild last name";
  }
  if (!check_mobile.test(details.mobile)) {
    errors[errors.length] = "enter a vaild mobile number";
  }
  if (!check_email.test(details.email)) {
    errors[errors.length] = "enter a vaild email";
  }
  if (!check_password.test(details.password)) {
    errors[errors.length] = "enter a vaild password";
  }

  if (errors.length <= 0) {
    alert("Congratulations your account is created " + JSON.stringify(details,null,2));
  } else {
    alert("Error : \n " + errors.toString());
  }


};