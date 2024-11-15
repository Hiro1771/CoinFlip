var money = 100;
var winnings;
var moneyElement = document.getElementById("moneyId");

// Update the money display on page load
moneyUpdate();

function coinflip() {
    var bet = document.getElementById("betId").value.toLowerCase();
    var betAmt = parseFloat(document.getElementById("betAmtId").value);

    if (!["heads", "tails", "h", "t"].includes(bet)) {
        alert("That's not a valid side of the coin.");
        return;
    }

    if (isNaN(betAmt) || betAmt <= 0) {
        alert("Please enter a valid bet amount.");
        return;
    }

    if (betAmt > money) {
        alert("You're too broke to bet that much!");
        return;
    }

    var coinElement = document.getElementById("coinId");
    var coin = Math.random() < 0.5 ? "heads" : "tails";
    coinElement.textContent = coin;

    if ((coin === "heads" && (bet === "heads" || bet === "h")) || 
        (coin === "tails" && (bet === "tails" || bet === "t"))) {
        winnings = betAmt * 1;
        money += winnings;
    } else {
        money -= betAmt;
    }
    moneyUpdate();
}

function reset() {
    money = 100;
    moneyUpdate();
}

function saveGame() {
    var gameSave = {
        money: money
    };
    localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

function loadGame() {
    var savedGame = JSON.parse(localStorage.getItem("gameSave"));
    if (savedGame && typeof savedGame.money !== "undefined") {
        money = savedGame.money;
    }
}

window.onload = function() {
    loadGame();
    moneyUpdate();
};

// Correctly define moneyUpdate function
function moneyUpdate() {
    moneyElement.textContent = money;
}

