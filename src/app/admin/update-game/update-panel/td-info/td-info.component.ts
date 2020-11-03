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
  ptAfter: number;
  ptaPlayer: string;
  ptaPlayerNum: number;
  @Output() onTdDetailsAdded = new EventEmitter<{tdType?: string, player?: string, playerNum?: number, passer?: string, distance?: number, ptAfter: number, ptaPlayer: string, ptaPlayerNum: number}>();

  constructor() { }

  ngOnInit(): void {
  }

  public addScore(){
    this.onTdDetailsAdded.emit({tdType: this.tdType, player: this.player, playerNum: this.playerNum, passer: this.passer, distance: this.distance, ptAfter: this.ptAfter, ptaPlayer: this.ptaPlayer, ptaPlayerNum: this.ptaPlayerNum })
  }

}
