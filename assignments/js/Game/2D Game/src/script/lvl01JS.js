$(window).on('mousemove', function (event) {
    $("#cursor").css({'top':event.pageY, 'left':event.pageX});
});

var enemyDIV = document.getElementById('enemy');
let enemiesLeft = $('#enemyRemainCount').text();
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
        enemyDIV.appendChild(monsters[randomEnemy]);
        enemyDIV.style.position = "absolute";
        enemyDIV.style.left = this.x+'px';
        enemyDIV.style.top = this.y+'px';
    }

}

function spawnEnemies(){
    if (enemiesLeft>0){
        console.log("lastRandomEnemy "+lastRandomEnemy);
        random = Math.floor(Math.random() * xDirection.length);
        randomEnemy = Math.floor(Math.random() * monsters.length);

        while (lastRandom==random){
            random = Math.floor(Math.random() * xDirection.length);
        }
        while (lastRandomEnemy==randomEnemy){
            randomEnemy = Math.floor(Math.random() * monsters.length);
        }
        console.log("randomEnemy "+randomEnemy);

        enemyS = new Enemy(xDirection[random],0);
        enemyS.draw();

        lastRandom=random;
        lastRandomEnemy=randomEnemy;
        console.log("lastRandomEnemy "+lastRandomEnemy);

        enemiesLeft=enemiesLeft-1;
        $('#enemyRemainCount').text(enemiesLeft);

    }else if (enemiesLeft==0) {
        //game over seen
        console.log("Game Over");
    }
}

enemyDIV.addEventListener('click', function () {
    spawnEnemies();
},false);

spawnEnemies();