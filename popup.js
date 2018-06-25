var customValue = document.getElementById('creature');
var frameDom = document.getElementById('iframe1');
var save = document.getElementById('save');
var hero = document.getElementById('hero');
var msg = document.getElementById('msg');

customValue.addEventListener("change", function(e){
    e.preventDefault();
    e.stopPropagation();
    hero.style.display = "none";
    if (e.currentTarget.value === '3') {
        hero.style.display = "block";
    }
});

save.addEventListener("click", function(){
    msg.innerText = "Saved";
    var creature = customValue.selectedOptions[0].value =="3" ? hero.value :  customValue.selectedOptions[0].text;
    var searchUrl = "http://www.google.fr/search?tbm=isch&tbs=isz:ex,iszw:800,iszh:600&q=" + creature;
    frameDom.src = searchUrl;
});