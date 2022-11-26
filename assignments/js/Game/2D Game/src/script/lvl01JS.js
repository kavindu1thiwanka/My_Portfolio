$(window).on('mousemove', function (event) {
    $("#cursor").css({'top':event.pageY, 'left':event.pageX});
    playLVL1Music();
});

function playLVL1Music(){
    let audio2 = document.getElementById("lvl01BackgroundAudio");
    audio2.play();
    audio2.volume = 1;
}
function playSniperSound(){
    let audio3 = document.getElementById("sniper");
    audio3.loop=false;
    audio3.currentTime = 0;
    audio3.play();
}
function playGameOverSound(){
    let audio4 = document.getElementById("gameOverSound");
    audio4.loop=false;
    audio4.play();
}
function playGameCompleteSound(){
    let audio5 = document.getElementById("gameCompleteSound");
    audio5.loop=false;
    audio5.play();
}

////////////////////////////////////////////////////////////////////////

let enemyDIV = document.getElementById('enemy');
let gameOverDIV = document.getElementById('gameOver');
let LEVEL01 = document.getElementById('LEVEL01');
let LEVEL01Img = document.getElementById('LEVEL01Img');

LEVEL01.innerHTML="";
LEVEL01.appendChild(LEVEL01Img);
let enemiesLeft = $('#enemyRemainCount').text();
///////// Enemy Images /////////
const enemy01=document.getElementById('enemy01');
const enemy02=document.getElementById('enemy02');
const enemy03=document.getElementById('enemy03');
///////// heart Images /////////
const heart1=document.getElementById('heart1');
const heart2=document.getElementById('heart2');
const heart3=document.getElementById('heart3');
const heartImg1=document.getElementById('heartImg1');
const heartImg2=document.getElementById('heartImg2');
const heartImg3=document.getElementById('heartImg3');

heart1.appendChild(heartImg1);
heart2.appendChild(heartImg2);
heart3.appendChild(heartImg3);

///////////////////////////////
const gameOverImg=document.getElementById('gameOverImg');
const gameCompleteImg=document.getElementById('gameCompleteImg');
const monsters =[enemy01,enemy02,enemy03];
const xDirection = [70,250,400,525,795];
let lastRandom =-1;
let lastRandomEnemy =-1;
let random, enemyS , randomEnemy;
let missedEnemyCount=0;

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
        removeEnemy();
    }

    removeANDGameOver(){
        if (missedEnemyCount<2){
            enemyDIV.innerHTML = "";
            missedEnemyCount=missedEnemyCount+1;
            healthReduce();
            spawnEnemies();
        }else {
            enemyDIV.innerHTML = "";
            gameOverDIV.innerHTML = "";
            gameOverDIV.appendChild(gameOverImg);
            missedEnemyCount=missedEnemyCount+1;
            healthReduce();
            playGameOverSound();
        }
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
        //go to next level seen
        enemyDIV.innerHTML = "";
        gameOverDIV.innerHTML = "";
        gameOverDIV.appendChild(gameCompleteImg);
        playGameCompleteSound();
        setTimeout(redirectLvl02,2500);
    }
}

function redirectLvl02() {
    window.location =
        "level_02.html"
}

function removeEnemy(){
    removeTimer = setTimeout(()=>{
        enemyS.removeANDGameOver();
    },1500);
}

let score = 0;

enemyDIV.addEventListener('click', function () {
    clearTimeout(removeTimer);
    playSniperSound();
    spawnEnemies();
    score=score+1;
    $('#score').text(score);
},false);

function healthReduce(){
    if (missedEnemyCount == 1){
        heart1.innerHTML = "";
    }else if (missedEnemyCount == 2){
        heart2.innerHTML = "";
    }
    else if (missedEnemyCount == 3){
        heart3.innerHTML = "";
    }
}
setTimeout(spawnEnemies,1500);