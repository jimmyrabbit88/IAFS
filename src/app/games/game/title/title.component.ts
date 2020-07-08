import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  @Input() gameTitle: any;
  game;
  constructor() { }

  ngOnInit(): void {
    this.game = this.gameTitle.payload.doc.data();
  }

}
