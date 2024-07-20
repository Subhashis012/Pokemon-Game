const NUM_BUSHES = 50
const NUM_BALLS = 8

const player = document.querySelector('.player')
const player_pos = {
    x: parseInt(window.innerWidth/2),
    y: parseInt(window.innerHeight/2)
}

const player_val = {
    x: 0,
    y: 0
}

const balls = []

const sound = new Audio('./assets/sound.mp3')


function createBushes(){
    for(let i = 0; i < NUM_BUSHES; i++){
        const div = document.createElement('div')
        div.classList.add('bush')
        div.style.left = Math.random() * 100 + '%'
        div.style.top = Math.random() * 100 + '%'
        document.body.appendChild(div)
    }
}

function generateBalls(){
        const div = document.createElement('div')
        div.classList.add('pokeball')
        let x  = Math.random() * 100 + '%'
        let y = Math.random() * 100 + '%'
        div.style.left = x
        div.style.top = y
        balls.push({
            ball:div,
            pos:{
                x:x,
                y:y
            }
        })
        document.body.appendChild(div)
}

function createBalls(){
    for(let i = 0; i < NUM_BALLS; i++){
    generateBalls()
    }
}

function collision($div1, $div2) {
    var x1 = $div1.getBoundingClientRect().left;
    var y1 = $div1.getBoundingClientRect().top;
    var h1 = $div1.clientHeight;
    var w1 = $div1.clientWidth;
    var b1 = y1 + h1;
    var r1 = x1 + w1;

    var x2 = $div2.getBoundingClientRect().left;
    var y2 = $div2.getBoundingClientRect().top;
    var h2 = $div2.clientHeight;
    var w2 = $div2.clientWidth;
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
}

function checkCollisions(){
    balls.forEach((ball) => {
        if(collision(player, ball.ball)){
            sound.play()
            ball.ball.remove()
            generateBalls()
        }
    })
}

function run(){
    player_pos.x += player_val.x
    player_pos.y += player_val.y

    player.style.left = player_pos.x + 'px'
    player.style.bottom = player_pos.y + 'px'

    checkCollisions()
    requestAnimationFrame(run)
}

function init(){
    createBushes()
    createBalls()
    run()
}

init()

window.addEventListener('keydown', function(e){
    if(e.key == "ArrowUp"){
        player_val.y = 3
        player.style.backgroundImage = "url('assets/player_front.png')"
    }

    if(e.key == "ArrowDown"){
        player_val.y = -3
        player.style.backgroundImage = "url('assets/player_back.png')"
    }

    if(e.key == "ArrowLeft"){
        player_val.x = -3
        player.style.backgroundImage = "url('assets/player_left.png')"
    }

    if(e.key == "ArrowRight"){
        player_val.x = 3
        player.style.backgroundImage = "url('assets/player_right.png')"
    }
    player.classList.add('active')
})

window.addEventListener('keyup', function(e){
    player_val.x = 0
    player_val.y = 0
    player.classList.remove('active')
})