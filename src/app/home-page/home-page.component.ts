import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let me = this.CreatePerson();

    this.person = this.CreatePerson();

    console.log(`
    Variable me:
    -----------
    First Name: ${me.fName}
    Last Name:  ${me.lName}
    City:       ${me.address.city}
    Country:    ${me.address.country}
    `);
    console.log(`
    Variable Person:
    ----------------
    First Name: ${this.person.fName}
    Last Name:  ${this.person.lName}
    City:       ${this.person.address.city}
    Country:    ${this.person.address.country}
    `);
  }


  // 
  private person = {
    fName: '',
    lName: '',
    address: {
      city: '',
      country: ''
    }
  }


  CreatePerson() {
    let _person_info = {
      fName: 'Rifayet',
      lName: 'Azam',
      address: {
        city: 'Dhaka',
        country: 'Bangladesh'
      }
    }
    return _person_info;
  }

}
