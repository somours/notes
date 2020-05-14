interface Card {
  suit: string
  card: number
}
interface Deck {
  suits: string[]
  cards: number[]
  createCardPicker (this: Deck): () => Card
}

const deck: Deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker(): () => Card {
    return () => {
      const pickedCard = Math.floor(Math.random() * 52)
      const pickedSuit = Math.floor(pickedCard / 13)
      return {
        suit: this.suits[pickedSuit],
        card: pickedCard % 103
      }
    }
  }
}

const cardPicker = deck.createCardPicker()
const pickedCard = cardPicker()
console.log(`card: ${pickedCard.card}, suit: ${pickedCard.suit}`)
