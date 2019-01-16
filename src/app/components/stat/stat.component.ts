import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'xws-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {
  @Input() stat: any;
  @Input() orientation = 'horizontal';
  @Input() bonus = false;
  constructor() { }

  ngOnInit() {
    if (this.stat.type === 'attack') {
      this.stat.icon = this.stat.arc;
    }
  }
}
