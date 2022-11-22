$(window).on('mousemove', function (event) {
    $("#cursor").css({'top':event.pageY, 'left':event.pageX});
    playMusic()

});

function playMusic(){
    let audio = document.getElementById("indexBackgroundAudio");
    audio.play();
    audio.volume = 0.2;
}