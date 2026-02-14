// 1. YouTube IFrame API Setup
var player;
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'B8U7G98LgO0', // ID เพลงจาก YouTube
        playerVars: { 'autoplay': 0, 'controls': 0 }
    });
}

// 2. Variables & Elements
let holdTimer;
let progress = 0;
const heartBtn = document.getElementById('heartBtn');
const fill = document.getElementById('fill');
const percentText = document.getElementById('percent');
const statusText = document.getElementById('status-text');

// 3. Functions
function startHold(e) {
    e.preventDefault();
    statusText.innerText = "กดค้างไว้นะ...";
    holdTimer = setInterval(() => {
        if (progress < 100) {
            progress += 2;
            fill.style.width = progress + "%";
            percentText.innerText = progress + "%";
        } else {
            unlock();
        }
    }, 50);
}

function endHold() {
    clearInterval(holdTimer);
    if (progress < 100) {
        progress = 0;
        fill.style.width = "0%";
        percentText.innerText = "0%";
        statusText.innerText = "กดค้างที่หัวใจสิ...";
    }
}

function unlock() {
    clearInterval(holdTimer);
    if (player && player.playVideo) {
        player.playVideo();
    }
    
    document.getElementById('lock-screen').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('lock-screen').style.display = 'none';
        document.getElementById('card').style.display = 'block';
    }, 600);
}

// 4. Event Listeners
heartBtn.addEventListener('mousedown', startHold);
heartBtn.addEventListener('mouseup', endHold);
heartBtn.addEventListener('mouseleave', endHold);
heartBtn.addEventListener('touchstart', startHold);
heartBtn.addEventListener('touchend', endHold);
