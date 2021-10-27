import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  first = { code: '', value: '' };
  second = { code: '', value: '' };
  cards: any;
  matched = false;
  both = 1;

  constructor(private http: HttpClient) {}

  getColor(card: any) {
    if (card.suit === 'HEARTS' || card.suit === 'DIAMONDS') return 'red';
    return 'black';
  }

  setCards(card: any): void {
    if (!this.first.code) this.first = card;
    else if (!this.second.code && card.code !== this.first.code)
      this.second = card;
    else if (
      this.first.value === this.second.value &&
      this.getColor(this.first) === this.getColor(this.second)
    ) {
      this.matched = true;
      console.log(this.getSelected(card), card, this.first, this.second);
    } else {
      this.first = { code: '', value: '' };
      this.second = { code: '', value: '' };
    }
  }

  getSelected(card: any) {
    if (this.first.code === card.code || this.second.code === card.code)
      return true;
    return false;
  }

  resetCards() {
    console.log('reset');
    if (this.both === 1) this.both++;
    else {
      this.first = { code: '', value: '' };
      this.second = { code: '', value: '' };
      this.both = 1;
      this.matched = false;
      this.setCards({});
      console.log(this.first, this.second, this.matched);
    }
  }

  ngOnInit(): void {
    this.http
      .get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .subscribe((deck: any) => {
        this.http
          .get(
            `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=52`
          )
          .subscribe((cards: any) => {
            this.cards = cards.cards;
          });
      });
  }
}
