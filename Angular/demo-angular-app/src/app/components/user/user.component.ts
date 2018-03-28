import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  name: string;
  age: number;
  email: string;
  address: {

  };

  constructor() {
    console.log("[app-user-constructor] ran");
  }

  ngOnInit() {
    console.log("[ngOnIt] ran");
    this.name = "Donald Trump";
    this.age = 79;
    this.address = {
      street : "Baner Road",
      city: "Pune",
      state: 'Maharashtra'

    }
  }
}

interface address {
    street: string;
    city: string;
    state: string;
}

