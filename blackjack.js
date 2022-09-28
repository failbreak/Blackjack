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
    constructor(CardType, CardNumber, CardValue, CardId) {
        this.CardType = CardType;
        this.CardId = CardType + CardValue;
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
    if(DealerHand.length == 2)
    {
        htmlCard.src = `/PictureCards/blank.png`
    }
    else{
        
        htmlCard.src = card.Image;
    }
    htmlCard.id = card.CardId;
    htmlCard.height = 200;
    htmlCard.width = 150;
    document.getElementById("CardDPlace").appendChild(htmlCard);
}

function EndGameCheck() {
    let message = ""
//#region comment
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
//#endregion

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
    //#region comment
    // else if (Dscore <= 21 && Pscore <= 21 || Pscore < Dscore && Pscore <= 21) {
    //     Stop = true;
    //     message = "you Lose!";

    // }
    //#endregion

    document.getElementById("Msg").innerHTML = message;
    if(Stop)
    document.getElementById(DealerHand[1].CardId).src = DealerHand[1].Image;    
}

function HitMe() {
    if (!Standing && Stop == false) {
        PHandDeck();
        EndGameCheck();
        //#region comment
        // if (!Stop) {
        //     DHandDeck();
        // }
        //#endregion
    }
    //#region comment
    // BuildPCards();
    // BuildDCards();
    //#endregion
}

function StandEndCheck(){
    let message = "";
//#region comment
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
    // else if (Pscore <= 21 && Dscore <= 20) {
    //     Stop = true;
    //     message = "you Win!";
    // }
//#endregion
    if (Pscore == 21 && Dscore < Pscore && Pscore < 22) {
        Stop = true;
        message = "you Win!";
    }
    else if (Pscore <= 21 && Dscore >= 22 || Dscore <= 20 && Pscore == 21) {
        Stop = true;
        message = "you Win!";
    }
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
        document.getElementById(DealerHand[1].CardId).src = DealerHand[1].Image;    
        do
        {
        DHandDeck();
        }while(Dscore < 17)
        if(StartedGame)
        StandEndCheck();
    }
}

function HideCard()
{

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
