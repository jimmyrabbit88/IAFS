import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fg-info',
  templateUrl: './fg-info.component.html',
  styleUrls: ['./fg-info.component.scss']
})
export class FgInfoComponent implements OnInit {
  distance: number;
  player: string;
  playerNum: number;
  isMadeFg: boolean;
  @Output() onTdDetailsAdded = new EventEmitter<{tdType?: string, player?: string, playerNum?: number, passer?: string, distance?: number, isMadeFg?: boolean}>();


  constructor() { }

  ngOnInit(): void {
  }

  public addScore(){
    console.log('aa')
    this.onTdDetailsAdded.emit({player: this.player, playerNum: this.playerNum, distance: this.distance, isMadeFg: this.isMadeFg })
  }

}
