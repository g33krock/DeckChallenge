document.addEventListener("DOMContentLoaded", () => {
  let deck = [];
  let playerHand = [];
  let amountDealt = 0;
  let deckVisual = document.getElementById("deck-visual");
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

  updateDeckVisual = () => {
    let scaleFactor = 1 + (deck.length / 52) * 0.2;
    deckVisual.style.transform = `scale(${scaleFactor})`;
  };

  updateHandList = () => {
    handList.innerHTML = "";
  
    for (let card of playerHand) {
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
      for (let i = 0; i < cardSuits.length; i++) {
        for (let j = 0; j < cardValues.length; j++) {
          let card = { suit: cardSuits[i], value: cardValues[j] };
          deck.push(card);
        }
      }
    }
    playerHand = [];
    drawPile = deck.length;
    updateDeckVisual();
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
    updateDeckVisual();
    updateHandList();
    return deck;
  };

dealHand = () => {
  if (drawPile < 1) {
    console.log("All cards have been dealt");
  } else if (amountDealt >= drawPile) {
    while (deck.length > 0) {
      let card = deck.shift();
      let cardDiv = createCardDiv(card);
      setTimeout(() => {
        handList.appendChild(cardDiv);
        cardDiv.classList.add("card-deal");
        setTimeout(() => cardDiv.classList.remove("card-deal"), 500);
      }, 0);
      playerHand.push(card);
    }
  } else {
    for (var q = 0; q < amountDealt; q++) {
      let card = deck.shift();
      let cardDiv = createCardDiv(card);
      setTimeout(() => {
        handList.appendChild(cardDiv);
        cardDiv.classList.add("card-deal");
        setTimeout(() => cardDiv.classList.remove("card-deal"), 500);
      }, 500 * q);
      playerHand.push(card);
    }
  }
  updateDeckVisual();
  drawPile = deck.length;
};
  
  createCardDiv = (card) => {
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
  
    return div;
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
