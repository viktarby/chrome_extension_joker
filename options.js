var jokerAppOptions = {};
var save = document.getElementById('save');
var tricks = document.getElementById('tricks');

chrome.storage.sync.get(["jokerAppOptions"], function(data) {
    jokerAppOptions = data.jokerAppOptions;
    document.getElementById("redirectTo").value = jokerAppOptions.redirectTo;
    document.getElementById("message").value = jokerAppOptions.message;
    document.getElementById("forbidenUrl").value = jokerAppOptions.blockedWebsites.join(",");
    var n = jokerAppOptions.trickType >= 1 ? jokerAppOptions.trickType : 0;
    tricks.options[n].selected = true;
    switch(n) {
        case "0":
            break;
        case "1":
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