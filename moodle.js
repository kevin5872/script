// ==UserScript==
// @name            UNM Login Tool
// @description     It helps to auth at the University of Nottingham on the platform Moodle.
// @version         1.0 (2021+)
// @author          Pavel Vecherin (vecherins@gmail.com?subject="UNM Login Tool")
// @license         MIT
// @icon            https://moodle.nottingham.ac.uk/theme/image.php/nottingham/theme/1634143133/favicon
// @include         https://moodle.nottingham.ac.uk/login/index.php
// @require         https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @run-at          document-idle
// @grant           GM_setValue
// @grant           GM_getValue
// @grant           GM_deleteValue
// @grant           GM_registerMenuCommand
// ==/UserScript==

(function() {
    GM_registerMenuCommand('Reset credentials', function() {
        reset();
    });
    if (GM_getValue('credentials', 0) === 0) {
        init();
    }
    login();
})();

function init() {
    alert("Please perform the setup now.\nHave your UNM credentials ready.\nYour credentials are stored local.");
    while(true) {
        var username = prompt('Provide your username.');
        if (username != null) {
            break;
        }
    }
    while(true) {
        var password = prompt('Provide your password.');
        if (password != null) {
            break;
        }
    }
    var credentials = [username, password];
    GM_setValue('credentials', credentials);
    console.log('Saved credentials: ' + GM_getValue('credentials'));
}

function login() {
    var credentials = GM_getValue('credentials');
    var username = credentials[0];
    var password = credentials[1];
    $('input#username').val(username);
    $('input#password').val(password);
    $('#loginbtn').click();
    console.log('Login');

}

function reset() {
    GM_deleteValue('credentials'); window.location.reload();
}
