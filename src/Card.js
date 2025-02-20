/**
 * @module Card
 */

/**
 * Represents a playing card.
 */
export default class Card {
    /**
     * Creates a new card.
     * @param {string} suit - The suit of the card.
     * @param {string} rank - The rank of the card.
     */
    constructor(suit, rank) {
      this.suit = suit;
      this.rank = rank;
    }

    /**
     * Return the value of the card.
     * @returns {number} The value of the card.
     */
    get rankValue() {
      switch (this.rank) {
        case 'A':
          return 14;
        case 'K':
          return 13;
        case 'Q':
          return 12;
        case 'J':
          return 11;
        default:
          return parseInt(this.rank);
      }
    }

    /**
     * Return the value of the suit.
     * @returns {number} The value of the suit. 
     */
    get suitValue() {
      switch (this.suit) {
        case 'Spades':
          return 4;
        case 'Hearts':
          return 3;
        case 'Diamonds':
          return 2;
        case 'Clubs':
          return 1;
      }
    }
  
    /**
     * Returns a string representation of the card.
     * @returns {string} The card as a string.
     */
    toString() {
      return `${this.rank} of ${this.suit}`;
    }
  }