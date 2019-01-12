import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SearchPipe } from '../../search.pipe';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnChanges {
  search;
  listview = false;
  came = false;
  @Input() contact;
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      console.log('------', this.contact);
    }, 2000);
  }
  ngOnChanges(e){
    console.log(e, 'from cardcomponent');
    if ( e.contact.currentValue !== undefined) {
      this.came = true;
    }
  }
  edit() {
    alert('Edit initiated');
  }
  delete() {
    if (confirm('Are you sure')) {
      alert('contact deleted');
    } else {
      alert('contact not deleted');
    }
  }
  list(condition) {
    this.listview = condition;
  }
}
