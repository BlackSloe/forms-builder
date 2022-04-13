import { Component, OnInit } from '@angular/core';
import { AccordionMenuItem } from 'src/app/_models/accordion-menu-item';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements OnInit {
  accordion: AccordionMenuItem[] = [];

  items: string[] = ['Form General Styling', 'Field Styling'];
  expandedIndex = 0;

  constructor() {
    this.accordion = [
      {
        title: 'Form General Styling',
        items: [{ fieldName: 'for general styiling'}]
      },
      {
        title: 'Field Styiling',
        items: [{fieldName: 'for field styiling'}]
      }
    ];
  }

  ngOnInit(): void {
  }

}
