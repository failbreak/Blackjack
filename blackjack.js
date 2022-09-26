//#region setting global values
let PlayerHand = [];
let DealerHand = [];
let Pscore = 0;
let Dscore = 0;
let StartedGame = false;
let Standing = false;
const CardType = ["hearts", "spades", "diamonds", "clubs"];
const CardNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

class Cards {
    constructor(CardType, CardNumber, CardValue) {
        this.CardType = CardType;
        this.CardValue = CardValue;
        this.Image = `/PictureCards/${CardNumber}_of_${CardType}.png`
    }
}

let x = new Cards(1, 1, 1)
console.log(x.Image)

var deck = function () {
    var tempDeck = [];
    for (let i = 0; i < CardType.length; i++) {
        for (let j = 0; j < CardNumber.length; j++) {
            tempDeck.push(new Cards(CardType[i], CardNumber[j], j > 9 ? 10 : (j + 1)));
        }
    }
    return tempDeck;
}();
//#endregion


function ShuffleDeck() {
    for (let xxx = 0; xxx < 42; xxx++) {
        for (let i = 0; i < deck.length; i++) {
            let j = Math.floor(Math.random() * deck.length);
            let shuffler = deck[i];
            deck[i] = deck[j]
            deck[j] = shuffler;
        }
    }
};


function PHandDeck() {
    PlayerHand.push(deck.pop());
    Pscore += PlayerHand[PlayerHand.length - 1].CardValue;
    BuildPCards(PlayerHand[PlayerHand.length - 1]);
}

function DHandDeck() {
    DealerHand.push(deck.pop());
    Dscore += DealerHand[DealerHand.length - 1].CardValue;
    BuildDCards(DealerHand[DealerHand.length - 1]);
}

function BuildPCards(card) {

    let htmlCard = document.createElement("img");
    htmlCard.src = card.Image;
    htmlCard.height = 200;
    htmlCard.width = 150;
    document.getElementById("CardPPlace").appendChild(htmlCard);

}
function BuildDCards(card) {

    let htmlCard = document.createElement("img");
    htmlCard.src = card.Image;
    htmlCard.height = 200;
    htmlCard.width = 150;
    document.getElementById("CardDPlace").appendChild(htmlCard);

}

function HitMe() {
    if (!Standing) {
        
        PHandDeck();
        DHandDeck();
        EndGameCheck();
    }
    // BuildPCards();
    // BuildDCards();
}

function Stand() {
    DHandDeck();
    let message = ""
    if (Pscore == 21 && Dscore > Pscore) {
        message = "You win!"
    }
    else if (Pscore < 21 && Dscore < Pscore) {
        message = "You win!"
    }
    else if (Pscore < 21 && Dscore > Pscore) {
        message = "You Lose!"
    }
    else if (Dscore == 21 && Dscore < Pscore) {
        message = "You Lose!"
    }
    else if (Dscore > 21 && Pscore <= 21) {
        message = "You win!"
    }
    else if (Dscore == Pscore) {
        message = "Tie!";
    }
    // else {
    //     message = Pscore + " : " + Dscore;
    // }
    Standing = true;
    document.getElementById("Msg").innerHTML = message;
    
}


function EndGameCheck()
{
    let message = ""
    if (Pscore == 21 && Dscore > Pscore) {
        message = "You win!"
    }
    else if (Pscore < 21 && Dscore < Pscore) {
        message = "You win!"
    }
    else if (Pscore < 21 && Dscore > Pscore) {
        message = "You Lose!"
    }
    else if (Dscore == 21 && Dscore < Pscore) {
        message = "You Lose!"
    }
    else if (Dscore > 21 && Pscore <= 21) {
        message = "You win!"
    }
    else if (Dscore == Pscore) {
        message = "Tie!";
    }
}

function startGame() {
    if (!Standing)
    {
        if(!StartedGame)
        {
            StartedGame = true;
            ShuffleDeck();
            DHandDeck();
            PHandDeck();
        }
    }
    else{

        window.location.reload();
    }
}



