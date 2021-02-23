let last_render_time = 0
const SNAKE_SPEED =  10
let snake_body = [ { x: 11, y: 11 }]
const game_board = document.getElementById('game-board')
let input_direction = { x: 0 , y: 0 }
let last_direction = { x: 0, y: 0 }

let food = [{ x: getRandomNumber() , y: getRandomNumber() }]
let new_segments = 0
let isPlaying = true

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (last_direction.y !== 0) break
            input_direction = { x: 0, y: -1 }
            break
        case 'ArrowDown':
            if (last_direction.y !== 0) break
            input_direction = { x: 0, y: 1 }
            break
        case 'ArrowLeft':
            if (last_direction.x !== 0) break
            input_direction = { x: -1, y: 0 }
            break
        case 'ArrowRight':
            if (last_direction.x !== 0) break
            input_direction = { x: 1, y: 0 }
            break
    }
})

function main(current_time){
    window.requestAnimationFrame(main)
    const seconds_since_last_render = (current_time - last_render_time) / 1000
    if (seconds_since_last_render < 1 / SNAKE_SPEED) return
    
    last_render_time = current_time
    if (isPlaying === true){
        update()
        draw(game_board)
        draw_food(game_board)
    } else {
        showRestartScreen()
    }


}

function getInputDirection(){
    last_direction = input_direction
    return input_direction
}
function update(){
    updateSnake()
    checkBounds()
    updateFood()
    addSegments()
}

function draw(gameBoard){

    gameBoard.innerHTML = ''
    snake_body.forEach(segment => {
        const snake_element = document.createElement('div')
        snake_element.style.gridRowStart = segment.y
        snake_element.style.gridColumnStart = segment.x
        snake_element.classList.add('snake')
        gameBoard.appendChild(snake_element)
    })
}

function draw_food(gameBoard){

    food.forEach(segment => {
        const food_item = document.createElement('div')
        food_item.style.gridRowStart = segment.y
        food_item.style.gridColumnStart = segment.x
        food_item.classList.add('food')
        gameBoard.appendChild(food_item)
    })
}

function updateSnake(){
    input_direction = getInputDirection()

    for (let i = snake_body.length - 2; i >= 0; i--) {
        snake_body[ i + 1 ] = { ...snake_body[i] }
    }
    snake_body[0].x += input_direction.x
    snake_body[0].y += input_direction.y
}

function updateFood(){
    food.forEach( piece => {
        if (onSnake(piece)) {
            expandSnake(1)
            removeFood()
        }
    })
}

function onSnake(location){
    let value = false
    snake_body.forEach( loc => {
        if (loc.x === location.x && loc.y === location.y){
            value = true
        }  
    })
    return value
}

function onSnakeHeadBody(){
    let value = false
    snake_body.slice(1).forEach( loc => {
        if (snake_body[0].x === loc.x && snake_body[0].y === loc.y){
            value = true
        }

    })
    return value
}

function onSnakeHeadFood(one,two){
    let value = false
    if (snake_body[0].x === one && snake_body[0].y === two){
        value = true
    }
    return value
}

function expandSnake(amount){
    new_segments += amount
}

function removeFood(){
    let one = getRandomNumber()
    let two = getRandomNumber()

    while (onSnakeHeadFood(one,two)){
        one = getRandomNumber()
        two = getRandomNumber()
    }

    food = [{x: one, y: two}]
}

function addSegments(){
    if (new_segments > 0){
        for (let i = 0; i < new_segments; i++) {
            snake_body.push({ ...snake_body[snake_body.length - 1]})
        }
        new_segments = 0
    }
}

function getRandomNumber(){
    const mr = Math.random()
    const rando = Math.floor(mr * 100)
    if (rando > 21) { // Bring it back into range of the grid
        const new_rando = Math.floor(rando/5)
        return new_rando
    } else {
        return rando
    }
}

function checkBounds(){
    const head = snake_body.slice(0,1)[0]
    if (head.x < 1 || head.x > 21){
        alert("FAILED")
        isPlaying = false
    }
    if (head.y < 1 || head.y > 21){
        alert("FAILED")
        isPlaying = false
    }
}
function showRestartScreen(){
    game_board.innerHTML = ''
    let div = document.createElement('div') 
    let button_div = document.createElement('button')
    button_div.classList.add('restart')
    button_div.addEventListener('click', e => {
        console.log("CLICKED")
        e.preventDefault()
        snake_body = [{ x: 11, y: 11 }]
        input_direction = { x: 0 , y: 0 }
        last_direction = { x: 0, y: 0 }
        food = [{ x: getRandomNumber() , y: getRandomNumber() }]
        isPlaying = true
    })
    div.appendChild(button_div)
    game_board.appendChild(div)
}
window.requestAnimationFrame(main)