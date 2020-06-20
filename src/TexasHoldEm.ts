/// <reference path="Cards.ts" />

module TexasHoldEm {
    export class RankOfHands {
        private _cardsOnHand: Cards.Card[];
        private _flop: Cards.Card[];
        private _turn: Cards.Card;
        private _river: Cards.Card;

        constructor(public cardsOnHand: Cards.Card[],
            public flop: Cards.Card[],
            public turn: Cards.Card,
            public river: Cards.Card) {
                this._cardsOnHand = cardsOnHand;
                this._flop = flop;
                this._turn = turn;
                this._river = river;
        }

        public getRoyalFlush(): Cards.Card[] | null {
            // Royal Flush - An Ace - High straight of one suit. - ex. 10, J, Q, K, A (spades)
            if (!this.cardsAreOfTheSameSuit(this._cardsOnHand) ||
                !this.cardsAreInGivenRanks(this._cardsOnHand, [CardRank.Ace, CardRank.King, CardRank.Queen, CardRank.Jack, CardRank.Jack, CardRank.Ten])) {
                return null;
            }

            // TODO: getRoyalFlush()

            return null;
        }

        //*************************************************************************************
        // Helper Functions
        //*************************************************************************************
        private cardsAreOfTheSameSuit(cards: Cards.Card[]): boolean {
            var suitOfFirstCard = cards[0].suit;

            return cards.every(function (card: Cards.Card, index: number, cards: Cards.Card[]) {
                return card.suit === suitOfFirstCard;
            });
        }

        private cardsAreInStraightSequence(cards: Cards.Card[]): boolean {
            var cardsInIncreasingRanks = cards.sort(this.compareRanks);

            // TODO: add logic for Aces(high or low)
            return cardsInIncreasingRanks.every(function (card: Cards.Card, index: number, cards: Cards.Card[]) {
                return index === cards.length ? true : card.rank === cards[index + 1].rank + 1;
            });

            return false;
        }

        private cardsAreInGivenRanks(cards: Cards.Card[], ranks: CardRank[]): boolean {
            return cards.every(function (card: Cards.Card, index: number, cards: Cards.Card[]) {
                var match = ranks.indexOf(card.rank);
                if (match > -1) {
                    //ranks[match] = null;
                    delete ranks[match];
                    return true;
                }
            });
        }

        private compareRanks(a: Cards.Card, b: Cards.Card): number{
            if (a.rank === b.rank) {
                return 0;
            }
            else if (a.rank === CardRank.Ace) {
                return 1;
            }
            else if(b.rank === CardRank.Ace) {
                return -1;
            }
            else if (a.rank > b.rank) {
                return 1;
            }
            else if (a.rank < b.rank) {
                return -1;
            }

            return 0;
        }
    }
}

// http://www.texasholdem-poker.com/handrank
// Royal Flush - An Ace - High straight of one suit. - ex. 10, J, Q, K, A (spades)
// Straight Flush - A straight of entirely one suit. - ex. 4, 5, 6, 7, 8 (diamond)
// Four-of-a-Kind (Quads) - Four cards of the same rank. - ex. 4 J, 8(diamond)
// Full House (Full Boat, Boat) - Three-of-a-kind and a pair. ex. Q(diamond), Q(spade), Q(club), A(diamond), A(spade) "Queens over Aces" or "Queens full of Aces".
// Flush - Five cards of the same suit. - ex. 4, 10, A, 2, 5 (diamond)
// Straight (Run) - Five cards of sequential rank. Note that in holdem, Aces can be high or low. - ex. 8(diamond), 9(diamond), 10(spade), J(heart), Q(club)
// An example of a straight where the Ace is low: 4(diamond), A(diamond), 2(spade), 5(spade), 3(diamond)
// Three-of-a-Kind (Trips, Set, Triplets) - Three cards of the same rank. - ex. K(club), K(heart), K(spade), A(spade), 2(diamond)
// Two Pair - Two cards of the same rank and another two cards of the same rank. The example below would be called "Jacks and Twos". - ex. J, J, 2, 2, Q
// One Pair - Two cards of the same rank. - ex. A(spade), 6(diamond), 10(spade), K(club), A(diamond)
// High Card - When you don't have any of the above, your highest card determines your hand. The example below would be "King High" or "High card King". - ex. 2(diamond), 4(spade), 7(spade), 10(diamond), K(club)