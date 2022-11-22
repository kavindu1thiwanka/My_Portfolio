$(window).on('mousemove', function (event) {
    $("#cursor").css({'top':event.pageY, 'left':event.pageX});
    playLVL1Music();
});

function playLVL1Music(){
    let audio2 = document.getElementById("lvl01BackgroundAudio");
    audio2.play();
    audio2.volume = 20;
}
function playSniperSound(){
    let audio3 = document.getElementById("sniper");
    audio3.loop=false;
    audio3.play();
}

var enemyDIV = document.getElementById('enemy');
let enemiesLeft = $('#enemyRemainCount').text();
///////// Enemy Images /////////
const enemy01=document.getElementById('enemy01');
const enemy02=document.getElementById('enemy02');
const enemy03=document.getElementById('enemy03');
////////////////////////////////
const monsters =[enemy01,enemy02,enemy03];
const xDirection = [70,250,400,525,795];
let lastRandom =-1;
let lastRandomEnemy =-1;
let random, enemyS , randomEnemy;

class Enemy{
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    draw(){
        enemyDIV.innerHTML = "";
        enemyDIV.appendChild(monsters[randomEnemy]);
        enemyDIV.style.position = "absolute";
        enemyDIV.style.left = this.x+'px';
        enemyDIV.style.top = this.y+'px';
    }

}

function spawnEnemies(){
    if (enemiesLeft>0){
        random = Math.floor(Math.random() * xDirection.length);
        randomEnemy = Math.floor(Math.random() * monsters.length);

        while (lastRandom==random){
            random = Math.floor(Math.random() * xDirection.length);
        }
        while (lastRandomEnemy==randomEnemy){
            randomEnemy = Math.floor(Math.random() * monsters.length);
        }

        enemyS = new Enemy(xDirection[random],0);
        enemyS.draw();

        lastRandom=random;
        lastRandomEnemy=randomEnemy;

        enemiesLeft=enemiesLeft-1;
        $('#enemyRemainCount').text(enemiesLeft);

    }else if (enemiesLeft==0) {
        //game over seen
        console.log("Game Over");
    }
}

let score = 0;

enemyDIV.addEventListener('click', function () {
    playSniperSound();
    spawnEnemies();
    score=score+1;
    $('#score').text(score);
},false);

setTimeout(() => {
    document.getElementById('lvl01BackgroundAudio').play();
}, 500)

spawnEnemies();