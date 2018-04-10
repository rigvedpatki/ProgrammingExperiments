import { Customer } from "./customer";

export class App {
  constructor() {
    this.heading = "Customer Manager";
    this.customers = this.getCustomersFromStorage();
    this.customerName = "";
    this.customerEmail = "";
    this.customerPhone = "";
    this.editVisible = false;
    this.eCustomer = {
      name: "",
      email: "",
      phone: ""
    };
  }

  addCustomer() {
    if (this.customerName && this.customerEmail && this.customerPhone) {
      this.customers.push(
        new Customer(this.customerName, this.customerEmail, this.customerPhone)
      );

      //store in local storage
      this.storeCustomer(
        this.customerName,
        this.customerEmail,
        this.customerPhone
      );

      // Clear fields
      this.customerName = "";
      this.customerEmail = "";
      this.customerPhone = "";
    }
  }

  storeCustomer(name, email, phone) {
    let customers;

    if (localStorage.getItem("customers") === null) {
      customers = [];
    } else {
      customers = JSON.parse(localStorage.getItem("customers"));
    }

    customers.push({ name: name, email: email, phone: phone });

    localStorage.setItem("customers", JSON.stringify(customers));
  }
  removeCustomer(customer) {
    let index = this.customers.indexOf(customer);

    if (index !== -1) {
      this.customers.splice(index, 1);
    }

    let customers = JSON.parse(localStorage.getItem("customers"));
    customers.splice(index, 1);
    localStorage.setItem("customers", JSON.stringify(customers));
  }
  getCustomersFromStorage() {
    if (localStorage.getItem("customers") === null) {
      return [];
    } else {
      return JSON.parse(localStorage.getItem("customers"));
    }
  }

  editCustomer(customer) {
    this.removeCustomer(customer);
    this.editVisible = true;
    this.eCustomer = {
      name: customer.name,
      email: customer.email,
      phone: customer.phone
    };
  }

  saveCustomer() {
    this.customers.push(new Customer(this.eCustomer.name, this.eCustomer.email, this.eCustomer.phone));
    this.storeCustomer(
      this.eCustomer.name,
      this.eCustomer.email,
      this.eCustomer.phone
    );
    this.eCustomer = {
      name: "",
      email: "",
      phone: ""
    };
    this.editVisible = false;
  }
}
