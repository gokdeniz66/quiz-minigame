const vraag = document.getElementById("vraag");
const keuzes = Array.from(document.getElementsByClassName("keuze-text"));
const bijlage = document.getElementById("bijlage");
const scoreText = document.getElementById('score');
const progressBarLoad = document.getElementById('progressBarLoad');


let huidige_vraag = {};
let antwoord_check = false;
let score = 0;
let vragen_teller = 0;
let beschikbare_vragen = [];

/**
 * QUESTIONS
 */
let vragen = [{
    vraag: "Welke taal is geen Front-End language?",
    bijlage: '',
    keuze1: "HTML",
    keuze2: "JAVASCRIPT",
    keuze3: "CSS",
    keuze4: "RUBY",
    corrigerend_antwoord: "RUBY",
    antwoord: 4
},
{
    vraag: "Waar staat een .js extensie voor?",
    bijlage: '',
    keuze1: "JAVA",
    keuze2: "JQUERY",
    keuze3: "JAVASCRIPT",
    keuze4: "JSON",
    corrigerend_antwoord: "JAVASCRIPT",
    antwoord: 3
},
{
    vraag: "Waar staat CSS voor?",
    bijlage: '',
    keuze1: "Cascading Style Sheets",
    keuze2: "Cascading Stereo Sheets",
    keuze3: "Cascading Style Series",
    keuze4: "Cascading Shows Sheets",
    corrigerend_antwoord: "Cascading Style Sheets",
    antwoord: 1
},
{
    vraag: "Het verbergen van HTML-elementen kan ook uitgevoerd worden door Javascript. Wat is de juiste code? :",
    bijlage: '',
    keuze1: "document.getElementById('myDIV').style.display = 'hidden';'",
    keuze2: "document.getElementById('myDIV').style.visibility = 'none';'",
    keuze3: "document.getElementById('myDIV').style.display = 'none';'",
    keuze4: "document.getElementById('myDIV').style.visibility = 'hide';'",
    corrigerend_antwoord: "document.getElementById('myDIV').style.display = 'none';",
    antwoord: 3
},
{
    vraag: "Wat is een <br> tag?",
    bijlage: '',
    keuze1: "Dit gebruik je om een tekst een weight te geven",
    keuze2: "Dit gebruik je om de volgende element een enter te geven",
    keuze3: "Dit gebruik je om een element cursief te maken",
    keuze4: "Dit gebruik je om een element te onderstrepen",
    corrigerend_antwoord: "Dit gebruik je om de volgende element een enter te geven",
    antwoord: 2
},
{
    vraag: "Wat voor border property gebruik je om dit opmaak te krijgen?",
    bijlage: '<img src="assets/symbol_question.png" width="150px" height="150px">',
    keuze1: "border: 50px;",
    keuze2: "border-scale: 50px;",
    keuze3: "border-curved: 50px;",
    keuze4: "border-radius: 50px;",
    corrigerend_antwoord: "border-radius: 50px;",
    antwoord: 4
},
{
    vraag: "Wat is het verschil tussen een ID en een CLASS? ",
    bijlage: '<img src="assets/attribute_question.gif" width="50%" height="100%">',
    keuze1: "Het is een synoniem van elkaar",
    keuze2: "Een class gebruik je voor divs en een id alleen voor tekst",
    keuze3: "Een class kan je bij meerdere elementen gebruiken en bij een id niet",
    keuze4: "Een class is uniek en een id juist niet",
    corrigerend_antwoord: "Een class kan je bij meerdere elementen gebruiken en bij een id niet",
    antwoord: 3
},
{
    vraag: "Welke stelling is juist?",
    bijlage: '<img src="assets/font_question.png" width="50%" height="100%">',
    keuze1: "Font-family kan geen meerdere fonts doorgeven",
    keuze2: "Font-color is niet de juiste css property",
    keuze3: "Font-weight hoort font-size te zijn",
    keuze4: "Grid bij display bestaat niet",
    corrigerend_antwoord: "Font-color is niet de juiste css property",
    antwoord: 2
},
{
    vraag: "Welke stelling past hier het best bij?",
    bijlage: 'Websites maken meestal gebruik van meta-tags. die bevinden zich in de head section.',
    keuze1: "Maakt je code meer duidelijk",
    keuze2: "Docenten kunnen hierdoor makkelijker nakijken",
    keuze3: "Dit verbeterd de zoekresultaten kans op het internet",
    keuze4: "Slaat informatie op de webpagina",
    corrigerend_antwoord: "Dit verbeterd de zoekresultaten kans op het internet",
    antwoord: 3
},
{
    vraag: "Wat voor resultaat krijg je uit de output?",
    bijlage: '<img src="assets/substr_question.png" width="50%" height="100%">',
    keuze1: "Hello wo",
    keuze2: "ello wo",
    keuze3: "worl",
    keuze4: "ello",
    corrigerend_antwoord: "ello",
    antwoord: 4
}
]

// AMOUNT OF BONUS POINT BY EACH CORRECT ANSWER
const CORRECT_BONUS = 1;
// TOTAL QUESTIONS
const MAX_vragen = 10;

/**
 * START GAME
 */
startGame = () => {
    vragen_teller = 0;
    score = 0;
    beschikbare_vragen = [...vragen]
    krijgNieuweVraag();
    timerStart();
};

// GET NEXT QUESTION
krijgNieuweVraag = () => {
    // END GAME
    if (beschikbare_vragen.length == 0 || vragen_teller > MAX_vragen) {

        var inputVal = document.getElementById("student_nummer").value;

        var xHttp = new XMLHttpRequest();
        var url = `https://quiz.clow.nl/v1/score`;
        xHttp.open("POST", url, true);
        xHttp.setRequestHeader("Content-Type", "application/json");
        xHttp.onreadystatechange = function () {
            if (xHttp.status === 200) {
                const succes_message = document.getElementById("score_message");
                succes_message.innerHTML = `<p class="score_succes">Het opslaan van de score is gelukt!</p>`;
            } else {
                const error_message = document.getElementById("score_message");
                error_message.innerHTML = `<p class="score_error">Het opslaan van de score is niet gelukt.</p>`;
                console.log("Data naar API sturen mislukt!");
            };
        };
        var data = JSON.stringify({ quizMaster: "s1175119", student: inputVal, points: score, time: totalSeconds });
        xHttp.send(data);

        // GO TO END PAGE
        showEndPage();

    } else {
        // SHOW NEW QUESTION
        vragen_teller++;
        // UPDATING PROGRESS BAR
        progressBarLoad.style.width = `${(vragen_teller / MAX_vragen) * 100}%`;


        const vraag_index = Math.floor(Math.random() * beschikbare_vragen.length);
        huidige_vraag = beschikbare_vragen[vraag_index];

        // SHOWS THE ACTIVE QUIZ QUESTION
        vraag.innerText = huidige_vraag.vraag;

        var bijlage = document.getElementById("bijlage");
        bijlage.innerHTML = huidige_vraag.bijlage;

        keuzes.forEach(keuze => {
            const number = keuze.dataset['number'];
            keuze.innerText = huidige_vraag['keuze' + number];
        });

        beschikbare_vragen.splice(vraag_index, 1);

        antwoord_check = true;
    }
};

/**
 * SELECT CHOICE FUNCTION
 */
keuzes.forEach(keuze => {
    keuze.addEventListener("click", e => {
        if (!antwoord_check) return;

        antwoord_check = false;
        const gekozen_keuze = e.target;
        const gekozen_antwoord = gekozen_keuze.dataset["number"];
        const correct_antwoord = huidige_vraag.corrigerend_antwoord;


        let classToApply = '';
        if (gekozen_antwoord == huidige_vraag.antwoord) {
            classToApply = 'correct';
        } else {
            classToApply = 'incorrect';
        }

        huidige_vraag.antwoord

        if (classToApply == 'correct') {
            incrementScore(CORRECT_BONUS);
            var feedback_text = document.getElementById('feedback');
            feedback_text.innerText = "Goedgedaan! Je antwoord is juist.";

        } else {
            var feedback_text = document.getElementById('feedback');
            feedback_text.innerText = `Helaas je antwoord is fout. Het juiste antwoord is: "${correct_antwoord}"`;
            gekozen_keuze.parentElement.classList.add(classToApply);
        }

        gekozen_keuze.parentElement.classList.add(classToApply);

        setTimeout(() => {
            gekozen_keuze.parentElement.classList.remove(classToApply);
            var feedback_text = document.getElementById('feedback');
            feedback_text.innerText = "";
            krijgNieuweVraag();
        }, 3500);
    });
});

/**
 * SCORE FUNCTION
 */
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

/**
 * TIMER FUNCTION
 */
var minutesSpan = document.getElementById("minutes");
var secondsSpan = document.getElementById("seconds");
var totalSeconds = 0;

function timerStart() {

    document.getElementById('button-questions').onclick = function () {

        time = setInterval(setTime, 1000);

        function setTime() {
            ++totalSeconds;
            secondsSpan.innerHTML = pad(totalSeconds % 60);
            minutesSpan.innerHTML = pad(parseInt(totalSeconds / 60));

            if (totalSeconds > 3600) {
                location.reload();
            }
        }

        function pad(val) {
            var valString = val + "";
            if (valString.length < 2) {
                return "0" + valString;
            } else {
                return valString;
            }
        }
    }
}

/**
 * TIMER STOP FUNCTION
 */
function timerStop() {
    clearInterval(time);
}

/**
 * LEADERBOARD FUNCTION
 */
function leaderboard() {
    var xHttp = new XMLHttpRequest();
    xHttp.onreadystatechange = function () {
        if (xHttp.readyState == XMLHttpRequest.DONE) {
            var response = JSON.parse(xHttp.response);
            if (xHttp.status == 200) {
                leaderboardSucces(response);
            } else {
                const error_message = document.getElementById("leaderboard-title");
                error_message.innerHTML = `<p class="score_error">Leaderboard kon niet geladen worden.</p>`;
            };
        }
    };

    xHttp.open("GET", "https://quiz.clow.nl/v1/highscores/s1175119", true);
    xHttp.send();
}

/**
 * PLACE PLAYER INFO IN LEADERBOARD
 */
function leaderboardSucces(leaderboardPlaces) {
    leaderboardPlaces.sort(function (a, b) { return compare(a, b); });
    leaderboardPlaces.reverse();
    document.getElementById("rank-1").innerText = leaderboardPlaces[0].player.number + " | " + leaderboardPlaces[0].player.firstName + " " + leaderboardPlaces[0].player.lastName + " | P: " + leaderboardPlaces[0].points + " | S: " + leaderboardPlaces[0].time;
    document.getElementById("rank-2").innerText = leaderboardPlaces[1].player.number + " | " + leaderboardPlaces[1].player.firstName + " " + leaderboardPlaces[1].player.lastName + " | P: " + leaderboardPlaces[1].points + " | S: " + leaderboardPlaces[1].time;
    document.getElementById("rank-3").innerText = leaderboardPlaces[2].player.number + " | " + leaderboardPlaces[2].player.firstName + " " + leaderboardPlaces[2].player.lastName + " | P: " + leaderboardPlaces[2].points + " | S: " + leaderboardPlaces[2].time;
    document.getElementById("rank-4").innerText = leaderboardPlaces[3].player.number + " | " + leaderboardPlaces[3].player.firstName + " " + leaderboardPlaces[3].player.lastName + " | P: " + leaderboardPlaces[3].points + " | S: " + leaderboardPlaces[3].time;
    document.getElementById("rank-5").innerText = leaderboardPlaces[4].player.number + " | " + leaderboardPlaces[4].player.firstName + " " + leaderboardPlaces[4].player.lastName + " | P: " + leaderboardPlaces[4].points + " | S: " + leaderboardPlaces[4].time;
    document.getElementById("rank-6").innerText = leaderboardPlaces[5].player.number + " | " + leaderboardPlaces[5].player.firstName + " " + leaderboardPlaces[5].player.lastName + " | P: " + leaderboardPlaces[5].points + " | S: " + leaderboardPlaces[5].time;
    document.getElementById("rank-7").innerText = leaderboardPlaces[6].player.number + " | " + leaderboardPlaces[6].player.firstName + " " + leaderboardPlaces[6].player.lastName + " | P: " + leaderboardPlaces[6].points + " | S: " + leaderboardPlaces[6].time;
    document.getElementById("rank-8").innerText = leaderboardPlaces[7].player.number + " | " + leaderboardPlaces[7].player.firstName + " " + leaderboardPlaces[7].player.lastName + " | P: " + leaderboardPlaces[7].points + " | S: " + leaderboardPlaces[7].time;
    document.getElementById("rank-9").innerText = leaderboardPlaces[8].player.number + " | " + leaderboardPlaces[8].player.firstName + " " + leaderboardPlaces[8].player.lastName + " | P: " + leaderboardPlaces[8].points + " | S: " + leaderboardPlaces[8].time;
    document.getElementById("rank-10").innerText = leaderboardPlaces[9].player.number + " | " + leaderboardPlaces[9].player.firstName + " " + leaderboardPlaces[9].player.lastName + " | P: " + leaderboardPlaces[9].points + " | S: " + leaderboardPlaces[9].time;
}

/**
 * SORT HIGHSCORE
 */
function compare(a, b) {
    if (a.points < b.points) {
        return -1;
    }
    if (b.points < a.points) {
        return 1;
    }
    if (b.points === a.points) {
        return 0;
    }
    if (a.time > b.time) {
        return 1;
    }
    if (a.time < b.time) {
        return -1;
    }
}

/**
 * TWITTER SHARE SCORE AND TIME FUNCTION
 */
document.getElementById('button-tweet').addEventListener('click', () => {
    let message = `Hey! Ik heb de FrontMenQuiz gespeeld, waar ze je kennis over Front-End Development uittesten. Ik heb een aantal punten van ${score} behaald in een tijd van ${totalSeconds} seconden!`;
    window.open(`https://twitter.com/intent/tweet?text=${message.replace(/ +/g, '%20')}`);
});

//DISABLE BUTTON IF THERE IS NO INPUT
function input_empty() {
    if (document.getElementById("student_nummer").value === "") {
        document.getElementById('login_button').disabled = true;
    } else {
        document.getElementById('login_button').disabled = false;
    }
}

/**
 * STUDENT LOGIN
 */
function StudentLogin() {
    var inputVal = document.getElementById("student_nummer").value;
    var xHttp = new XMLHttpRequest();

    xHttp.onreadystatechange = function () {
        if (xHttp.readyState == XMLHttpRequest.DONE) {
            var response = JSON.parse(xHttp.response);
            if (xHttp.status == 200) {
                studentIdentificationSucces(response);
                document.getElementById('name').innerHTML = response.firstName;
                document.getElementById('login_button').disabled = true;
            } else {
                studentIdentificationFailed(response);
            }
        }
    }
    xHttp.onerror = function () {
        studentIdentificationFailed(xHttp.statusText);
    };
    xHttp.open("GET", `https://quiz.clow.nl/v1/student/${inputVal}`);
    xHttp.send();
}

//STUDENT IS SUCCESFULLY IDENTIFIED 
function studentIdentificationSucces(student) {
    console.info(student); // Een Javascript-object met studentnummer, voornaam en achternaam
    setTimeout(() => {
        showStartPage();
    }, 1000);
    document.getElementById('warning-message').innerHTML = `<p class="succes-message">Verbinden...</p>`;
}

//STUDENT NUMBER IS INCORRECT
function studentIdentificationFailed(errorMessage) {
    if (document.getElementById("student_nummer").value[0] !== 's' || document.getElementById("student_nummer").value.length !== 8) {
        document.getElementById('warning-message').innerHTML = `<p class="warning-message">Ongeldige invoer</p>`;
    } else {
        document.getElementById('warning-message').innerHTML = `<p class="warning-message">Studentnummer bestaat niet!</p>`;
    }
}

startGame();
