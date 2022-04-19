import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-drag-section-item',
  templateUrl: './drag-section-item.component.html',
  styleUrls: ['./drag-section-item.component.css']
})
export class DragSectionItemComponent implements OnInit {
  @Input() item: string;

  constructor() { }

  ngOnInit(): void {
  }

}
