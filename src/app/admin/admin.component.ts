import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  isAddGame: boolean = false;
  isUpdateGame: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  public addGame(){
    this.resetOptions();
    this.isAddGame = true;
  }

  public updateGame(){
    this.resetOptions();
    this.isUpdateGame = true;
  }

  public resetOptions(){
    this.isAddGame = false;
    this.isUpdateGame = false;
  }

}
