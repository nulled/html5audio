var audio, playbtn, seekslider, curtimetext, durtimetext, mutebtn, volumeslider;
function initPlayer() {
    audio        = document.getElementById("my_audio");
    playbtn      = document.getElementById("playpausebtn");
    seekslider   = document.getElementById("seekslider");
    curtimetext  = document.getElementById("curtimetext");
    durtimetext  = document.getElementById("durtimetext");
    mutebtn      = document.getElementById("mutebtn");
    volumeslider = document.getElementById("volumeslider");

    playbtn.addEventListener("click", playPause, false);
    seekslider.addEventListener("change", audioSeek, false);
    audio.addEventListener("timeupdate", seekTimeUpdate, false);
    mutebtn.addEventListener("click", audioMute, false);
    volumeslider.addEventListener("change", setVolume, false);
}
function playPause() {
    if (audio.paused) {
        audio.play();
        playbtn.style.background = 'url(pause.png)';
    } else {
        audio.pause();
        playbtn.style.background = 'url(play.png)';
    }
}
function audioSeek() {
    var seekto = audio.duration * (seekslider.value / 100);
    audio.currentTime = seekto;
}
function seekTimeUpdate() {
    var nt = audio.currentTime * (100 / audio.duration);
    seekslider.value = nt;
    var curmins = Math.floor(audio.currentTime / 60);
    var cursecs = Math.floor(audio.currentTime - curmins * 60);
    var durmins = Math.floor(audio.duration / 60);
    var dursecs = Math.floor(audio.duration - durmins * 60);
    if (cursecs < 10) cursecs = "0" + cursecs;
    if (dursecs < 10) dursecs = "0" + dursecs;
    if (curmins < 10) curmins = "0" + curmins;
    if (durmins < 10) durmins = "0" + durmins;
    curtimetext.innerHTML = curmins + ":" + cursecs;
    durtimetext.innerHTML = durmins + ":" + dursecs;
}
function audioMute() {
    if (audio.muted) {
        audio.muted = false;
        mutebtn.innerHTML = "Mute";
    } else {
        audio.muted = true;
        mutebtn.innerHTML = "Unmute";
    }
}
function setVolume(){
    audio.volume = volumeslider.value / 100;
}
window.onload = initPlayer;