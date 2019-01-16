import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Chargeable, Remaining } from '../../types';

@Component({
  selector: 'xws-token-display',
  templateUrl: './token-display.component.html',
  styleUrls: ['./token-display.component.scss']
})
export class TokenDisplayComponent implements OnInit {
  @Input() name?: string;
  @Input() data: Chargeable & Remaining = {
    value: 0,
    remaining: 0,
    recovers: 0,
  };
  @Output() change = new EventEmitter();

  spent: number[] = [];
  available: number[] = [];
  recovers: number[] = [];

  constructor() { }

  makeTokens() {
    this.available = [ this.data.remaining ];
    this.spent = [ this.data.value - this.data.remaining ];
    this.change.emit(this.data);
  }

  spend() {
    this.data.remaining -= 1;
    this.makeTokens();
  }

  recover() {
    this.data.remaining += 1;
    this.makeTokens();
  }

  recoverRecurring() {
    this.data.remaining += this.data.recovers;
    if (this.data.remaining > this.data.value) {
      this.data.remaining = this.data.value;
    }
    this.makeTokens();
  }

  ngOnInit() {
    this.makeTokens();
  }
}
