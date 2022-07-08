"use strict"

/**
 * ADD ACTIONS TO PAGE BUTTONS 
 */
function addButtonActions() {
    var documentationButton = document.getElementById('button-documentation');
    var questionsButton = document.getElementById('button-questions');
    var leaderboardButton = document.getElementById('button-leaderboard');

    documentationButton.addEventListener("click", function () {
        showDocumentationPage();
    });

    questionsButton.addEventListener("click", function () {
        showQuestionsPage();
    });

    leaderboardButton.addEventListener("click", function () {
        showLeaderboardPage();
        leaderboard();
    });
}

/**
 * HIDE ALL PAGES
 */
function hideAllPages() {
    var loginPage = document.getElementById('page-login');
    var startPage = document.getElementById('page-start');
    var questionsPage = document.getElementById('page-questions');
    var endPage = document.getElementById('page-end');
    var leaderboardPage = document.getElementById('page-leaderboard');

    loginPage.style.display = 'none';
    startPage.style.display = 'none';
    questionsPage.style.display = 'none';
    endPage.style.display = 'none';
    leaderboardPage.style.display = 'none';
}

/**
 * SHOW LOGIN PAGE
 */
function showLoginPage() {
    var page = document.getElementById('page-login');

    hideAllPages();

    page.style.display = 'flex';
}

/**
 * SHOW START PAGE
 */
function showStartPage() {
    var page = document.getElementById('page-start');

    hideAllPages();

    page.style.display = 'flex';
}

/**
 * SHOW DOCUMENTATION PAGE
 */
function showDocumentationPage() {
    window.location.href = './documentation/index.html';
}

/**
 * SHOW QUESTIONS PAGE
 */
function showQuestionsPage() {
    var page = document.getElementById('page-questions');

    hideAllPages();

    page.style.display = 'flex';
}

/**
 * SHOW LEADERBOARD PAGE
 */
function showLeaderboardPage() {
    var page = document.getElementById('page-leaderboard');

    hideAllPages();

    page.style.display = 'flex';
}

/**
 * SHOW END PAGE
 */
function showEndPage() {
    var page = document.getElementById('page-end');

    hideAllPages();

    page.style.display = 'flex';

    timerStop();
}

// BUTTON GO TO START
document.getElementById('button-home').onclick = function () {
    showStartPage();
    location.reload();
}

// INITIALIZE
addButtonActions();
showLoginPage();
