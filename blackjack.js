//#region setting global values
let PlayerHand = [];
let DealerHand = [];
const CardType = ["hearts", "spades", "diamonds", "clubs"];
const CardNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

class Cards {
    constructor(CardType, CardNumber, CardValue) {
        this.CardType = CardType;
        this.CardValue = CardValue;
        this.image = `/PictureCards/${CardNumber}_of_${CardType}.png`
    }
}
var deck = function () {
    var tempDeck = [];
    for (let i = 0; i < CardType.length; i++) {
        for (let j = 0; j < CardNumber.length; j++) {
            tempDeck.push(new Cards(CardType[i], CardNumber[j], j > 10 ? 10 : j));
        }
    }
    return tempDeck;
}();
//#endregion


function ShuffleDeck() {
    for (let xxx = 0; xxx < 42; xxx++)
    {
        for (let i = 0; i < deck.length; i++) {
            let j = Math.floor(Math.random() * deck.length);
            let shuffler = deck[i];
            deck[i] = deck[j]
            deck[j] = shuffler;
        }
    }
};

function PHandDeck()
{
    PlayerHand.push(deck.pop());
}
function DHandDeck()
{
    DealerHand.push(deck.pop());
}
function BuildPCards() {
    PlayerHand.forEach(x => {
        let htmlsCard = document.createElement("img");
        htmlsCard.src = x.image;
        htmlsCard.height = 200;
        htmlsCard.width = 150;
        document.getElementById("CardPPlace").appendChild(htmlsCard);
    },this)
}
function BuildDCards() {
    DealerHand.forEach(x => {
        let htmlCard = document.createElement("img");
        htmlCard.src = x.image;
        htmlCard.height = 200;
        htmlCard.width = 150;
        document.getElementById("CardDPlace").appendChild(htmlCard);
    },this)
}


function startGame() {
    ShuffleDeck();
    PHandDeck();
    DHandDeck();
    BuildPCards();
    BuildDCards();

}

function HitMe()
{
    
}

startGame();




