const video = document.querySelector('video')
const playButton = document.getElementById('play')
const pauseButton = document.getElementById('pause')
const restartButton = document.getElementById('restart')
const forwardButton = document.getElementById('skip-forward')
let timestamp = document.getElementById('timestamp')

video.addEventListener(`timeupdate`, updateTimestamp)
playButton.addEventListener(`click`, playVideo)
pauseButton.addEventListener(`click`, pauseVideo)
restartButton.addEventListener(`click`, restartVideo)
forwardButton.addEventListener(`click`, skipForward)

function playVideo(){
    video.play()
    console.log(`Playing video`)
}

function pauseVideo(){
    video.pause()
}

function restartVideo(){
    video.currentTime = 0
}

function skipForward(){
    video.currentTime = video.currentTime + 10
}

function updateTimestamp(){
    timestamp.innerHTML = parseInt(video.currentTime)
}