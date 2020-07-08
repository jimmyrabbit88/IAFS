import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-update-panel',
  templateUrl: './update-panel.component.html',
  styleUrls: ['./update-panel.component.scss']
})


export class UpdatePanelComponent implements OnInit {
  scoreElement;
  quarter: string;
  constructor() { }

  ngOnInit(): void {
  }

  public onDetailsUpdated(eventData){
    console.log(eventData);
    

  }

}
