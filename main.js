
var clicks = 0;
var ppClick = 1;
var ppSecond = 0;

var spiders = 0;
var bats = 0;
var ghosts = 0;

const spiderCost = 100;
const batCost = 1000;
const ghostCost = 10000;

var imgButtonActive = true;
var spiderButtonActive = true;
var batButtonActive = true;
var ghostButtonActive = true;

// Tapahtumakäsittelijät

// Tapahtumakäsittelijä ja toiminnot kun kuvaa klikataan
var clickBtn = document.getElementById("clickBtn");
clickBtn.addEventListener("click", function() {
    shakeImg();
    increasePerClick();
})

// Tapahtumakäsittelijä ja toiminto kun klikataan new game
var newGameBtn = document.getElementById("newGame");
newGameBtn.addEventListener("click", function() {
    newGame();
})

// Tapahtumakäsittelijä ja toiminto kun klikataan stop game
var stopGameBtn = document.getElementById("stopGame");
stopGameBtn.addEventListener("click", function() {
    stopGame();
})

// Tapahtumakäsittelijä kun hämähäkin osta painiketta klikataan
var buySpiderBtn = document.getElementById("buySpider");
buySpiderBtn.addEventListener("click", function() {
    buySpider();
})

// Tapahtumakäsittelijä kun lepakon osta painiketta klikataan
var buyBatBtn = document.getElementById("buyBat");
buyBatBtn.addEventListener("click", function() {
    buyBat();
})

// Tapahtumakäsittelijä kun haamun osta painiketta klikataan
var buyGhostBtn = document.getElementById("buyGhost");
buyGhostBtn.addEventListener("click", function() {
    buyGhost();
})


/*--------------------------------------------------------------------------------------*/

// Pisteiden kasvattaminen per klikkaus
function increasePerClick() {
    if (imgButtonActive) {
        clicks = clicks + ppClick;
        document.getElementById("points").innerText = clicks;

        if (clicks >= 10000000) {
            document.getElementById("gameText").innerText = "You won the game!"
            endGame();
        }
    }
}

// Pisteiden kasvattaminen sekunnissa
function increasePerSecond() {
    clicks = clicks + ppSecond;
    document.getElementById("points").innerText = clicks;

    if (clicks >= 10000000) {
        document.getElementById("gameText").innerText = "You won the game!"
        endGame();
    }
}
var myInterval = setInterval(increasePerSecond, 1000);

// 1. Tehosteen ostaminen
function buySpider() {
    if (clicks >= spiderCost) {
        clicks = clicks - spiderCost;
        document.getElementById("points").innerText = clicks;
        spiders++;
        document.getElementById("spiderAmount").innerText = spiders;
        ppSecond = ppSecond + 1;
        document.getElementById("perSecond").innerText = ppSecond;
    } else {
        alert("You don't have enough points!")
    }
}

// 2. Tehosteen ostaminen
function buyBat() {
    if (clicks >= batCost) {
        clicks = clicks - batCost;
        document.getElementById("points").innerText = clicks;
        bats++;
        document.getElementById("batAmount").innerText = bats;
        ppClick = ppClick + 1;
        document.getElementById("count").innerText = ppClick;
    } else {
        alert("You don't have enough points!")
    }
}

// 3. Tehosteen ostaminen
function buyGhost() {
    if (clicks >= ghostCost) {
        clicks = clicks - ghostCost;
        document.getElementById("points").innerText = clicks;
        ghosts++;
        document.getElementById("ghostAmount").innerText = ghosts;
        ppClick = ppClick * 10;
        document.getElementById("count").innerText = ppClick;
    } else {
        alert("You don't have enough points!")
    }
}

/* Kuvan ravistus kun klikataan */
function shakeImg() {
    var image = document.getElementById('clickBtn');
    
    image.style.transform = 'rotate(5deg)';
    setTimeout(() => {
    image.style.transform = 'rotate(-5deg)';
      
    setTimeout(() => {
        image.style.transform = 'rotate(0deg)';
        }, 100);
    }, 100);
}

/* Pelin lopetus funktio */
function endGame() {
    // Kuvan buttonin deaktivoiminen, jotta pisteitä ei enää kerrytetä
    imgButtonActive = false;
    document.getElementById("clickBtn").disabled = true;

    // Kaupan buttonien deaktivoiminen, jotta ei voi ostaa kun peli on lopetettu tai päättynyt
    spiderButtonActive = false;
    document.getElementById("buySpider").disabled = true;
    batButtonActive = false;
    document.getElementById("buyBat").disabled = true;
    ghostButtonActive = false;
    document.getElementById("buyGhost").disabled = true;

    // Pysäytetään increase per second funktio
    clearInterval(myInterval);
}

/* Uusi peli painikkeen funktio */
function newGame() {
    // Kuvan button aktiiviseksi
    imgButtonActive = true;
    document.getElementById("clickBtn").disabled = false;

    // Kaupan buttonit aktiiviseksi
    spiderButtonActive = true;
    document.getElementById("buySpider").disabled = false;
    batButtonActive = true;
    document.getElementById("buyBat").disabled = false;
    ghostButtonActive = true;
    document.getElementById("buyGhost").disabled = false;

    // Asetetaan kaikki arvot takaisin lähtöarvoihin
    clicks = 0;
    ppClick = 1;
    ppSecond = 0;

    spiders = 0;
    bats = 0;
    ghosts = 0;

    // Asetetaan arvot elementteihin
    document.getElementById("points").innerText = clicks;
    document.getElementById("count").innerText = ppClick;
    document.getElementById("perSecond").innerText = ppSecond;
    document.getElementById("spiderAmount").innerText = spiders;
    document.getElementById("batAmount").innerText = bats;
    document.getElementById("ghostAmount").innerText = ghosts;

    // Aloitusteksti joka poistetaan 3s kuluttua
    document.getElementById("gameText").innerText = "Game is starting!";
    setTimeout(removeText, 3000);
}

// Funktio jolla saa poistettua pelitekstin
function removeText() {
    document.getElementById("gameText").innerText = "";
}

/* Lopeta peli funktio */
function stopGame() {
    document.getElementById("gameText").innerText = "You stop the game. Start a new Game!";
    endGame();
}
