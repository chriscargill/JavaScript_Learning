let last_render_time = 0
const SNAKE_SPEED =  3
const snake_body = [ { x: 11, y: 11 }]
const game_board = document.getElementById('game-board')
var input_direction = { x: 0 , y: 0 }
let last_direction = { x: 0, y: 0 }

let food = [{ x: 2 , y: 2 }]
let new_segments = 0

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
    
    console.log("Render")
    last_render_time = current_time
    update()
    draw(game_board)
    draw_food(game_board)

}

function getInputDirection(){
    last_direction = input_direction
    return input_direction
}
function update(){
    updateSnake()
    updateFood()
    addSegments()
}

function draw(gameBoard){
    // console.log("draw snake")
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
    // console.log("draw food")
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
    // console.log("update")
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

function expandSnake(amount){
    new_segments += amount
}

function removeFood(){
    console.log("removing food")
    food = [{x: 20, y: 20}]
}

function addSegments(){
    if (new_segments > 0){
        for (let i = 0; i < new_segments; i++) {
            snake_body.push({ ...snake_body[snake_body.length - 1]})
        }
        new_segments = 0
    }
}
window.requestAnimationFrame(main)