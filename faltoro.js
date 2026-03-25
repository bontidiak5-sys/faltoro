const  canvas  =  document.getElementById  (  'game-canvas' );
 const  ctx  =  canvas.getContext ( '2d'  ) ;
 const  scoreElement  =  document.getElementById  (  'score' );

 canvas.width  =  800  ;
 canvas.height  =  600  ;

 let  score  =  0 ;
 let  gameRunning  =  true ;

 class  Rower {
 constructor () {
 this.width = 100  ;​​ 
 this.height = 20 ;​​  
 this.x  =  canvas.width  /  2  -  this.width  /  2  ;
 this.y  =  canvas.height  -  30  ;
 this.speed = 8 ;​​  
 this.dx = 0 ;​​  
}

 draw () {
 ctx.fillStyle  =  '  #fff' ;
 ctx.fillRect  (  this.x  ,  this.y , this.width  ,  this.height  )  ;
}

 update () {
 this.x += this.dx ;
  if ( this.x  <  0  ) this.x  =  0 ;
 if  (  this.x  +  this.width  >  canvas.width  )  this.x  =  canvas.width  -  this.width  ;
}
}

 class  Ball {
 constructor () {
 this.radius = 10 ;​​  
 this.x  =  canvas.width  /  2  ;
 this.y  =  canvas.height  -  50  ;
 this.dx = 4 ;​​  
 this.dy  = -4 ;​   
}

 draw () {
 ctx.beginPath ( ) ;
 ctx.arc  (  this.x  ,  this.y , this.radius  ,  0 , Math.PI  *  2  )  ;
 ctx.fillStyle  = ' #  f00' ;
 ctx.fill  ( );
}

 update () {
 this.x+=this.dx  ;
 this.y+=this.dy  ;

 Walls
 if  (  this.x  -  this.radius  <  0  ||  this.x  +  this.radius  >  canvas.width  )  {
 this.dx  =  -  this.dx  ;
}
 if ( this.y  -  this.radius  <  0  )  {
 this.dy  =  -  this.dy  ;
}
 if  (  this.y  +  this.radius  >  canvas.height  )  {
 this.x  =  canvas.width  /  2  ;
 this.y  =  canvas.height  -  50  ;
 this.dy  = -4 ;​   
}
}
}
class Brick {
    constructor(x, y) {
        this.width = 75;
        this.height = 20;
        this.x = x;
        this.y = y;
        this.visible = true;
    }

    draw() {
        if (this.visible) {
            ctx.fillStyle = '#00f';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}


const paddle = new Paddle();
const ball = new Ball();
const bricks = [];


function createBricks() {
    const rows = 5;
    const cols = 10;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const x = c * 80 + 10;
            const y = r * 30 + 50;
            bricks.push(new Brick(x, y));
        }
    }
}

createBricks();

function checkCollisions() {
    if (ball.y + ball.radius > paddle.y && ball.y - ball.radius < paddle.y + paddle.height &&
        ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
        ball.dy = -ball.dy;
    }

    bricks.forEach((brick, index) => {
        if (brick.visible &&
            ball.x > brick.x && ball.x < brick.x + brick.width &&
            ball.y > brick.y && ball.y < brick.y + brick.height) {
            ball.dy = -ball.dy;
            brick.visible = false;
            score += 10;
            scoreElement.textContent = `Pont: ${score}`;
        }
    });
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paddle.draw();
    ball.draw();
    bricks.forEach(brick => brick.draw());
}

function update() {
    paddle.update();
    ball.update();
    checkCollisions();
}

function gameLoop() {
    if (gameRunning) {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        paddle.dx = -paddle.speed;
    } else if (e.key === 'ArrowRight') {
        paddle.dx = paddle.speed;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        paddle.dx = 0;
    }
});

gameLoop();