import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  //#region Variables
  public currentYear: number;
  //#endregion Variables 
  // 
  constructor() { }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }

}
