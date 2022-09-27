//#region setting global values
let PlayerHand = [];
let DealerHand = [];
let Pscore = 0;
let Dscore = 0;
let StartedGame = false;
let Standing = true;
let Stop = true;
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

function EndGameCheck() {
    let message = ""
    // if (Dscore == 21 && Dscore < Pscore) {
    //     message = "You Lose!"
    //     Stop = true;
    // }
    // else if (Pscore > 21)
    // {
    //     message = "you Lose!"
    //     Stop = true;
    // }
    // else if (Dscore > 21)
    // {
    //     message = "you Win!"

    // }


    // if (Pscore == 21 && Dscore < Pscore || Pscore == 21 && Pscore < Dscore) {
    //     Stop = true;
    //     message = "you Win!";
    // }
    // else if (Pscore <= 21 && Dscore >= 22 || Dscore <= 20 && Pscore == 21) {
    //     Stop = true;
    //     message = "you Win!";
    // }
    // else if (Pscore <= 21 && Dscore <= 20 || Pscore > Dscore && Dscore <= 21) {
    //     Stop = true;
    //     message = "you Win!";
    // }
    if (Dscore == 21 && Pscore < Dscore || Dscore == 21 && Dscore < Pscore) {
        Stop = true;
        message = "you Lose!";

    }
    else if (Dscore <= 21 && Pscore >= 22 || Pscore <= 20 && Dscore == 21) {
        Stop = true;
        message = "you Lose!";

    }
    else if (Pscore > 21) {
        Stop = true;
        message = "you Lose!";
    }
    else if (Dscore > 21)
    {
        Stop = true;
        message = "you Win!"
    }
    // else if (Dscore <= 21 && Pscore <= 21 || Pscore < Dscore && Pscore <= 21) {
    //     Stop = true;
    //     message = "you Lose!";

    // }
    document.getElementById("Msg").innerHTML = message;

}

function HitMe() {
    if (!Standing && Stop == false) {

        PHandDeck();
        EndGameCheck();
        // if (!Stop) {
        //     DHandDeck();
        // }
    }
    // BuildPCards();
    // BuildDCards();
}

function StandEndCheck(){
    let message = ""
    // if (Pscore == 21 && Dscore > Pscore) {
    //     message = "You win!"
    // }
    // else if (Pscore < 21 && Dscore < Pscore) {
    //     message = "You win!"
    // }
    // else if (Pscore < 21 && Dscore > Pscore) {
    //     message = "You Lose!"
    // }
    // else if (Dscore == 21 && Dscore < Pscore) {
    //     message = "You Lose!"
    // }
    // else if (Dscore > 21 && Pscore <= 21) {
    //     message = "You win!"
    // }
    // else if (Dscore == Pscore) {
    //     message = "Tie!";
    // }
    // else {
    //     message = Pscore + " : " + Dscore;
    // }
    if (Pscore == 21 && Dscore < Pscore && Pscore < 22) {
        Stop = true;
        message = "you Win!";
    }
    else if (Pscore <= 21 && Dscore >= 22 || Dscore <= 20 && Pscore == 21) {
        Stop = true;
        message = "you Win!";
    }
    // else if (Pscore <= 21 && Dscore <= 20) {
    //     Stop = true;
    //     message = "you Win!";
    // }
    else if (Pscore > Dscore && Dscore <= 21) {
        Stop = true;
        message = "you Win!";
    }
    else if (Dscore == 21 && Pscore < Dscore && Dscore < 22) {
        Stop = true;
        message = "you Lose!";
    }
    else if (Dscore <= 21 && Pscore >= 22 || Pscore <= 20 && Dscore == 21) {
        Stop = true;
        message = "you Lose!";

    }
    else if (Dscore <= 21 && Pscore <= 21 || Pscore < Dscore && Pscore <= 21) {
        Stop = true;
        message = "you Lose!";

    }

    Standing = true;
    document.getElementById("Msg").innerHTML = message;

}

function Stand() {
    if(!Stop)
        {

            DHandDeck();
        }
        if(StartedGame)
        StandEndCheck();
}




function startGame() {
    if (Standing || Stop) {
        if (!StartedGame) {
            StartedGame = true;
            Stop = false;
            Standing = false;
            ShuffleDeck();
            DHandDeck();
            DHandDeck();
            PHandDeck();
            PHandDeck();
        }
        else
            window.location.reload();
    }
}
