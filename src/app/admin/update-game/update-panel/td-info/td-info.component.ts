import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-td-info',
  templateUrl: './td-info.component.html',
  styleUrls: ['./td-info.component.scss']
})
export class TdInfoComponent implements OnInit {
  distance: number;
  tdType: string;
  player: string;
  playerNum: number;
  passer: string;
  @Output() onTdDetailsAdded = new EventEmitter<{tdType?: string, player?: string, playerNum?: number, passer?: string, distance?: number}>();

  constructor() { }

  ngOnInit(): void {
  }

  public addScore(){
    console.log('aa')
    this.onTdDetailsAdded.emit({tdType: this.tdType, player: this.player, playerNum: this.playerNum, passer: this.passer, distance: this.distance })
  }

}
