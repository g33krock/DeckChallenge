document.addEventListener("DOMContentLoaded", () => {
  let deck = [];
  let playerHand = [];
  let amountDealt = 7;
  let deckList = document.getElementById("deck-list");
  let handList = document.getElementById("hand-list");
  const cardSuits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  const cardValues = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  let drawPile = deck.length;
  let i = 0;
  let j = 0;

  updateDeckList = () => {
    let ul = document.createElement("ul");

    for (let card of deck) {
      let li = document.createElement("li");
      li.innerText = card.value + " of " + card.suit;
      ul.appendChild(li);
    }

    deckList.innerHTML = "";
    deckList.appendChild(ul);
  };

  updateHandList = () => {
    handList.innerHTML = "";
  
    for (let card of playerHand) {
      console.log(card);
      let div = document.createElement("div");
      div.classList.add("card");
      div.classList.add(card.suit.toLowerCase());
  
      let front = document.createElement("div");
      front.classList.add("front");
      front.innerText = card.value + " of " + card.suit;
  
      let back = document.createElement("div");
      back.classList.add("back");
  
      div.appendChild(front);
      div.appendChild(back);
      handList.appendChild(div);
    }
  };
  

  generateDeck = () => {
    if (deck.length < 1) {
      while (i < cardSuits.length) {
        while (j < cardValues.length) {
          card = { suit: cardSuits[i], value: cardValues[j] };
          deck.push(card);
          j++;
        }
        j = 0;
        i++;
      }
    }
    drawPile = deck.length;
    i = 0;
    updateDeckList();
    updateHandList();
  };

  shuffleDeck = () => {
    let currentIndex = deck.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [deck[currentIndex], deck[randomIndex]] = [
        deck[randomIndex],
        deck[currentIndex],
      ];
    }
    updateDeckList();
    updateHandList();
    return deck;
  };

  dealHand = () => {
    if (drawPile < 1) {
      console.log("All cards have been dealt");
    } else if (amountDealt >= drawPile) {
      while (deck.length > 0) {
        playerHand.push(deck.shift());
      }
    } else {
      for (var q = 0; q < amountDealt; q++) {
        playerHand.push(deck.shift());
      }
    }
    updateDeckList();
    updateHandList();
    drawPile = deck.length;
  };

  drawAmount = () => {
    var x = document.getElementById("inputNumber").value;
    amountDealt = x;
  };

  generateDeck();
  shuffleDeck();
  dealHand();

  console.log(deck, drawPile, playerHand, amountDealt);
});
