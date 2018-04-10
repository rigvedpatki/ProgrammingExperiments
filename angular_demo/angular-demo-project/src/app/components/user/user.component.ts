import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  name: string;
  age: number;
  email: string;
  address: Address;
  hobbies: string[];
  hello: any;
  posts: Posts[];
  isEdit: boolean;

  constructor(private dataService: DataService) {
    console.log("User Component Constructor ran ...");
  }

  ngOnInit() {
    console.log("User Component ngOnInit ran ...");
    this.name = "John Doe";
    this.email = "john@doe.com";
    this.age = 30;
    this.address = {
      street: "Pallod Farms 3, Baner Road",
      city: "Pune",
      state: "MH"
    };
    this.hobbies = ["write code", "watch movies", "play games"];
    this.hello = 9.78; // use any type

    this.dataService.getPosts().subscribe(posts => {
      // console.log(posts);
      this.posts = posts;
    });
    this.isEdit = false;
  }

  onClick() {
    console.log("Clicked");
    this.name = "Rigved Patki";
    this.hobbies.push("new hobby");
  }

  addHobby(hobby) {
    console.log(hobby);
    this.hobbies.unshift(hobby);

    return false;
  }

  deleteHobby(hobby) {
    let index = this.hobbies.indexOf(hobby);
    this.hobbies.splice(index, 1);
  }

  toggleEdit(){
    this.isEdit = ! this.isEdit
  }
}

interface Address {
  street: string;
  city: string;
  state: string;
}
interface Posts {
  id: number;
  title: string;
  body: string;
  userId: number;
}
