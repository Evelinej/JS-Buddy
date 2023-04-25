let deinTamagotchi = "";

// Checkt, ob ein Name gespeichert wurde

if (localStorage.getItem("Name") === null) {
    deinTamagotchi = prompt('Wie heisst dein Buddy?'); // individueller Name
} else {
    deinTamagotchi = localStorage.getItem("Name");
}

document.getElementById('name').innerText = deinTamagotchi;

let zufriedenheit = 30;
let hunger =  30;
let muedigkeit = 30;

let score = zufriedenheit + hunger + muedigkeit;


// Checkt, ob eine Punktzahl gespeichert wurde

if (localStorage.getItem("Punktzahl") === null) {
    score = zufriedenheit + hunger + muedigkeit;
} else {
    score = localStorage.getItem("Punktzahl");
}

function scorecalculation() {
   score = zufriedenheit + hunger + muedigkeit;
   console.log(score);
}; // score berechnen

/*
function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}; //sleep Funktion bzw. Pause machen, Performance leidet unter der Kombo (sleep und setInterval)
*/


// Abzüge der Grundwerte + aufrufen der Score-Berechnung

function hungersubtraction() {
    let randomNumber = Math.floor(Math.random() * 5); //zufällige Nummer zwischen 0 und 5
    let currentHunger = hunger - randomNumber;
    hunger = currentHunger;
    console.log("Hunger: " + hunger);
    scorecalculation();
};

function muedigkeitsubtraction() {
    let randomNumber = Math.floor(Math.random() * 3); //zufällige Nummer zwischen 0 und 3
    let currentmuedigkeit = muedigkeit - randomNumber;
    muedigkeit = currentmuedigkeit;
    console.log("Müdigkeit: "+ muedigkeit);
    scorecalculation();
};

function zufriedenheitsubtraction() {
    let randomNumber = Math.floor(Math.random() * 8); //zufällige Nummer zwischen 0 und 8
    let currentzufriedenheit = zufriedenheit - randomNumber;
    zufriedenheit = currentzufriedenheit;
    console.log("Zufriedenheit: " + zufriedenheit);
    scorecalculation();
};

// funktionen für Buttons (füttern, schlafen, spielen)

function spielen() {
    let randomNumber = Math.floor(Math.random() * 15 + 8); //zufällige Nummer zwischen 8 und 15
    let currentzufriedenheit = zufriedenheit + randomNumber;
    zufriedenheit = currentzufriedenheit;
    console.log("Zufriedenheit2: " + zufriedenheit);
    document.getElementById('image').src = "img/Digezz-II_animation_Play.gif";
    scorecalculation();
};

function fuettern() {
    let randomNumber = Math.floor(Math.random() * 10 + 5); //zufällige Nummer zwischen 5 und 10
    let currentHunger = hunger + randomNumber;
    hunger = currentHunger;
    console.log("Hunger2: " + hunger);
    document.getElementById('image').src = "img/Digezz-II_animation_Eat.gif";
    scorecalculation();
};

function schlafen() {
    let randomNumber = Math.floor(Math.random() * 10 + 5); //zufällige Nummer zwischen 5 und 10
    let currentmuedigkeit = muedigkeit + randomNumber;
    muedigkeit = currentmuedigkeit;
    console.log("Müdigkeit2: " + muedigkeit);
    document.getElementById('image').src = "img/Digezz-II_animation_Sleep.gif";
    scorecalculation();
};

// Werte nach gewisser Zeit reduzieren

function Werteverringern(){
		if(hunger >= 0){
			//sleep(100);
			hungersubtraction();
		}
		if(zufriedenheit >= 0){
			//sleep(500);
			zufriedenheitsubtraction();
		}
		if(muedigkeit >= 0){
			//sleep(700);
			muedigkeitsubtraction();
		}
		
		else {
			console.log("I died?");

            // Box, die nach Neustart fragt. Löscht den Score und ladet Seite neu.

            if (confirm("Neustart?")) {
                localStorage.setItem("Name", deinTamagotchi);
                localStorage.removeItem("Punktzahl");
                location.reload();
                } else {
                  console.log("I died forever T_T");
                  clearInterval(stopInterval);
                } 

		}
		
};

// Visuelle Anzeige des Status

function scoreDisplay() {
    if (score >= 200){
        document.getElementById('status').innerText = ":D";
    } if (score <= 150) {
        document.getElementById('status').innerText = ":)";
    } if (score <= 100) {
        document.getElementById('status').innerText = ":/";
    } if (score <= 50) {
        document.getElementById('status').innerText = "T_T";
    } if (score <= 0) {
        document.getElementById('status').innerText = "XoX";
        clearInterval(stopDisplay);
    } 
};

// Variable um Intervall für die Score-Abfrage zu stoppen

let stopDisplay = window.setInterval(scoreDisplay, 5000);

// Variable um den Intervall nach "Tod" zu stoppen

let stopInterval = window.setInterval(Werteverringern, 10000);

// Im local storage speichern
function speichern(){
    localStorage.setItem("Name", deinTamagotchi);
    localStorage.setItem("Punktzahl", score);
}
