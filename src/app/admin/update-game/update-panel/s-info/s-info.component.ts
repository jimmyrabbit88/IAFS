import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-s-info',
  templateUrl: './s-info.component.html',
  styleUrls: ['./s-info.component.scss']
})
export class SInfoComponent implements OnInit {
  distance: number;
  player: string;
  playerNum: number;
  isMadeFg: boolean;
  @Output() onSDetailsAdded = new EventEmitter<{tdType?: string, player?: string, playerNum?: number}>();


  constructor() { }

  ngOnInit(): void {
  }

  public addScore(){
    this.onSDetailsAdded.emit({player: this.player, playerNum: this.playerNum})
  }

}
