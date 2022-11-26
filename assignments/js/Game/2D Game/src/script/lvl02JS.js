$(window).on('mousemove', function (e) {
    $('#lvl02_cursor').css({'top': e.pageY, 'left': e.pageX});
    console.log('top '+ e.pageY+ ' left '+ e.pageX);
    playBackgroundMusic();
})

function playBackgroundMusic() {
    let lvl02_backgroundAudio = document.getElementById("lvl02_BackgroundAudio");
    lvl02_backgroundAudio.volume = 0.2;
    lvl02_backgroundAudio.play();
}

function playSniperSound_lvl02() {
    let lvl02_sniper = document.getElementById("lvl02_sniper");
    lvl02_sniper.loop = false;
    lvl02_sniper.play();
}

function playGameOverMusic_lvl02() {
    let lvl02_gameOverMusic = document.getElementById("lvl02_gameOverSound");
    lvl02_gameOverMusic.loop = false;
    lvl02_gameOverMusic.play();
}

function playGameCompleteMusic_lvl02() {
    let lvl02_gameCompleteMusic = document.getElementById("lvl02_gameCompleteSound");
    lvl02_gameCompleteMusic.loop = false;
    lvl02_gameCompleteMusic.play();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

let lvl02_enemyDIV = document.getElementById("lvl02_enemy");
let lvl02_gameOverDIV = document.getElementById("lvl02_gameOver");
let lvl02_enemiesLeft = $('#lvl02_enemyRemainCount').text();

let LEVEL02 = document.getElementById('LEVEL02');
let LEVEL02Img = document.getElementById('LEVEL02Img');

LEVEL02.innerHTML="";
LEVEL02.appendChild(LEVEL02Img);

const lvl02_enemy01 = document.getElementById('lvl02_enemy01');
const lvl02_enemy02 = document.getElementById('lvl02_enemy02');
const lvl02_enemy03 = document.getElementById('lvl02_enemy03');

const lvl02_heart1 = document.getElementById('lvl02_heart1');
const lvl02_heart2 = document.getElementById('lvl02_heart2');
const lvl02_heart3 = document.getElementById('lvl02_heart3');
const lvl02_heartImg1 = document.getElementById('lvl02_heartImg1');
const lvl02_heartImg2 = document.getElementById('lvl02_heartImg2');
const lvl02_heartImg3 = document.getElementById('lvl02_heartImg3');

lvl02_heart1.appendChild(lvl02_heartImg1);
lvl02_heart2.appendChild(lvl02_heartImg2);
lvl02_heart3.appendChild(lvl02_heartImg3);

/////////////////////////////////////////////////////////////////////////////////

const lvl02_gameOverImg = document.getElementById('lvl02_gameOverImg');
const lvl02_gameCompleteImg = document.getElementById('lvl02_gameCompleteImg');
const lvl02_monsters = [lvl02_enemy01, lvl02_enemy02, lvl02_enemy03];
const lvl02_xDirection = [70, 250, 400, 525, 795];
let lvl02_lastRandom = -1;
let lvl02_lastRandomEnemy = -1;
let lvl02_random, lvl02_enemyS, lvl02_randomEnemy;
let lvl02_missedEnemyCount = 0;

class lvl02_Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    lvl02_draw(){
        lvl02_enemyDIV.innerHTML="";
        lvl02_enemyDIV.appendChild(lvl02_monsters[lvl02_randomEnemy]);
        lvl02_enemyDIV.style.position = "absolute";
        lvl02_enemyDIV.style.left= this.x+'px';
        lvl02_enemyDIV.style.top = this.y+'px';
        lvl02_removeEnemy();
    }

    lvl02_removeAndGameOver(){
        if (lvl02_missedEnemyCount<2){
            lvl02_enemyDIV.innerHTML = "";
            lvl02_missedEnemyCount=lvl02_missedEnemyCount+1;
            lvl02_healthReduce();
            lvl02_spawnEnemies();
        }else {
            lvl02_enemyDIV.innerHTML = "";
            lvl02_gameOverDIV.innerHTML = "";
            lvl02_gameOverDIV.appendChild(lvl02_gameOverImg);
            lvl02_missedEnemyCount=lvl02_missedEnemyCount+1;
            lvl02_healthReduce();
            playGameOverMusic_lvl02();
        }
    }
}

function lvl02_spawnEnemies(){
    if (lvl02_enemiesLeft>0){
        lvl02_random = Math.floor(Math.random() * lvl02_xDirection.length);
        lvl02_randomEnemy = Math.floor(Math.random() * lvl02_monsters.length);

        while (lvl02_lastRandom==lvl02_random){
            lvl02_random = Math.floor(Math.random() * lvl02_xDirection.length);
        }
        while (lvl02_lastRandomEnemy==lvl02_randomEnemy){
            lvl02_randomEnemy = Math.floor(Math.random() * lvl02_monsters.length);
        }

        lvl02_enemyS = new lvl02_Enemy(lvl02_xDirection[lvl02_random],0);
        lvl02_enemyS.lvl02_draw();

        lvl02_lastRandom=lvl02_random;
        lvl02_lastRandomEnemy=lvl02_randomEnemy;

        lvl02_enemiesLeft=lvl02_enemiesLeft-1;
        $('#lvl02_enemyRemainCount').text(lvl02_enemiesLeft);

    }else if (lvl02_enemiesLeft==0) {
        //go to next level seen
        lvl02_enemyDIV.innerHTML = "";
        lvl02_gameOverDIV.innerHTML = "";
        lvl02_gameOverDIV.appendChild(lvl02_gameCompleteImg);
        playGameCompleteMusic_lvl02();
    }
}

function lvl02_removeEnemy(){
    lvl02_removeTimer = setTimeout(()=>{
        lvl02_enemyS.lvl02_removeAndGameOver();
    },1000);
}

let lvl02_score = 0;

lvl02_enemyDIV.addEventListener('click', function () {
    clearTimeout(lvl02_removeTimer);
    playSniperSound_lvl02();
    lvl02_spawnEnemies();
    lvl02_score=lvl02_score+1;
    $('#lvl02_score').text(lvl02_score);
},false);

function lvl02_healthReduce(){
    if (lvl02_missedEnemyCount == 1){
        lvl02_heart1.innerHTML = "";
    }else if (lvl02_missedEnemyCount == 2){
        lvl02_heart2.innerHTML = "";
    }
    else if (lvl02_missedEnemyCount == 3){
        lvl02_heart3.innerHTML = "";
    }
}

lvl02_spawnEnemies();