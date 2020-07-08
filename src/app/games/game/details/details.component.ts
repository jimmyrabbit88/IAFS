import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() gameDetails;
  details
  constructor() { }

  ngOnInit(): void {
    this.details = this.gameDetails.payload.doc.data();
  }

}
