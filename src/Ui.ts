/// <reference path="Cards.ts" />

const card_height = 98;
const card_width = 73;
let initial_dealer_card_x = 275;
let initial_dealer_card_y = 40;
let y_margin = 50;
let text_and_card_margin = 10;

$(document).ready(function () {
    const canvas: HTMLCanvasElement = document.querySelector('#simpleCanvas') ?? new HTMLCanvasElement();
    canvas?.setAttribute("width", "800px");
    canvas?.setAttribute("height", "450px");

    if(canvas === null) {
        return;
    }

    const context = canvas.getContext('2d') ?? new CanvasRenderingContext2D();
    resetCanvas();

    const cardsImage = new Image();
    cardsImage.src = "img/cards.png"; // from http://commondatastorage.googleapis.com/codeskulptor-assets/cards.jfitz.png
    cardsImage.onload = function () {
        let deck = new Decks.Deck(1);

        $("#btnRefresh").click(function () {
            resetButtons();
            resetCanvas();
            deck.shuffle();
            dealCards(context, deck.getCardsInDeck(), Number($("#numberOfPlayers").val()));
            $("#btnFlop").removeAttr("disabled");
        });

        $("#btnFlop").click(function () {
            displayFlop(context, deck.getCardsInDeck());
            $("#btnFlop").attr("disabled", "disabled");
            $("#btnTurn").removeAttr("disabled");
        });

        $("#btnTurn").click(function () {
            displayTurn(context, deck.getCardsInDeck());
            $("#btnTurn").attr("disabled", "disabled");
            $("#btnRiver").removeAttr("disabled");
        });

        $("#btnRiver").click(function () {
            displayRiver(context, deck.getCardsInDeck());
            $("#btnRiver").attr("disabled", "disabled");
        });
    }

    function resetButtons() {
        $("#btnFlop, #btnTurn, #btnRiver").attr("disabled", "disabled");
    }

    function resetCanvas() {
        context.clearRect(0, 0, 800, 450);

        context.fillStyle = "#477148"; //'rgb(0, 255, 0)';
        context.fillRect(0, 0, 800, 450);
    }

    function dealCards(context: CanvasRenderingContext2D,
                        cardsInDeck: Cards.Card[],
                        numberOfPlayers: number) {
        const card_width = 73;
        const card_height = 98;
        let initialX = 10;
        let initialY = 40;

        for (let i = 0; i < numberOfPlayers; i++) {
            let x = initialX + card_width * 2 * (i <= 4 ? i : i - 5);
            let y = initialY + (i <= 4 ? 0 : card_height + y_margin);

            displayTitle(context, i, x, y);
            displayTwoCards(context, cardsInDeck, x, y + 20);
        }
    }

    function displayTitle(context: CanvasRenderingContext2D,
                            playerNumber: number,
                            x: number,
                            y: number) {
        context.font = "20pt Calibri";
        context.lineWidth = 2;
        context.strokeStyle = "black";
        context.strokeText("Player " + (playerNumber + 1).toString(), x, y);
    }

    function displayTwoCards(context: CanvasRenderingContext2D,
                                cardsInDeck: Cards.Card[],
                                x: number,
                                y: number) {
        displayCards(context, cardsInDeck, 2, x, y);
    }

    function displayFlop(context: CanvasRenderingContext2D, cardsInDeck: Cards.Card[]) {
        let initialX = initial_dealer_card_x;
        let initialY = initial_dealer_card_y + 2 * (card_height + y_margin);

        displayCards(context, cardsInDeck, 3, initialX, initialY + text_and_card_margin);
    }

    function displayTurn(context: CanvasRenderingContext2D, cardsInDeck: Cards.Card[]) {
        let initialX = initial_dealer_card_x + 3 * card_width / 3;
        let initialY = initial_dealer_card_y + 2 * (card_height + y_margin);

        displayCards(context, cardsInDeck, 1, initialX, initialY + text_and_card_margin);
    }

    function displayRiver(context: CanvasRenderingContext2D, cardsInDeck: Cards.Card[]) {
        let initialX = initial_dealer_card_x + 4 * card_width / 3;
        let initialY = initial_dealer_card_y + 2 * (card_height + y_margin);

        displayCards(context, cardsInDeck, 1, initialX, initialY + text_and_card_margin);
    }

    function displayCards(context: CanvasRenderingContext2D,
                          cards: Cards.Card[],
                            numberOfCardsToDisplay: number,
                            x: number,
                            y: number) {
        for (let i = 0; i < numberOfCardsToDisplay; i++) {
            let currentCard = cards.pop();
            if(currentCard !== undefined) {
                currentCard?.getCardImageWithPosition(context,
                    cardsImage,
                    x + card_width / 3 * i,
                    y);
            }
        }
    }
});