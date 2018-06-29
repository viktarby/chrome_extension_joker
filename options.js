var jokerAppOptions = {};
var save = document.getElementById('save');
var tricks = document.getElementById('tricks');
var boss = document.getElementById('boss');

chrome.storage.sync.get(["jokerAppOptions"], function(data) {
    jokerAppOptions = data.jokerAppOptions;
    document.getElementById("redirectTo").value = jokerAppOptions.redirectTo;
    document.getElementById("message").value = jokerAppOptions.message;
    document.getElementById("forbidenUrl").value = jokerAppOptions.blockedWebsites.join(",");
    var n = jokerAppOptions.trickType ? jokerAppOptions.trickType : "0";
    tricks.options[n].selected = true;

    switch(n) {
        case "0":
            break;
        case "1":
            boss.style.visibility = 'visible';
            break;
        default:
            break;
    }
});

save.addEventListener("click", function() {
    jokerAppOptions.trickType = tricks.selectedOptions[0].value;
    jokerAppOptions.redirectTo = document.getElementById("redirectTo").value;
    jokerAppOptions.message = document.getElementById("message").value;
    jokerAppOptions.blockedWebsites = document.getElementById("forbidenUrl").value.split(",");
    chrome.storage.sync.set({"jokerAppOptions": jokerAppOptions}, function() {
        var msg = document.getElementById("msg");
        msg.innerText = "Saved";
    });
});


tricks.addEventListener("change", function() {
    var n =tricks.selectedOptions[0].value;
    switch(n) {
        case "0":
            boss.style.visibility = 'hidden';
            break;
        case "1":
            boss.style.visibility = 'visible';
            break;
        default:
            break;
    }

});