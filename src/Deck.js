/**
 * @module Deck
 */
import Card from './Card.js';

/**
 * Represents a deck of 52 playing cards.
 */
export default class Deck {
  constructor() {
    this.cards = [];
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    for (const suit of suits) {
      for (const rank of ranks) {
        this.cards.push(new Card(suit, rank));
      }
    }
    this.shuffle();
  }

  /**
   * Shuffles the deck.
   */
  shuffle() {
    this.cards.sort(() => Math.random() - 0.5);
  }

  /**
   * Draws a card from the deck.
   * @returns {Card} The drawn card.
   */
  drawCard() {
    return this.cards.pop();
  }
}