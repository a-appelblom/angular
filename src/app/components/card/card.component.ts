import {
  Component,
  OnInit,
  Input,
  OnChanges,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnChanges {
  constructor() {}
  @Input() card: any;
  @Input() selected: boolean = false;
  @Input() matched: boolean = false;
  @Input() resetCards: (() => void) | undefined;
  @Output() finishedLock: EventEmitter<boolean> = new EventEmitter();
  locked: boolean = false;
  joker = 'https://deckofcardsapi.com/static/img/X1.png';
  ngOnInit(): void {}
  ngOnChanges(): void {
    console.log(this.selected);
    if (this.selected && this.matched) {
      console.log('lockdown');
      this.locked = true;
      this.finishedLock.emit(true);
      // this.resetCards && this.resetCards();
    }
  }
}
